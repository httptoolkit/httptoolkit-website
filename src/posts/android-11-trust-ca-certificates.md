---
title: 'Android 11 tightens restrictions on CA certificates'
date: '2020-09-10T16:30'
cover_image: './locks.jpg'
---

Your trusted Certificate Authorities (CAs) are the organizations that you trust to guarantee the signatures of your encrypted traffic and content. That's a lot of power, and the list of trusted authorities is dangerous to mess around with. Nonetheless, it's also something that power users might want to configure, for Android testing, for app debugging, for reverse engineering or as part of some enterprise network configurations.

Android has tightly restricted this power for a while, but in Android 11 ([released this week](https://developer.android.com/about/versions/11)) it locks down further, making it impossible for any app, debugging tool or user action to prompt to install a CA certificate, even to the untrusted-by-default user-managed certificate store. The only way to install any CA certificate now is by using a button hidden deep in the settings, on a page that apps cannot link to.

To be clear, carefully managing the trusted CAs on Android devices is important! Adding a CA should not be easy to do by accident or unknowingly. Protecting users from themselves is absolutely necessary here, and it's a hard problem.

That said, there are many legitimate use cases where you want to be able to choose which CAs you trust, and that just got much harder. There's a balance here to manage, and I'm not sure Android has made the right choice.

Let's dig into the details:

## How did Android CA certificate management work until now?

Until now, an app could ask a user to trust a CA certificate in the user certificate store (but not the system store), using the [KeyChain.createInstallIntent()](https://developer.android.com/reference/android/security/KeyChain#createInstallIntent) API method. Similarly, the operating system would offer to trust a CA certificate if one was manually opened on the device from the filesystem.

These certificate trust prompts came with a variety of loud warnings & confirmations, and mandated setup of a device pin or other screen lock before you could complete them, if one wasn't already set. It wasn't possible to do accidentally, and it was hard to trick users into accepting these scary prompts (although probably not impossible).

That only applied to the user certificate store. This store, in case you're not familiar, differs significantly from Android system-wide certificate store, and since Android 7 (Nougat, released in 2016) it's been impossible to install any CA certificates into the system store without fully rooting the device.

The _system_ store is used as the default to verify all certificates - e.g. for your apps' HTTPS connections - and as a normal user it's completely impossible to change the certificates here, and has been for quite some time.

Until now however, you could install to the _user_ certificate store, which apps could individually opt into trusting, but which they don't trust by default.

This was very useful! This allowed developers to opt-into this trust in their local builds to debug traffic, it allowed testers to automatically & easily trust CA certificates so they can mock & verify HTTPS traffic in manual & automated testing, and it was used by a wide variety of debugging tools (including **[HTTP Toolkit](/android)**) to easily let developers & testers inspect & rewrite their encrypted HTTPS traffic.

Unfortunately, automating that setup is no longer possible on these devices, and each of these use cases will now require a series of fiddly manual steps that tools can't lead you to or help with.

## What's changed?

In Android 11, the certificate installer now checks who asked to install the certificate. If it was launched by anybody other than the system's settings application, the certificate install is refused with an obscure alert message:

> Can't install CA certificates
> CA certificates can put your privacy at risk and must be installed in Settings

This wasn't clearly announced anywhere, as far as I can tell. The only mention in the Android 11 release information is a small [side note](https://developer.android.com/work/versions/android-11#other) in the enterprise features changelog, which notes that the `createInstallIntent()` API no longer works in some cases.

In practice, this change means the certificate install API no longer works, opening certificate files no longer works, and it's impossible to initiate a certificate install even from ADB (the Android debugging tool).

It is still possible to install certificates using the device management API, but only in the special case where your application is a pre-installed OEM app, marked during the device's initial setup as the 'device owner'. If not, you're out of luck.

In Android 11, to install a CA certificate, users need to manually:

* Open settings
* Go to 'Security'
* Go to 'Encryption & Credentials'
* Go to 'Install from storage'
* Select 'CA Certificate' from the list of types available
* Accept a large scary warning
* Browse to the certificate file on the device and open it
* Confirm the certificate install

Applications and automation tools can send you to the general 'Security' settings page, but no further: from there the user must go alone (fiddly if not impossible with test automation tools).

More inconvenient still: with the existing APIs, the app could provide the certificate bytes directly, reading certificates from their own internal data or storage. Now, because the user must browse to it, the certificate has to be in the shared user-accessible storage on the device. This also risks it being rewritten by other apps on the device before it's trusted, if they have the permissions to write to shared folders (not default, but not uncommon), allowing those apps to sneak their own CA on to unsuspecting users.

While it's still possible to trust your own CAs on rooted devices, Android is also making [a parallel drive](https://www.xda-developers.com/safetynet-hardware-attestation-hide-root-magisk/) for hardware attestation as part of SafetyNet on new OS releases & devices, which will make this far harder.

Hardware attestation makes it possible for Android apps to reliably know whether the OS on the device is the original installed by the OEM. Many apps use SafetyNet to block installs and usage on such devices, and that doesn't just apply to secure banking apps: apps from Netflix to Pokemon Go to McDonald's require SafetyNet checks. In a not-so-distant future, these and many other apps will be completely unusable on rooted devices, once hardware attestation becomes standard.

Put together, this is not good. Android's been locking down on this for a while, but it really feels now like they're moving to a world where custom ROMs are cut off from much of the Android ecosystem, and official ROMs are completely locked down and inaccessible even to developers.

## What can I do?

First up: add a star on the Android bug I've filed, suggesting an automatable ADB-based option for CA certificate management, for development use cases like these: **https://issuetracker.google.com/issues/168169729**.

Once you've done that, in the meantime you have a few options:

* Accept that you need to manually install CA certificates, and do so/tell your users how to do so.
* Use a rooted device or emulator, and trust your certificate in the system store (you might be interested in [how HTTP Toolkit does this](https://httptoolkit.tech/docs/guides/android#adb-interception)).
* Completely reset the device, preprovision your application (before initial account setup), and configure your application as the device owner with `dpm set-device-owner <your app's device admin component>`
* Enable debugging on the device, connect to it with ADB, and manually inject touch events to automatically walk through the various settings screens.
* Avoid using Android 11 entirely.

For now, [HTTP Toolkit](/android) takes options 1 and 2:

* For users using Android < 11, it walks you through the automated setup prompts as before, all very conveniently.
* For users using Android 11 on unrooted standard devices, it downloads the certificate to your Downloads folder & tells you how to do manual setup.
* For users on emulators and rooted devices, it automatically sets up a system certificate via ADB, transparently handling everything.

Not as smooth as in previous versions, but manageable!

These changes are important for Android to ensure it can protect average users from serious risks and attacks. At the same time though, it's important to balance that against allowing owners of devices freedom to configure those devices for themselves, and against allowing developers and other power users to access potentially dangerous functionality. Hopefully Android can find a path to support both.

**Debugging Android apps, and want to inspect, rewrite & mock live traffic? [Try out HTTP Toolkit](https://httptoolkit.tech/android). Hands-free HTTP(S) interception & debugging for Android apps, web browsers, servers, microservices & more.**