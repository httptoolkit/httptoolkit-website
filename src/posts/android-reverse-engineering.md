---
title: 'Reverse engineering & modifying Android apps with JADX & Frida'
date: '2021-11-22T12:30'
cover_image: './frida.jpg'
---

I get a _lot_ of emails from users who want to know exactly what their favourite Android app is doing, and want to tweak and change how that works for themselves.

There are some great tools to do this, including [JADX](https://github.com/skylot/jadx/) & [Frida](https://frida.re/), but using these is complicated, and every reverse engineering problem has its own unique challenges & solutions. There's few good guides to getting started, and even fewer guides on the advanced tricks available.

In this article, I want to talk you through the core initial steps to look inside any Android app, give you the tools to find & understand the specific code that matters to you, and then show you how you can use that information to modify the app for yourself.

Let's set the scene first.

## Context

I'm assuming here that somebody else has written an Android app that you're interested in. You want to know exactly how a specific bit of behaviour works, and you want to change what it's doing.

I'm going to focus on the classic HTTP Toolkit user example here of [certificate pinning](https://security.stackexchange.com/questions/29988/what-is-certificate-pinning): where security-conscious apps that send HTTPS traffic go beyond the normal HTTPS validation requirements, and actively check that the HTTPS certificates used are from a small set of _specific_ trusted certificates, not just the standard set trusted by all Android devices.

_(I'm focusing on certificate pinning because it's a common use case and it's convenient, but the techniques here work for all other kinds of reverse engineering & patching too, don't worry!)_

Certificate pinning is a problem for **[HTTP Toolkit](/android/)** users, who are trying to intercept HTTPS traffic to see what messages their Android apps are sending & receiving. It's not possible to intercept these app's traffic because they won't trust HTTP Toolkit's certificate, even after it's been injected into the device's system certificate store.

Using the tools we're going to talk about in a moment we can take an unknown 3rd party app, find the certificate pinning code within it, and disable that remotely while the app runs on our device. This makes it possible to intercept, inspect & mock all of its traffic in any way we like!

This isn't not easy, but it's usually not necessary. For starters, 99% of apps don't use certificate pinning beyond Android's [standard restrictions](https://httptoolkit.tech/blog/intercepting-android-https/), and for that case if you use HTTP Toolkit on a rooted device you're done in one click. For most apps that do explicitly pin their certificates, you can disable that using [this general-purpose Frida script](https://httptoolkit.tech/blog/frida-certificate-pinning/) which already knows how to disable all the most popular cert pinning libraries available.

In some cases though apps implement their own custom certificate pinning logic, or do something else unusual, which means the general-purpose script can't recognize and disable the right APIs. In these kinds of cases, or if you're trying to modify any other kinds of app behaviour, you need to roll up your sleeves and get your hands dirty.

For this article, I've prepped an [certificate pinning demo app](https://github.com/httptoolkit/android-ssl-pinning-demo/):

![A screenshot of the certificate pinning demo app](./ssl-pinning-demo.png)

Each button sends an HTTPS request, and validates the connection in a slightly different way. The 'unpinned' option does nothing, the next 4 use various standard pinning techniques, and the last button uses totally custom code to manually check the certificate.

If you use this with HTTP Toolkit normally, you can only intercept the first request. If you use the general-purpose Frida script, you can intercept the next 4 too, but not the last one.

In this article we're going to focus on that last button, reverse engineer this app to see how it works, and write a custom Frida script to disable the certificate checking functionality.

## The Plan

To reverse engineer an app and hook some behaviour, there's a few core steps you need to work through:

1. Download a copy of the app on your computer
2. Extract the source code
3. Find the code we're interested in
4. Understand how that code works
5. Write a Frida hook to change how that code works

## Download the app

Android apps are generally published to the Google Play store, but you can't easily download the app from there directly to mess around with on your computer.

Fortunately, many sites that mirror the Google Play store, and do provide direct downloads of almost all available apps. [ApkMirror.com](https://apkmirror.com) and [ApkPure.com](https://apkpure.com) are two good examples.

In the general case, you should go to your favourite APK mirror site, and download the latest APK for the app you're interested in.

In this specific case, I wrote the app, so I've conveniently published it directly on GitHub. You can download its APK [here](https://github.com/httptoolkit/android-ssl-pinning-demo/releases/latest).

### Android app formats

What is this APK file? Let's start with some quick but necessary background on Android app formats. There's two distribution formats you'll run into: APKs (older) and XAPKs (newer, also known Android App Bundles).

In this example, the app is provided as a single APK, so that's easy enough, but many other apps you'll run into may be XAPKs, so it's worth understanding the difference.

APKs are fairly simple: they're a ZIP file with a bunch of metadata, all the application's assets & config files, and one or more binary `.dex` files, which contain the compiled application.

XAPKs are more complicated: they're a zip file that contains multiple APKs. In practice, they'll contain one large primary APK, with the main application code & resources, and then various small APKs which include the config or resources only relevant to certain types of devices. There might be separate config APKs for devices with larger screens, or different CPU architectures. For reverse engineering you usually just need the main APK, and you can ignore the rest.

## Extract the code

Inside the APK, if you open it as a zip, you'll find a large `classes.dex` file (for [multidex](https://developer.android.com/studio/build/multidex) apps, there might even be a `classes2.dex` or more). These DEX files contain all the JVM classes of the application, in the compiled bytecode format used by Android's Runtime engine (ART, which replaced Dalvik a few years back).

These DEX files contain the compiled application, but do not contain all the original source. Many things, most notably including local variable names & comments, are lost when compiling an Android application, and it's always impossible to extract those from the app.

The external interfaces of each class are generally present here though (assuming that [obfuscation](https://developer.android.com/studio/build/shrink-code#obfuscate) wasn't used). That will usually be enough to find the method that you're interested in. Using those external interfaces you can usually then deduce what each line is trying to do, and progressively rename variables and add your own comments until you have some code that makes sense.

To start that process, we need to convert the DEX file into a format we can mess around with ourselves. The best tool to do this is [JADX](https://github.com/skylot/jadx), which you can download from their [GitHub release page](https://github.com/skylot/jadx/releases/latest) (or there are many other similar tools too, such as [Androguard](https://github.com/androguard/androguard)).

Once JADX is installed, you run it like so:

```
jadx ./pinning-demo.apk
```

This will create a folder with the same name as the APK, containing 'resources' and 'sources' folders. The sources folder is what we're interested in: this is JADX's best guess at the Java source code that would've generated this DEX file. It's not perfect, but it should be pretty close.

If you use JADX on [the latest pinning demo APK](https://github.com/httptoolkit/android-ssl-pinning-demo/releases/latest), you'll find a structure like this:

* sources/
    * android/ - the core Android classes
    * androidx/ - Android Jetpack classes
    * com/
        * android/volley/ - The Volley HTTP client
        * datatheorem/android/trustkit - One of the popular pinning libraries used
        * google/ - Firefox, GSON & various other Google packages
    * kotlin/ - runtime components of Kotlin
    * okhttp3/ - OkHttp3, a popular HTTP library
    * _[...various other namespaces & packages]_
    * tech/httptoolkit/pinning_demo/ - **the main application code**

Once you've extracted the code from an app like this, you can explore it any way you like - using Android Studio, using any other text editor, or just grepping for interesting text, it's up to you. By default, I'd recommend using some editor that can highlight and do basic automated refactoring (variable renaming) on Java code, since that'll make the next steps much easier.

## Find the code you care about

Which code you want to reverse engineer & hook depends on the problem you're trying to solve. In my case, the problem is that when I intercept the app's HTTP using **[HTTP Toolkit](/android/)** and press the "Manually pinned request" button, I get a "Certificate rejected" message in HTTP Toolkit, and I want to stop that happening.

That message typically means that the app is pinning a certificate - i.e. even though the HTTP Toolkit certificate is trusted on the device, the app is including its own custom checks, which are rejecting the HTTPS certificates and blocking HTTP Toolkit's automatic HTTP interception.

So, the goal here is to find out which bit of code is making the custom-checked HTTPS request behind that last button, find out where that checks the certificate, and then later disable that check.

![A screenshot of the manually pinned request button](./ssl-pinning-manual-button.png)

Whatever code you want to change in your case, there are a lot of tricks available to help you hunt it down. Let's try out a few different approaches on this demo app.

### Search for relevant strings

In my case, I know the failing request is going to `sha512.badssl.com` (a known-good HTTPS test site) so searching for that is a good start. That works, and gives me a few different places in the code that are sending requests, but there's options here for all the different possible pinning mechanisms, and related config files too. It's not immediately clear which code is relevant, so it'd be better to find something more precise.

Some other strings that might be interesting, for the certificate pinning case:

* checkCert
* validateCert
* pinning
* pinner
* certificate
* SSL
* TLS

Here you're looking for anything might be included in the name of a class, field or method, or which might be included in strings (e.g. error messages), since all of that will be preserved and searchable in the decompiled code.

For example, if you're trying to understand where some HTTP API data comes from, you could try searching for the API endpoint path, or the name of query parameters. If you're looking for the implementation of a specific algorithm, it's worth searching for the common domain terms in that algorithm, or if you're trying to extract secrets or keys from the app then 'secret', 'key', and 'auth' are all worth investigating.

### Search for usage of relevant Java APIs

Although local variable names aren't available, and in obfuscated apps even the class & package names may be obscured, the built-in JVM classes & package names are always available and unchanged.

That means they're a great way to find related functionality. If you know the code you're interested in is likely to be using a certain data type, calling a specific API, or throwing a certain type of exception, you can use that to immediately narrow down your search.

In this example, I think it's likely that all manual certificate checks are going to be using `java.security.cert.X509Certificate`, so I can search for usages of that type. This does give some good answers!

Unfortunately though the entire app is filled with lots of different ways to do certificate pinning, by design, so this still comes back with a long list of matches, and it's not easy to tell which is relevant immediately. In most other apps that won't be a problem (most apps implement certificate pinning just the once!) and we could trawl through the results, but for now it's better to test out some other options first.

### Check for HTTP error reports

Many apps nowadays include automatic error reporting using tools like [Sentry](https://sentry.io/).

This is useful to app developers, but also to reverse engineers! Even when the app's own requests may use certificate pinning, requests sent by external libraries like these generally will not, so they're inspectable using HTTP Toolkit (or any other HTTP MitM proxy). That's useful because those requests themselves will usually include the stacktrace for any given error.

This provides an excellent way for finding the source of any errors that you want to work around:

* Intercept traffic from your device using **[HTTP Toolkit](/android/)** or another proxy
* Trigger the error
* Look through the captured HTTP traffic for error reports
* Find the stacktrace in the relevant error report
* Follow the stacktrace into the codebase extracted earlier to immediately find the relevant code

Bingo! In this case though, we're out of luck, as it's a tiny demo app with no error reporting. More searching required.

### Check ADB for errors

Very commonly, apps will log errors and extra info to the console for easy debugging. Android captures this output from all running JVM processes in a single output buffer, along with stack traces from all uncaught errors, and makes that accessible via [ADB](https://developer.android.com/studio/command-line/adb) using the `logcat` command.

Outputting errors and debug info here is especially common in smaller apps which don't use an automated error reporting tool, so if you're looking to find & change some code that throws errors it's a great alternative to the previous approach. Even in non-error cases, the output here can provide excellent clues about application behaviour at the moments you're interested in.

To capture the logs from a device, run:

```
adb logcat -T1
```

This will stream the live logs from your device, without the history, until you stop it. It's often useful to pipe this to a file instead (i.e. `... > logs.txt`) to save it for more detailed later analysis, since there can be a lot of noise here from other activity on the device.

While this command is running, if you reproduce your error, you'll frequently find useful error stacktraces or error messages, which can then guide you to the right place in the code.

For our demo app, this works _great_. By enabling logging when pressing the button, if you look carefully between the other noisy log output, we can now get the specific error message unique to that button:

```bash{10}
> adb logcat -T1
--------- beginning of main
...
11-22 10:46:16.478 31963 31963 I Choreographer: Skipped 114 frames!  The application may be doing too much work on its main thread.
11-22 10:46:16.996  1785  1785 D BluetoothGatt: close()
11-22 10:46:16.997  1785  1785 D BluetoothGatt: unregisterApp() - mClientIf=5
11-22 10:46:17.000   791  1280 I bt_stack: [INFO:gatt_api.cc(1163)] GATT_CancelConnect: gatt_if:5, address: 00:00:00:00:00:00, direct:0
11-22 10:46:17.092   573   618 D LightsService: Excessive delay setting light
11-22 10:46:17.258   282   286 E TemperatureHumiditySensor: mCompEngine is NULL
11-22 10:46:18.773 26029 26129 I System.out: java.lang.Error: Unrecognized cert hash.
11-22 10:46:19.034 26029 26080 W Adreno-EGL: <qeglDrvAPI_eglGetConfigAttrib:607>: EGL_BAD_ATTRIBUTE
...
```

We can search the codebase for this `Unrecognized cert hash` error message, and conveniently that message is shown in exactly one place. This error is appears deep inside `invokeSuspend` in `MainActivity$sendManuallyCustomPinned$1.java`:

```kotlin
throw new Error("Unrecognized cert hash.");
```

### Explore the code in depth

Still stuck? At this point, your best bet is to try and explore the application more generally, or to explore around the best clues you've found so far.

To do so, you can use the manifest (in `resources/AndroidManifest.xml`) to find the entrypoints for every activity and background service registered in the application. Start with the services (i.e. background processes) or activities (i.e. a visible page of the UI) that sound most relevant to your situation, open up the corresponding source, and start digging.

This can be time consuming. Keep going! You don't need to dig into every detail, but walking through here can quickly give you an idea of the overall architecture of the app, and you can often use this to find the code that's relevant to you. It's well worth keeping notes & adding inline comments as you go to keep track of the process.

## Understand the code

Hopefully by this point you've found the code that's relevant to you. In this demo app, that code decompiled by JADX looks like this:

```java{46}
public final Object invokeSuspend(Object obj) {
    IntrinsicsKt.getCOROUTINE_SUSPENDED();
    if (this.label == 0) {
        ResultKt.throwOnFailure(obj);
        this.this$0.onStart(R.id.manually_pinned);
        boolean z = true;
        try {
            TrustManager[] trustManagerArr = {new MainActivity$sendManuallyCustomPinned$1$trustManager$1()};
            SSLContext instance = SSLContext.getInstance("TLS");
            instance.init(null, trustManagerArr, null);
            Intrinsics.checkExpressionValueIsNotNull(instance, "context");
            Socket createSocket = instance.getSocketFactory().createSocket("untrusted-root.badssl.com", 443);
            if (createSocket != null) {
                SSLSocket sSLSocket = (SSLSocket) createSocket;
                SSLSession session = sSLSocket.getSession();
                Intrinsics.checkExpressionValueIsNotNull(session, "socket.session");
                Certificate[] peerCertificates = session.getPeerCertificates();
                Intrinsics.checkExpressionValueIsNotNull(peerCertificates, "certs");
                int length = peerCertificates.length;
                int i = 0;
                while (true) {
                    if (i >= length) {
                        z = false;
                        break;
                    }
                    Certificate certificate = peerCertificates[i];
                    MainActivity mainActivity = this.this$0;
                    Intrinsics.checkExpressionValueIsNotNull(certificate, "cert");
                    if (Boxing.boxBoolean(mainActivity.doesCertMatchPin(MainActivityKt.BADSSL_UNTRUSTED_ROOT_SHA256, certificate)).booleanValue()) {
                        break;
                    }
                    i++;
                }
                if (z) {
                    PrintWriter printWriter = new PrintWriter(sSLSocket.getOutputStream());
                    printWriter.println("GET / HTTP/1.1");
                    printWriter.println("Host: untrusted-root.badssl.com");
                    printWriter.println("");
                    printWriter.flush();
                    System.out.println((Object) ("Response was: " + new BufferedReader(new InputStreamReader(sSLSocket.getInputStream())).readLine()));
                    sSLSocket.close();
                    this.this$0.onSuccess(R.id.manually_pinned);
                    return Unit.INSTANCE;
                }
                sSLSocket.close();
                throw new Error("Unrecognized cert hash.");
            }
            throw new TypeCastException("null cannot be cast to non-null type javax.net.ssl.SSLSocket");
        } catch (Throwable th) {
            System.out.println(th);
            this.this$0.onError(R.id.manually_pinned, th.toString());
        }
    } else {
        throw new IllegalStateException("call to 'resume' before 'invoke' with coroutine");
    }
}
```

There's a lot going on here! The original code ([here](https://github.com/httptoolkit/android-ssl-pinning-demo/blob/v1.2.1/app/src/main/java/tech/httptoolkit/pinning_demo/MainActivity.kt#L221-L266)) is written in Kotlin and uses coroutines, which adds a lot of extra noise in the compiled output.

Fortunately, we don't need to understand everything. To change this behaviour, we just need to work out what code paths could lead to the highlighted line above, where the error is thrown.

As you can see here, JADX has taken some best guesses at the variable names involved in this code, inferring them from the types created (e.g. `printWriter = new PrintWriter`) and from the methods called (`peerCertificates = session.getPeerCertificates()`). This is pretty clever, and helps a lot to see what's happening.

It's not perfect though. You can see from some inferred variables like `createSocket = instance.getSocketFactory().createSocket("untrusted-root.badssl.com", 443)`, where the variable has just taken the name of the method, or the `z` boolean variable, where no clues where available to infer anything useful at all.

If you have experience with code like this it may be easy to see what's happening here, but let's walk through it step by step:

* The line we're interested in only runs if `z` is false, since the preceeding `if (z)` block ends with `return`.
* We can rename `z` to `isCertValid` (made easier by automated refactoring) and remove some Kotlin boilerplate to make the code immediately clearer, giving us code like:
    ```java
    boolean isCertValid = true;
    //...
    int length = peerCertificates.length;
    int i = 0;
    while (true) {
        if (i >= length) {
            isCertValid = false;
            break;
        }
        Certificate certificate = peerCertificates[i];
        MainActivity mainActivity = this.this$0;
        if (mainActivity.doesCertMatchPin(MainActivityKt.BADSSL_UNTRUSTED_ROOT_SHA256, certificate)) {
            break;
        }
        i++;
    }
    if (isCertValid) {
        // ...
        return Unit.INSTANCE;
    }
    sSLSocket.close();
    throw new Error("Unrecognized cert hash.");
    ```
* The block before the `if` is `while (true)`, so this code only runs after that breaks.
* The `break` commands happen after either checking all values (setting `isCertValid` to false) or after `doesCertMatchPin` returns true for one value.
* That means the exception is only thrown when `doesCertMatchPin` returns false for all values, and that method is indeed what causes our problem.

This gives us a good understanding of the logic here: the code checks every certificate linked to a socket, and calls `doesCertMatchPin` from the `MainActivity` class to compare it to `BADSSL_UNTRUSTED_ROOT_SHA256`.

This is an intentionally simple example. Real examples will be more complicated! But hopefully this gives you an idea of the process, and the same techniques of incremental renaming, refactoring and exploring can help you understand more complex cases.

It's worth noting that the relatively clear code here isn't always available, usually because obfuscation techniques are used to rename classes, fields & methods throughout the code to random names (`a`, `b`..., `aa`, `ab`...).

In that case, the same process we're discussing here applies, but you won't have many of the names available as clues to start with, so you can only see the overall structure and references to built-in JVM APIs. It is still always possible to reverse engineer such apps, but it's much more important to quickly find the precise code that you're interested in before you start, and the process of understanding it is significantly more difficult. That's a topic for another blog post though (watch this space).

## Patch it with Frida

Once we've found the code, we need to think about how to change it.

For our example here, it's easy: we need to make `doesCertMatchPin` return `true` every time.

Be aware Frida gives you a lot of power to patch code, but the flexibility is not unlimited. Frida patches are very focused on method implementation replacement, and it's very difficult (if not impossible) to use Frida to patch to individual lines within existing methods. You need to look out for method boundaries at which you can change behaviour.

For certificate pinning, that's fairly easy, because certificate checks are almost always going to live in a separate method like `checkCertificate(cert)`, so you can focus on that. In other cases though this can get more complicated.

In this specific case, we're looking to patch the `doesCertMatchPin` function in the `tech.httptoolkit.pinning_demo.MainActivity` class. Within a Frida script, we first need to get a reference to that method:

```javascript
const certMethod = Java.use("tech.httptoolkit.pinning_demo.MainActivity").doesCertMatchPin;
```

Then we need to assign an alternative implementation to that method, like so:

```javascript
certMethod.implementation = () => true;
```

After this patch is applied, the real implementation of that `doesCertMatchPin` method will never be called, and it'll just return `true` instead.

This is a simple example. There's many more complex things you can do though. Here's some examples:

```javascript
// Disable a property setter, to stop some fields being changed:
const classWithSetter = Java.use("a.target.class");
classWithSetter.setATargetProperty.implementation = () => {
    return; // Don't actually set the property
};

// Wrap a method, to add extra functionality or logging before and after without
// changing the existing functionality:
const classToWrap = Java.use("a.target.class");
const originalMethod = classToWrap.methodToWrap;
classToWrap.methodToWrap.implementation = () => {
    console.log('About to run method');
    const result = originalMethod.apply(this, arguments);
    console.log('Method returned', result);
    return result;
};

// Hook the constructor of an object:
const classToHook = Java.use("a.target.class");
const realConstructor = classToHook.$init;
classToHook.$init.implementation = () => {
    // Run the real constructor:
    realConstructor.apply(this, arguments);
    // And then modify the initial state of the class however you like before
    // anything else gets access to it:
    this.myField = null;
};
```

There's a huge world of options here - those are just some of the basic techniques at your disposal.

Once you've found a method you want to patch and you've got an idea how you'll do it, you need to set up Frida (see [this guide](/blog/frida-certificate-pinning/#install-and-start-frida-on-the-device) if you haven't done so already) to test it out. Once Frida is working you can test out your patch interactively, and tweak it live to get it working.

For example, to test out our demo hook above:

* Attach HTTP Toolkit to the device
* Run the app, check that the "Manually pinned request" button fails and shows a certificate error in HTTP Toolkit.
* Start Frida server on the device
* Restart your application with Frida attached by running:
    ```
    frida --no-pause -U -f tech.httptoolkit.pinning_demo
    ```
* This will start the app, and give you a REPL to run Frida commands
* Run `Java.perform(() => console.log('Attached'))` to attach this process to the VM & class loader (it'll pause briefly, then log 'Attached').
* Test out some hooks. For our demo app, for example, you can hook the certificate pinning function by running:
    ```javascript
    Java.use("tech.httptoolkit.pinning_demo.MainActivity").doesCertMatchPin.implementation = () => true;
    ```
* Clear the logs in HTTP Toolkit, and then press the "Manually pinned request" button again
* It works! The button should go green, and the full request should appears successfully in HTTP Toolkit.

Once you've something that works in a REPL, you can convert it into a standalone script, like so:

```javascript
Java.perform(() => {
    console.log("Patching...");
    const mainActivityClass = Java.use("tech.httptoolkit.pinning_demo.MainActivity");
    const certMethod = mainActivityClass.doesCertMatchPin;
    certMethod.implementation = () => true;
    console.log("Patched");
});
```

and then you can run this non-interactively with Frida using the `-l` option, for example:

```bash
frida --no-pause -U -f tech.httptoolkit.pinning_demo -l ./frida-script.js
```

That command will restart the app with the script injected immediately, so that that certificate pinning behind this button is unpinned straight away, and tapping the button will always show a successful result:

![The manually pinning request button showing a successful result](./ssl-pinning-manual-button-success.png)

If you want examples of more advanced Frida behaviour, take a look through the [my cert unpinning script](https://github.com/httptoolkit/frida-android-unpinning/blob/main/frida-script.js) for certificate pinning examples for every popular library and some other interesting cases, or check out [this huge selection of Frida snippets](https://github.com/iddoeldor/frida-snippets) for snippets demonstrating all sorts of other tricks and APIs available.

I hope you find this helps you to reverse engineer, understand & hook Android applications! Have questions or run into trouble? Get in touch [on Twitter](https://twitter.com/pimterry), file issues against [my Frida script](https://github.com/httptoolkit/frida-android-unpinning/), or [send me a message directly](/contact).
