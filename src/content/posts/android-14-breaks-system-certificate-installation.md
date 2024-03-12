---
title: "Android 14 blocks modification of system certificates, even as root"
date: '2023-09-05T14:00'
cover_image: 'header-images/broken-android-phone.jpg'
tags: android, interception, tls, certificates
---

_**Update**: This post sparked a lot of excellent discussion and debate on workarounds, and there are now multple working solutions to allow certificate injection on Android 14, despite the restrictions discussed here. See [the update post](https://httptoolkit.com/blog/android-14-install-system-ca-certificate) for more details._

---

When Android was [initially announced](http://www.openhandsetalliance.com/press_110507.html) in 2007 by the Open Handset Alliance (headed by Google) their flagship project was billed as an "open platform", "providing developers a new level of openness", and giving them "complete access to handset capabilities and tools".

We've come a long way since then, steadily retreating from openness & user control of devices, and shifting towards a far more locked-down vendor-controlled world.

The next step of Android's evolution is Android 14 (API v34, codename Upside-Down Cake) and it takes more steps down that path. In this new release, the restrictions around certificate authority (CA) certificates become significantly tighter, and appear to make it impossible to modify the set of trusted certificates at all, even on fully rooted devices.

If you're an Android developer, tester, reverse engineer, or anybody else interested in directly controlling who your device trusts, this is going to create some new challenges.

Before we get into the finer details, first I want to talk a little about the context around Android CA management and how we got here, but if you want to jump to the latest details you can go straight to the [Enter Android 14](#enter-android-14) section below.

## "Open Software, Open Device, Open Ecosystem"

While the initial principles of Android were very much focused on open software, controllable by users and developers, over more recent years Android has increasingly limited the control of users, developers & researchers over their own devices.

The key turning point in this process was Android 7 (Nougat, released in 2016) in which the certificate authorities (CAs) on the device that were previously fully modifiable by the owner of the phone were [split in two](https://android-developers.googleblog.com/2016/07/changes-to-trusted-certificate.html): one fixed list of CAs provided by the OS vendor and used by default by every app on your phone, and another set of user-modifiable CAs that users could control, but which was used only for apps that specifically opted in (i.e. almost none).

The set of CAs on a device is a small configuration setting with big consequences, as your device's trusted CAs are the organizations guaranteeing the security of your encrypted network traffic. A CA can issue TLS certificates (as used in HTTPS to secure all communication on the web) for any domain name they like, and anybody who trusts that CA will trust those certificates as evidence of a secure & legitimate connection to that domain.

That also means though that if you create your own CA and trust it then you can intercept your own HTTPS or other TLS traffic, to see exactly what your phone is sending & receiving, and potentially modify or block it. Being able to configure your device's CAs is key to this.

That is a lot of power. Making this difficult to modify accidentally for non-technical users and impossible to modify without user knowledge is certainly reasonable. At the same time however, being able to control this is critical for privacy & security research, reverse engineering, app debugging & testing, for assorted enterprise internal network configurations, for anybody who doesn't trust one of the standard CAs provided by their vendor, and many other cases.

With that one change in Android Nougat in 2016, each of those use cases became significantly more challenging. It became impossible for users on normal devices to control who was trusted to secure the communication of apps on their own devices, and a substantial hurdle was created that directly transferred power from users to vendors & third-party app developers.

## Rooting around the Nougat problem

Although this is very inconvenient, fortunately it's long been possible to root Android devices, allowing full administrative access over the device, and making it possible to work around these kinds of restrictions. This isn't officially encouraged by Google, but it's been sufficient as a workaround to allow researchers, developers & reverse engineers to take control of their own devices for these advanced use cases.

By doing so, it was possible to deal with Android Nougat's restrictions on rooted devices, manually adding the trusted certificate to the system store via the filesystem, injecting them into the `/system/etc/security/cacerts/` directory.

This is a bit harder than it sounds, because `/system` is generally read-only, even on rooted devices. There are two main ways to solve that:

* Make `/system` directory writable (requires a little reconfiguration & a device reboot) and then manually modify the real system certificates directory.
* Mount a temporary read-write filesystem over the top of the read-only directory, copy the existing CA certs into there, and then add your own additions on top too.

In each case there are a few other steps required to ensure that the certificates have the appropriate naming, permissions, and SELinux labels to be accepted by the system (for more low-level details and discussion see [this post](https://httptoolkit.com/blog/intercepting-android-https/)), but it's relatively simple and HTTP Toolkit has long automated the temporary mount-based process (see [the certificate injection script here](https://github.com/httptoolkit/httptoolkit-server/blob/aa453e9df98491c549aa4b97b90618f1cf808e17/src/interceptors/android/adb-commands.ts#L256-L308)). In practice, this means it's possible to provide one-click automated interception setup for any rooted Android device or emulator.

These approaches have been effective not only on custom rooted devices and specialized Android distributions, but even in most of Google's own official emulator images (everything except the full 'Google Play' edition images, which are locked down to match a normal OEM device) not to mention other emulators from Genymotion to Bluestacks.

Easy & effective CA setup has powered myriad tools that let you see what apps on your phone are sending & receiving: helping developers to debug their networking issues, keeping app developers honest about the data they share, and shining a light on security vulnerabilities in both apps & their APIs.

These techniques are used by HTTP Toolkit's automatic setup, but also referenced in the setup guides for similar tools like [mitmproxy](https://docs.mitmproxy.org/stable/howto-install-system-trusted-ca-android/#3-insert-certificate-into-system-certificate-store), in [endless](https://awakened1712.github.io/hacking/hacking-install-ca-android/) [blog](https://binary-manu.github.io/binary-is-better/android/add-certificates-to-android-ca-store) [posts](https://blog.ropnop.com/configuring-burp-suite-with-android-nougat#install-burp-ca-as-a-system-level-trusted-ca), [StackOverflow answers](https://stackoverflow.com/a/46569793/68051) and [forum threads](https://forum.xda-developers.com/t/tutorial-how-to-install-custom-ssl-certificates-root-etc-on-bluestacks-4-5.4513773/), widely used in tools including [popular Magisk packages](https://github.com/NVISOsecurity/MagiskTrustUserCerts) and by organizations like the [community-run CA cacert.org](http://wiki.cacert.org/FAQ/ImportRootCert#CAcert_system_trusted_certificates_.28without_lockscreen.29).

These are widespread techniques that have worked for many years. Although the required root access has become more a little challenging more recently (due to first SafetyNet and later 'Play Integrity' using attestation to allow apps to block users who use rooted devices) this solution has generally been quite manageable, and a just-about-acceptable balance between "inconvenient enough to disuade users unaware of the implications" and "accessible to power users who know what they're doing".

## Enter Android 14

Right now, Android 14 is currently in its final stages of beta testing, slated for imminent release within a couple of weeks.

One of its headline new security features is [remotely updatable CA certificates](https://www.xda-developers.com/android-14-root-certificates-updatable/), which extracts management of CA certificates from the core OS image entirely, and moves it into a separately updateable component, delivered & updated via Google Play. This allows for faster CA updates for Google, allowing them to revoke trust of problematic or failing CAs on all Android 14+ devices with just a Google Play System Update, without waiting for each phone vendor to release an OTA update for the whole operating system.

Although I'm sure you can see what's coming, let me caveat first: at a very high level, the goal here is a Good Thing.

CAs trusted by default like this are in a powerful position, and there needs to be serious oversight & consequences to ensure they stick to their responsibilities and continue to justify that trust. When they fail to do so, it's important that this power is taken away quickly, before it can be abused.

In the most notable recent case, in January 2023 TrustCor was untrusted as a CA by effectively everybody ([including Google](https://security.googleblog.com/2023/01/sustaining-digital-certificate-security_13.html)), after close ties to a malware-distributing organization and associated US defence/intelligence contractor were [discovered](https://www.theregister.com/2022/12/02/mozilla_microsoft_trustcor/).

In the other direction, the inability to widely distribute & trust new CA certificates has caused issues for new CAs on the block such as Let's Encrypt, who have had to [repeatedly delay the rollout](https://letsencrypt.org/2023/07/10/cross-sign-expiration.html) of improvements to their signing chain, because old Android devices missing recent CA root certificates would not have trusted them, and would thereby have been locked out of significant parts of the web.

Mechanisms to improve the responsiveness of this system are valuable. In addition to just speeding up removals & additions, this should also widen access to those updates, since even devices for which vendors no longer offer official OS updates can continue to receive system component updates like this via Google Play for significantly longer.

Unfortunately though, despite those sensible goals, the reality of the implementation has serious consequences: system CA certificates are no longer loaded from `/system`, and when using root access to either directly modify or mount over the new location on disk, all changes are ignored by all apps on the device. Uh oh.

## The mechanics

The key change to enable this is [here](https://android.googlesource.com/platform/frameworks/base/+/8b192b19f264a8829eac2cfaf0b73f6fc188d933). Instead of reading from the venerable `/system/etc/security/cacerts` directory, this new approach reads certificates from `/apex/com.android.conscrypt/cacerts`, when it exists.

That root `/apex` path is where Android Pony EXpress (APEX) containers are mounted. These APEX modules are independently updatable system components, delivered as signed & immutable containers. In this case, the certificates form part of Android's `com.android.conscrypt` module - its core TLS/SSL library delivered as an independently updatable system module.

The exact mechanisms behind APEX are challenging to fully understand, as many low-level details seem undocumented, and [what documentation there is](https://android.googlesource.com/platform/system/apex/+/master/docs/howto.md) includes links to key details only available within Google's internal sites. Tessting the resulting behaviour though, it seems that this is using some kinds of containerization primitives to expose the mounted content directly to individual processes, resulting in surprising behaviour when trying to modify these files elsewhere. As a result, delivering content through an APEX module makes it much harder (seemingly impossible) to manually modify, even with full administrative control.

It's easy to test this for yourself, using the latest Android 14 beta official emulators. Both the Android Open Source Project (AOSP) and 'Play Services' images have always allowed root access (unlike the 'Google Play' images) and by creating an emulator using those you can easily open a root shell.

Follow either of the two existing techniques though, and the expected updates do nothing. Let's walk through a demo.

First, set up your device. You'll need the Android SDK installed, and you probably want [Android Studio](https://developer.android.com/studio), since it makes this much easier, although you can use the CLI directly if you like.

First, create an emulator:
* Through the Android Studio UI, select any device model, and the API 34 'Google APIs' image for your architecture.
* Or, using the Android SDK tools on the CLI, run `avdmanager create avd -n TestAVD -k 'system-images;android-34;google_apis;x86_64'` (your architecture may vary)

Let's try messing with temporary mounts and see what we can do:

* Start your emulator, via the UI or `emulator -avd TestAVD`
* Open a root shell via `adb shell`, then `su`
* Try mounting an empty temporary filesystem over the various `cacerts` directories now present:
  ```bash
  mount -t tmpfs tmpfs /system/etc/security/cacerts
  mount -t tmpfs tmpfs /system/etc/security/cacerts_google
  mount -t tmpfs tmpfs /apex/com.android.conscrypt/cacerts
  mount -t tmpfs tmpfs /apex/com.android.conscrypt@340818022/cacerts
  # N.b. that last @id may vary in future updates
  ```
* In the emulator, open Settings -> Security & Privacy -> More -> Encryption -> Trusted Credentials

  Under the 'System' tab, all the certificates you've just hidden from view on disk are there!

So, where's this coming from?

* We can try searching the entire filesystem to find the source of this data. For example, the top certificate shown is from 'ACCV'. You can also find that in Android's sources [here](https://android.googlesource.com/platform/system/ca-certificates/+/refs/heads/main/files/3c9a4d3b.0), and it's present both there and in unmodified Android CA cert folders as `3c9a4d3b.0`. We can search for this with:
  ```bash
  find . -name 3c9a4d3b.0 2&>/dev/null
  ```
* It doesn't exist!

But in fact, it does: remove your 4 mounts again (`umount <path>`), retry that `find` command, and you'll see that this is indeed present in the original `cacerts` directories.

Try the exact same steps with an Android 13 image, and you'll find that this modifies the certs just fine, and the Settings certificates list appears entirely empty, as expected:

![An Android device showing an empty 'Trusted Credentials' list](./android-empty-system-certs.png)

Let's try another route and see if we can rewrite the system image filesystem directly to modify this list:

* Stop your emulator, and restart it from the CLI with a writable system partition:
  ```bash
  emulator -avd TestAVD -writable-system
  ```

* Make everything writable:
  ```
  adb root
  adb remount
  adb shell avbctl disable-verification
  adb reboot
  adb root
  adb remount
  ```
* You can delete all the normal certificates now (fair warning: this may create problems when using this emulator in future!) with:
    ```bash
    rm -rf /system/etc/security/cacerts/*
    rm -rf /system/etc/security/cacerts_google/*
    ```
* You'll find that you can't delete the certs from `/apex` though! Despite the remount, it's read-only, and `mount -o remount,rw ...` commands to do so manually will all fail.
* The closest you can do, so far as I can tell, is to unmount the certificates entirely with `umount <path>` so that they don't appear in the output of `mount` at all.
* Doesn't matter though: no matter how aggressive you get, seemingly no matter how much of the emulator's relevant internals you delete, AFAICT there's nothing you can do to stop these certs all happily loading up in the 'Trusted' list in the Settings.

As in with the other method, those same steps will work just fine on every other version of Android, up until now.

Note that this isn't just a detail about the Settings app, where these are cached or stored elsewhere. The certificates as shown here are reloaded each time, and they're representative of every app's view of the certificate store.

No matter what you modify on the filesystem, every app will continue to see Google's list of CA certificates regardless. I've been playing with this for a while, and as far as I can tell there's no working method to modify the certs anybody sees.

## What is going on here?

It's hard to tell precisely, so I'm guessing & inferring here (but if anybody does have more information, I'd love to hear it! Get in touch [on Mastodon](https://toot.cafe/@pimterry), [on Twitter](https://twitter.com/pimterry) or [directly](https://httptoolkit.com/contact/)).

I think the most likely case is that as part of the wider modularization of Android, these system files and components are now exposed to apps through an entirely different mechanism. It looks clear from the Android internals that they're still being [read from disk](https://android.googlesource.com/platform/frameworks/base/+/8b192b19f264a8829eac2cfaf0b73f6fc188d933/core/java/android/security/net/config/DirectoryCertificateSource.java#64) and the code to do so hasn't changed in many years, so this implies not everybody is seeing the same filesystem. This is similar to how Docker and friends use chroot, overlay filesystems and mounts to run containers with an isolated view of system files and other devices.

Clearly, this has some serious consequences.

As touched on above: if you're configuring your own system CA certificates on Android right now for debugging, reverse engineering, testing or research, that option is going away in Android 14, and presumably all future versions too.

For now anybody interested in these use cases will just have to avoid updating, or use custom OS releases that don't use the APEX module to manage their CA certs. As time goes by though, this will likely become increasingly impractical, since it means either diverging strongly from Android mainline on a key internal component or running outdated software indefinitely.

Concerningly though, this also implies that APEX system modules are going to be a wider problem. If, as it appears, content within APEX modules is unmodifiable to users even with root access to the device, then every future system component that's moved into the remit of APEX is another part of Android that becomes completely removed from user control.

More investigation is required and it's hard to know the full implications of that now, but for the many forks of Android like GrapheneOS & LineageOS, and for advanced device configuration tools like [Magisk](https://github.com/topjohnwu/Magisk#readme) and its many modules, it probably spells trouble.

Personally, for now I'm investigating some other promising alternative solutions to allow interception of your own network traffic on Android, and I'll share details here as soon as I have something working, so watch this space.

In the meantime, if you want to debug your own HTTPS traffic, you'll need to stick to Android 13.

**Want to inspect, debug & mock Android traffic on your Android 13 device anyway? [Try out HTTP Toolkit](https://httptoolkit.com/android/) - hands-free HTTP(S) interception for mobile, web browsers, backend services, Docker, and more.**