---
title: EU Funding for Mobile App Traffic Interception
date: '2023-02-27T12:00'
cover_image: './open-padlock-keys.jpg'
---

HTTP Toolkit has been selected to receive another round of open-source funding from the EU! This aims to improve interception of HTTPS traffic from mobile apps, making it easier for both security/privacy researchers and normal technical users to inspect & manipulate the data that any app they use sends & receives.

This funding will directly support work to improve the precision & usability of mobile app interception, on both iOS and Android. In a couple of clicks, you'll be able to target any app installed on a connected device (on either platform) and inspect all its traffic. That means no background noise from full system interception, automatic certificate unpinning, and no fiddly manual setup required.

HTTP Toolkit can already automatically intercept Android devices, but only globally for the whole device (using Android's VPN APIs), with system certificates injected but without certificate unpinning, and with no automatic setup support for iOS at all. All those caveats are going away (of course, I'm intending the existing device-wide interception to remain a fully supported option indefinitely too).

This is going be powered by a set of new integrations & hooks for [Frida](https://frida.re), a popular open-source instrumentation toolkit. Many advanced HTTP Toolkit users are already using Frida independently (see [the Frida certificate unpinning guide](https://httptoolkit.com/blog/frida-certificate-pinning/) for more info) but doing so often requires quite a bit of setup and specialist knowledge. This project is going to take that away, making network interception of mobile apps easily accessible to anybody who knows what "HTTP" is.

All this is being funded by the fantastic [NLNet Foundation](https://nlnet.nl/) as part of [NGI Zero Entrust](https://nlnet.nl/entrust/), a program funding open-source EU projects that support transparency around data use & privacy in modern technology. This is part of the EU's [Next Generation Internet (NGI) initiative](https://digital-strategy.ec.europa.eu/en/policies/next-generation-internet-initiative), aiming to directly fund researchers & open-source developers to encourage the future engineering of the Internet towards European values: "openness, inclusivity, transparency, privacy, cooperation, and protection of data". All things I'm thoroughly on board with.

This is equity-free R&D funding - in effect it's a charitable donation to HTTP Toolkit to encourage open-source product development in a direction they think is valuable. The development work is going to run over the next year, but it's notably not intended as a full-time commitment (more like 60% of my time) and so other HTTP Toolkit development is still going to continue alongside as normal.

(By the way - if you're in Europe and this kind of funding for open-source development sounds like something you might be interested in, their call for proposals for the 4th round of this funding is running from now until April 1st 2023! See [nlnet.nl/entrust/](https://nlnet.nl/entrust/) for more details)

Let's get into the meat though: what actually is Frida, what will all this do for you in practice as a user, and what's the plan to make this happen?

## What is Frida?

[Frida](https://frida.re) is a dynamic instrumentation toolkit. That means it lets you attach to an existing application, and dynamically inject your own logic to change how the application works. Frida is a substantial general-purpose and mature toolkit that works for applications on Windows, Mac, Linux, iOS, Android, and quite a few more platforms you've never heard of. If you're familiar with Greasemonkey/Tampermonkey, you can think of this as being the equivalent tool for native applications. It's powerful stuff.

Using Frida, you can trace which functions are called inside an application, read or rewrite arbitrary data from an application's memory, or (in our case) directly change how any targeted parts of application code work.

To use it, you typically set up a device running a Frida server, to which you can send commands e.g. using Frida's CLI. You then send a command requesting that it attaches to a certain process and runs a script you've written within that process.

Frida scripts are written in JavaScript, using the [Frida JS API](https://frida.re/docs/javascript-api/), and look something like this:

```javascript
// Log socket activity:
Process.getModuleByName({
    linux: 'libc.so',
    darwin: 'libSystem.B.dylib',
    windows: 'ws2_32.dll'
}[Process.platform])
.enumerateExports()
.filter(ex =>
    ex.type === 'function' &&
    ['connect', 'recv', 'send', 'read', 'write'].some(prefix =>
        ex.name.indexOf(prefix) === 0
    )
).forEach(ex => {
    Interceptor.attach(ex.address, {
        onEnter: function (args) {
            const fd = args[0].toInt32();
            const socktype = Socket.type(fd);

            if (socktype !== 'tcp' && socktype !== 'tcp6') return;

            const address = Socket.peerAddress(fd);
            if (!address) return;

            console.log(fd, ex.name, address.ip + ':' + address.port);
        }
    });
});
```

```javascript
// Open an alert on iOS:
const UIAlertController = ObjC.classes.UIAlertController;
const UIAlertAction = ObjC.classes.UIAlertAction;
const UIApplication = ObjC.classes.UIApplication;
const handler = new ObjC.Block({
    retType: 'void',
    argTypes: ['object'],
    implementation: function () {}
});

ObjC.schedule(ObjC.mainQueue, function () {
    const alert = UIAlertController
        .alertControllerWithTitle_message_preferredStyle_(
            'Frida',
            'Hello from Frida',
            1
        );
    const defaultAction = UIAlertAction.actionWithTitle_style_handler_(
        'OK',
        0,
        handler
    );
    alert.addAction_(defaultAction);
    UIApplication
        .sharedApplication()
        .keyWindow()
        .rootViewController()
        .presentViewController_animated_completion_(alert, true, NULL);
})
```

```javascript
// Disable certificate pinning in Java (just one case - there are many):
Java.perform(function () {
    const HttpsURLConnection = Java.use("javax.net.ssl.HttpsURLConnection");
    HttpsURLConnection
        .setDefaultHostnameVerifier
        .implementation = function (hostnameVerifier) {
            return; // Do nothing, i.e. don't change the hostname verifier
        };
});
```

_(Examples from [github.com/iddoeldor/frida-snippets](https://github.com/iddoeldor/frida-snippets) and [github.com/httptoolkit/frida-android-unpinning/](https://github.com/httptoolkit/frida-android-unpinning/))_

This is just a quick intro to the power of Frida. Take a look through the [full docs](https://frida.re/docs/home/) or one of the [many guides](https://learnfrida.info/) for more. Using this, we can make arbitrary changes to how a target application works. Neat! But why?

## What's the goal?

The overall theme of this fund is "Trustworthiness and Data Sovereignty". HTTP Toolkit fits into this by providing tools to inspect & modify all the data that apps on your mobile device send & receive, so you can control that, and so you (and security & privacy researchers) can analyse and report on the data that your apps are sharing with the world.

Inspecting traffic like this is especially useful for researchers, helping investigations using HTTP Toolkit like the FT's [exploration of how health info is shared with advertisers](https://www.ft.com/content/0fbf4d8e-022b-11ea-be59-e49b2a136b8d), ProPrivacy's [investigation into user tracking by UK charities](https://proprivacy.com/privacy-news/exposing-the-hidden-data-ecosystem-of-the-uks-most-trusted-charities) and Privacy International's [analysis of how diet apps leak your data](https://privacyinternational.org/long-read/4603/unhealthy-diet-targeted-ads-investigation-how-diet-industry-exploits-our-data) to quickly & easily see the traffic they're interested in. But it's also useful for:

* Individual users, who want to see up close what an app they're using is sharing.
* App developers, who want to analyse, debug or test their own app's traffic.
* QA teams, testing that apps send the correct data, and verifying behaviour when injecting custom responses or simulating errors.
* Security testers, who want to look for vulnerabilities or test how apps handle certain types of attacks or interception.
* Reverse engineers, trying to understand how APIs work and how apps use them.

Using HTTP Toolkit or similar tools today, this is all already possible for some cases ([demo](https://httptoolkit.com/android/)), but increasing OS restrictions and use of certificate pinning & similar creates challenges that often require specialist skills and fiddly manual reverse engineering work, making all this inaccessible to many users. This project is going to fix that.

In HTTP Toolkit itself, the end UX I'm aiming for is:

* Click a button in HTTP Toolkit, and a list of potential target devices pops up.
* Click a device to see the target apps available on that device.
* Click an app, that app is automatically individually intercepted, with certificates automatically unpinned, and all the traffic appears in HTTP Toolkit moments later.

This is a best-case fully automated setup. There's quite a bit of exploration to do to confirm which devices will be able to support this perfectly, but at the very least that appears to be possible for rooted Android devices, most Android emulators, jailbroken iOS devices, iOS simulators, iOS apps with debugging enabled, or any other apps with [Frida gadget](https://frida.re/docs/gadget/) manually injected.

Other cases (like jailed iOS devices) are possible too, but might require some manual (but easy) setup steps. Alongside this I'm going to build a walkthrough within HTTP Toolkit for that process, to make that as easy as possible.

En route this is going to involve creating quite a few standalone components, all of which will be open-source and usable completely independently of HTTP Toolkit, including:

* Pure-JS Frida bindings, to connect to & control any Frida server from Node.js or a browser via WebSocket
* A Frida script to reconfigure proxy & CA configuration in a target iOS app
* A Frida script to reconfigure proxy & CA configuration in a target Android app
* A Frida script to disable certificate pinning in a target iOS app
* ~~A Frida script to disable certificate pinning in a target Android app~~ (I've already built this: https://github.com/httptoolkit/frida-android-unpinning/)

_Everything_ in this project will be fully open-source (this is a requirement of the funding, but HTTP Toolkit is 100% open-source anyway) and so in addition to those general-use components, the details of the integration into HTTP Toolkit will be available for any other tools or services interested in further exploring the same kinds of workflows too (and I've already been talking to [one of the other funded projects](https://nlnet.nl/project/TrackingWeasel/) about exactly this).

#### A side note on abusive use/surveillance concerns

3rd parties intercepting & inspecting network traffic is a reasonable thing to be cautious about, especially when talking about development that's funded by government organizations like this. In case it's not clear: this is _not_ a project that helps enable any of those kinds of surveillance scenarios.

To intercept any traffic, or to use Frida in any capacity whatsoever, you have to have full administrative control of the device, or the ability to directly modify the application before it's installed. In mass surveillance scenarios neither is available, and in any situation where somebody malicious has that control, that means they can already do whatever they like anyway (if they wanted to read your secret WhatsApp messages, they can already extract your keys directly from the process, or install a fake modified version of the WhatsApp app, and it's game over).

Additionally, intercepting traffic with HTTP Toolkit itself generally requires being on the same network as a computer that's actively running HTTP Toolkit at all times, or preferably having the device directly connected to the computer via USB. These aren't tools that could be used to spy on people at a distance, and nobody is going to use this to steal your emails.

The tools provided here are really only useful to intercept your own device, so you can inspect & understand what the apps that you're using yourself are actually sending.

## How is this going to happen?

Development for this is going to happen over the next 12 months.

The first step (starting now!) is a lot of research investigating the potential & limits of the tools involved, to confirm precisely what's going to be possible in what scenarios and build initial prototypes of the core interactions.

That should sharpen up the outline of the workflows for different use cases & device configurations. Once that's in place, the core development work of the project is:

* Building the pure-JS WebSocket bindings for Frida, implementing all of the Frida APIs necessary (as informed by the prototypes) and publishing that as a standalone JS library.
* Creating & publishing a set of iOS hook scripts for Frida:
    1. A script capable of modifying the HTTP proxy used in an application
    2. A script capable of modifying the trusted CAs used in an application
    3. A script capable of disabling certificate pinning within an application
* Creating & publishing a similar set of Android hook scripts for Frida:
    1. A script capable of modifying the HTTP proxy used in an application
    2. A script capable of modifying the trusted CAs used in an application
    3. (No certificate unpinning script, as this [already exists](https://github.com/httptoolkit/frida-android-unpinning/))
* Building logic into HTTP Toolkit to automatically setup Frida, where possible, on target devices.
* Integrating the JS WebSocket bindings into HTTP Toolkit, to allow connection to and control of Frida instances.
* Building the UI to expose this, and trigger device setup, Frida connection, and injection of the appropriate scripts.
* Detailed documentation on how to use this (in a variety of common configurations) and how it all works internally.

All of this is kicking off soon, so watch this space!

If you'd like more updates on the progress of the project, you can join the HTTP Toolkit announcements mailing list [here](https://httptoolkit.com/keep-me-updated/) or subscribe to the blog in general in the form below.

If you can't wait, and you want to try out the existing mobile interception functionality _right now_, take a look at [HTTP Toolkit's Android features](https://httptoolkit.com/android/) and download it now to test that out for yourself.