---
title: 'Intercepting HTTPS on Android'
date: '2020-11-05T16:45'
cover_image: './header-images/signing.jpg'
tags: android, interception, tls, certificates
---

To intercept, inspect or manipulate HTTPS traffic, you need the HTTPS client to trust you.

If you want to intercept your own HTTPS on Android, perhaps to capture & rewrite traffic from your Android device for debugging or testing, how do you do that?

This isn't theoretical - [HTTP Toolkit](https://httptoolkit.com/android/) does exactly this, automatically intercepting HTTPS from real Android devices, for inspection, testing & mocking. To do so, it has to automatically ensure that it's trusted by HTTPS clients on Android devices, without breaking security on those devices completely (it would be a very bad idea to simply turn off certificate validation, for example). Here's a demo:

<center>
    <iframe class="video-embed" src="https://www.youtube.com/embed/ttf8IhfI0Ao" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</center>

Let's talk though how HTTPS clients in general manage this kind of trust, see how that works on Android specifically, and then look at how it's possible to get around this and intercept real HTTPS traffic.

## How HTTPS trust works

An HTTPS request is an HTTP request, made over a TLS connection. Everything we're going to talk about here is really about TLS - the HTTP within is just normal `GET /` requests and `200 OK` responses.

I'm not going to go into the lowest level details, but it is important to understand the basics of how TLS works. If you are interested in the fine details of TLS, [The Illustrated TLS Connection](https://tls13.ulfheim.net/) is well worth a look, for a byte-by-byte breakdown of the whole process.

The high-level summary is this:

* Every TLS client keeps track of some set of root certificate authorities (root CAs) that it trusts completely.
* When any modern TLS client first connects to a server, its initial message includes a Server Name Indication (SNI), telling the server which hostname it's looking for (e.g. example.com). It expects the server's response to include a valid certificate for that hostname.
* TLS certificates include a reference to the issuer of the certificate, and a signature proving that the issuer verified the certificate. The issuer's certificate in turn will have its own issuer & signature, creating a chain of certificates, up until a final self-signed root certificate.
* The client must decide if it trusts the server's certificate. It does so by checking the details of the certificate (notably checking the hostname is what was expected), and then examining the issuer of the certificate, and then issuer of the issuer's certificate, and so on and so on until it reaches a certificate that it already trusts (a trusted certificate authority) or running out of issuers and deciding that it doesn't trust the certificate at all.
* If the client trusts the certificate, it continues creating the encrypted connection, and then sends and receives data over that connection. If it doesn't trust the certificate, it closes the connection before sending any content, i.e. it never sends any part of its HTTPS request.

In short: every TLS client has a list of root CAs that it trusts, and to successfully receive an HTTPS request, you must be able to present a certificate for the target hostname that includes a trusted root CA somewhere in its chain.

This is a bit simplified and I'm ignoring all sorts of edge cases, but it's enough for our purposes. If you'd like to get into the nitty gritty of how the certificate validation really works, Scott Helme has written up [a great guide](https://scotthelme.co.uk/cross-signing-alternate-trust-paths-how-they-work/).

So, given the above, if we want to intercept HTTPS we need to be able to present a certificate issued by a trusted certificate authority. Since nobody reading this has a globally trusted root CA to hand, in practice that means we need to create our own CA, and ensure the TLS client (in this case, Android's HTTPS clients) already trusts that CA, before we can get started.

How do Android HTTPS clients decide who they trust?

## Android Certificate Stores

Each HTTPS or TLS client on Android will check certificates against the CAs in some certificate store.

There's at least 3 types of Android CA certificate store:

* The OS has a 'system' certificate store, traditionally at `/system/etc/security/cacerts/`. This is prepopulated on the device at install time, it's impossible to add certificates to it without root access, and is used as the default list of trusted CA certificates by most apps. In practice, this store defines which CA certificate most apps on your phone will trust.

    [In Android 14 system CA certificates were moved](https://httptoolkit.com/blog/android-14-breaks-system-certificate-installation/) to `/apex/com.android.conscrypt/cacerts` (though the default system path above still exists too) so that they're primarily loaded from the Conscrypt system module instead.

* The OS also has a 'user' certificate store, usually at `/data/misc/user/0/cacerts-added/`, containing trusted CA certificates that were manually installed by the user of the device. Installing one of these certificates requires accepting quite a few warnings, and [became even more difficult in Android 11](https://httptoolkit.com/blog/android-11-trust-ca-certificates/).

    Apps targeting Android API level <24, i.e. before Android 7, or applications that specifically opt in will trust CA certificates in this store. Most apps don't, but this is enabled on a few apps where it's widely useful (notably Chrome, [for now](https://www.chromium.org/Home/chromium-security/root-ca-policy/)) and it's easy for developers to enable for testing with [a few lines of XML](https://httptoolkit.com/docs/guides/android/#if-you-dont-have-a-custom-network-security-config).

* Lastly, each application can include its own CA certificates, embedding its own short list of trusted certificate authorities internally, and refusing to trust HTTPS communication with certificates signed by anybody else. Nowadays this is fairly uncommon, except for apps that are especially security conscious (banking) or very high-profile (facebook), mostly because it's complicated and the changes in Android 7 to untrust the user store make this kind of pinning unnecessary.

If you want to intercept HTTPS traffic from an app, you need to ensure your CA certificate is trusted in the app's certificate store of choice. How can you do that?

## How to intercept Android HTTPS

To intercept HTTPS, you first need the TLS connections to come to you. HTTP Toolkit runs as a desktop app on your computer, acting as an HTTP(S) proxy, and does this with an Android VPN app on the device that redirects packets to that proxy. I've written quite a bit of detail about that [over here](https://httptoolkit.com/blog/inspecting-android-http/), and it's fairly easy to do if you either use the VPN APIs or configure an HTTPS proxy, so let's take that as a given.

Once you have TLS connections going to our server, you need to be able to respond to the initial client handshake with a certificate that Android will trust. Typically you'll generate a self-signed CA certificate when setting up interception, and then use that to generate TLS certificates for incoming connections, generating a fresh certificate for each requested hostname.

To make that work, you need to make your Android device's HTTPS clients trust your locally generated CA.

There's two big cases here:

* Non-rooted production devices. Normal phones. This includes most phones sold and used day to day, and official 'Google Play' Android emulators.
* Rooted devices. More specifically: devices where root access is available via ADB (not that root access is necessarily available to apps on the device). This includes normal phones that have been manually rooted, but also both the 'Google APIs' and AOSP official Google emulators, and most other Android emulators like [Genymotion](https://www.genymotion.com/).

In general, less than 1% (according to some _very_ [dubious](https://www.quora.com/What-percentage-of-Android-phones-are-rooted) [guesstimates](https://www.reddit.com/r/Android/comments/ue3gc/what_percentage_of_android_phone_users_a_root/c4ullqs/)) of typical user's devices are rooted.

However for Android developers, testers, and security researchers, that number runs far higher. Within HTTP Toolkit's user base for example, it looks closer to 30% (whilst I don't know for sure, but I suspect that emulators make up a large percentage of that).

### Injecting CA certificates into rooted devices

This is the fun case. If you have root, how do you make apps trust your CA certificate? It turns out that even with root it's not quite as easy as it could be, but it's definitely possible to inject system certificates, so that almost all apps trust your CA by default.

There's a couple of challenges:

* Even as root, `/system` is not writable by default
* Making `/system` writable on emulators is only possible if the emulator is always started with an extra command line argument, and so requires restarting the emulator if that's not already set. To make this worse, it's not possible to set custom command line arguments in Android Studio, making this very inconvenient for normal use.
* On Android 14+, you actually need to write to the Conscrypt APEX module at `/apex/com.android.conscrypt/cacerts` instead of the `/system` path, and this is fully immutable _and_ uses per-process mount namespacing, so that it's independently mounted within every running process.
* Even if you write a valid CA certificate to the right place, it won't be recognized. You need to ensure all the permissions & SELinux context labels are set correctly before Android will trust files in that directory.

To handle all this, as root, HTTP Toolkit:

* Pushes the HTTP Toolkit CA certificate to the device over ADB.
* Copies all system certificates out of `/system/etc/security/cacerts/` to a temporary directory.
* Mounts a [tmpfs](https://en.wikipedia.org/wiki/Tmpfs) in-memory filesystem on top of `/system/etc/security/cacerts/`. This effectively places a fresh empty filesystem that _is_ writable over the top of a small part of `/system`.
* Moves the copied system certificates back into that mount.
* Moves the HTTP Toolkit CA certificate into that mount too.
* Updates the permissions to `644` & sets the `system_file` SELinux label on everything in the temporary mount, so it all looks like legitimate Android system files.
* Checks if `/apex/com.android.conscrypt/cacerts` is present, and if so it enters the mount namespace (with `nsenter`) of all Zygote processes (which launch apps) and every running app, to bind mount the system certificate path over that APEX path (if you're interested, I've written a more detailed article about [the full Android 14 CA certificate injection process](https://httptoolkit.com/blog/android-14-breaks-system-certificate-installation/)).

This is all open source of course, and the full script to do this is here: [httptoolkit-server:adb-commands.ts#L256-L361](https://github.com/httptoolkit/httptoolkit-server/blob/405ec0a4f165853ab0b90172710d4455559f4519/src/interceptors/android/adb-commands.ts#L256-L361).

If you have a CA certificate, you can do this for yourself on any device with root access, to temporarily add new CAs that'll be trusted like any other CA prebundled on the device.

If you are doing this for yourself though, be careful around permissions, as the default for ADB-pushed files is very relaxed. If the CA you inject or the copied system certificates are globally writable, it'd be theoretically possible for another app on the device to change or add a CA during this process, and sneakily get visibility into all HTTPS traffic on the device for itself without you realizing or granting it root access.

All put together, this injects a system certificate without needing emulator startup arguments, and works 100% automatically & immediately, without even needing to reboot. As a nice bonus the tmpfs & bind mounts disappear on reboot, so everything is cleaned up automatically afterwards, and you only trust the inject CA temporarily (wherever possible, it's always a good idea to [limit and/or avoid global developer CAs](https://httptoolkit.com/blog/debugging-https-without-global-root-ca-certs/)).

### Intercepting HTTPS on non-rooted devices

If you don't have root access, you can't do this. Instead, the best you can do is to install the certificate into the user store. To do so:

* If you're setting the device up manually:
    * Download the certificate onto your device.
    * Go to "Encryption & Credentials" in your device security settings.
    * Select "Install a certificate", then "CA Certificate".
    * Open the downloaded certificate, and follow the confirmation prompts.
* If you're automating/scripting this:
    * On Android up to and including Android 10, you can use the [KeyChain.createInstallIntent()](https://developer.android.com/reference/android/security/KeyChain#createInstallIntent()) to prompt users to trust your CA certificate in your app. There'll be some warnings there, and they'll need to set or confirm the device pin to do so, but it's very straightforward. You can see HTTP Toolkit's code in [httptoolkit-android:MainActivity.kt#L603-L606](https://github.com/httptoolkit/httptoolkit-android/blob/03f10f2eff28f30d8cdbfb9fe86a075891714172/app/src/main/java/tech/httptoolkit/android/MainActivity.kt#L603-L606).
    * From Android 11 onwards, [prompting CA certificate installation is blocked](https://httptoolkit.com/blog/android-11-trust-ca-certificates/), so you're in trouble. You can't launch the prompt to trust a CA directly, and it must be installed in the settings completely manually. If you do try to use the `createInstallIntent()` API to install the certificate, it just shows "Can't install CA certificates: CA certificates can put your privacy at risk and must be installed in Settings".

        If you download the CA certificate to the device though, it's easy enough to explain the process to users, and you can see how HTTP Toolkit does that in [httptoolkit-android:MainActivity.kt#L615-L661](https://github.com/httptoolkit/httptoolkit-android/blob/03f10f2eff28f30d8cdbfb9fe86a075891714172/app/src/main/java/tech/httptoolkit/android/MainActivity.kt#L615-L661).


With that done you can intercept HTTPS from Chrome, and other Chromium-based browsers, and you can intercept traffic from apps that explicitly opt in.

If you're debugging your own app that's fine, since it's just a few lines of XML to do so:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config>
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" overridePins="true" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

That XML trusts the user CA certificates installed on the device, if saved as an XML resources like `network_security_config.xml` and referenced with `android:networkSecurityConfig="@xml/network_security_config"` in the `<application>` element of your app manifest.

With that and a certificate in your user store, you're done! But only if you're trying to intercept Chrome or your own apps...

### Intercepting HTTPS from a 3rd party app on non-rooted devices

One last case then: what if you have a non-rooted phone, and you want to intercept HTTPS from an app that doesn't trust the user CA store, and which you can't easily edit the source code for yourself? For example, if you want to inspect HTTPS traffic from somebody else's app, or from your own existing production builds?

This is a tricky case on Android nowadays, but still it's often possible. You'll still need to edit the app, but it turns out you can do so without directly rebuilding from source.

First, you need to download the APK for the app. APKs aren't available for direct download from Google Play, but they are often available in various other alternate sites, with [ApkPure.com](https://apkpure.com) being the most well known. You can search for most Google Play apps there to download an APK and get started.

Once you have an APK, you need to:

* Decode & unpack the contents.
* Patch the network config within to trust the user certificate store.
* Repack an APK from that patched contents.
* Sign the APK with a valid certificate so it can be installed on the device.

That can be quite complicated, but fortunately there's a tool called [apk-mitm](https://github.com/shroudedcode/apk-mitm#apk-mitm) that can do all of this for you! In addition, it strips pinned certificates and can even automatically patch apps using the newer Android App Bundle format.

If you have Node.js (10+) & Java (8+) installed, installing and using this just requires:

```bash
$ npx apk-mitm ./downloaded-app.apk
```

That should complete the above steps and give you a patched APK. If you've already trusted your CA certificate in your device's user store, as in the previous section, just install the patched app with `adb install ./patched-app.apk` and you're away.

---

Hopefully that's a good intro into managing HTTPS trust on Android, and using & abusing it to intercept, inspect and rewrite HTTPS traffic.

Want to see this in action and see exactly what HTTPS your apps and device are sending? Give **[HTTP Toolkit](https://httptoolkit.com/android/)** a go now.

Want to know more about how this all works? HTTP Toolkit is 100% open-source, so feel free to check out [HTTP Toolkit on GitHub](https://github.com/httptoolkit), and do [get in touch](https://httptoolkit.com/contact/) if you have any questions or feedback.