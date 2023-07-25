---
title: "Android Chrome 99 expands Certificate Transparency, breaking all MitM dev tools"
date: '2022-05-11T16:00'
cover_image: './header-images/person-behind-mirror.jpg'
---

Certificate transparency is superb improvement to HTTPS certificate security on the web that's great for users and businesses, but on Android it creates a huge problem for the many developer tools like **[HTTP Toolkit](https://httptoolkit.com)** which install trusted system certificates into Android to intercept & debug app traffic.

This doesn't appear in the main announcements anywhere, but buried deep in the enterprise [release notes](https://support.google.com/chrome/a/answer/7679408#certTrans&zippy=%2Cchrome) for Chrome v99 there's a small note that says:

> Certificate transparency is already enforced on desktop platforms, and for some Android users. Chrome 99 expands certificate transparency to all Android Chrome users.

And with that small note, Chrome on Android become uninterceptable for all HTTP Toolkit users using rooted devices, and anybody else who actively installs and trusts their own system CA certificates.

If you're running into an `ERR_CERTIFICATE_TRANSPARENCY_REQUIRED` error in Chrome while trying to debug your HTTPS traffic with some MitM debugging proxy, then this is affecting you too.

Let's talk about how certificate transparency works, why this breaks, and how you can work around it to keep debugging HTTPS from Chrome on your Android device regardless.

## Certificate Transparency (CT)

HTTPS certificates are issued and signed by Certificate Authorities (CAs) who are trusted by your browser & OS.

That's great when it works, but sometimes it doesn't. CAs can make mistakes when issuing certificates, when verifying a client's identity beforehand, or through malice somewhere, and issue fraudulent certificates to people who shouldn't have them.

For example, let's say a trusted CA issues a certificate for google.com to the wrong person (this [actually happened](https://security.googleblog.com/2011/08/update-on-attempted-man-in-middle.html), [repeatedly](https://security.googleblog.com/2015/09/improved-digital-certificate-security.html)). That issued certificate is incredibly powerful - whoever has it can freely intercept all traffic sent by anybody to Google.com and both see & modify that traffic, whilst browsers will show all users a padlock and tell them everything is totally fine & secure.

Even worse though: attacks like this were invisible. In the past, if you managed to get such a certificate and started doing targeted interception of Google.com somewhere, you could keep doing so almost indefinitely. Unless you really slip up or you intercept somebody who's checking for this very very closely, nobody will ever know.

Certificate Transparency aims to solve this, by allowing domain owners to be aware of all valid certificates ever issued for their domain, and thereby ensuring any misissued certificates can be spotted and revoked immediately. It works (very roughly) like this:

* Some independent organizations host certificate logs (CT logs), which immutably (via [merkle trees](https://en.wikipedia.org/wiki/Merkle_tree)) record the details of issued TLS certificates, and let people query these logs.
* When a CA issues a new certificate, it submits the details to one or more of these log providers, receiving an signed certificate timestamp (SCT) signed by the provider.
* The CA sends the certificate with the SCT embedded back to their client (e.g. a person hosting a web service who wants a certificate for HTTPS).
* The CA's client serves all their HTTPS traffic using this certificate.
* Browsers receiving this traffic enforce that all certificates they receive come with a matching SCT, signed by a log provider they trust.

SCTs effectively act as a receipt, proving that you have submitted your certificate to a trusted log provider and so that its existence is public knowledge. By requiring an SCT at the browser level, you're guaranteeing that certificates must be publicly recorded to be usable. That means anybody can query the public logs to see the full list of valid certificates that have been issued for their domain, and can set up warning system to immediately know if any certificates are ever issued unexpectedly.

This makes it very very difficult to issue fraudulent certificates for a domain without publicly announcing it in a CT log.

## Certificate Transparency meets MitM debugging proxies

[MitM proxies](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) like HTTP Toolkit sit between an HTTP or HTTPS client and the server they want to talk to, and proxy the traffic, so that it can be inspected and modified. These are popular tools for developers, testers, security/privacy researchers & reverse engineers. For most software, a lot of important interactions involve HTTP(S) and being able to see and poke that traffic directly is very powerful.

To do this for HTTPS, these proxies basically issue fraudulent certificates for the domains being intercepted, with the cooperation of the HTTPS client (by configuring the client or the OS itself to trust the proxy's certificate) so that they're accepted.

Although it sounds like CT should block this, it's not actually intended to - by design, it only applies to public root certificates, not to manually trusted self-signed certificates, or it would make all self-signed certificates impossible to use, breaking everything from enterprise intranet sites to local HTTPS development servers.

It's these self-signed certificates that MitM proxies use to intercept traffic, so this shouldn't be an issue, and on Chrome on desktop it's not. The MitM certificate is installed into the OS trust store manually, or trusted explicitly via Chrome flags, and the certificate transparency requirements aren't applied.

That is, not until Chrome 99 was released on Android.

## Certificate Transparency in Chrome 99 on Android

On Android, there are a few different certificate stores (full details [here](https://httptoolkit.com/blog/intercepting-android-https/#android-certificate-stores)). You can install your own CA certificates to intercept HTTPS traffic on Android, but intercepting any interesting traffic from an app that isn't explicitly opting-in to interception requires you to put your certificate into the 'system' store, not just the normal 'user' store.

Almost all apps will trust the CAs from this system store to issue certificates for HTTPS. That means if you can put your MitM proxy of choice's CA certificate there, then your proxy can intercept all those app's HTTPS, and you can immediately see what traffic any app is sending, and test out what it does with alternate responses. This is great! Writing to the system store is only possible on rooted devices and emulators, but that's fairly standard for reverse engineering work, and many developers & testers have rooted devices too so they can do the same with production builds, or to modify other system settings.

The problem though is that Chrome's condition for what it considers to be a public root certificate (and so subject to certificate transparency requirements) is just whether it's in the system store or the user store. The system store is widely used for self-signed certificates like this, but as soon as you put your certificate in there, suddenly everything issued by your little testing CA must be formally submitted to a CT log and served up with an SCT proving it's been published publicly.

That means that since Chrome 99 was released until I shipped a fix (just now), when you used HTTP Toolkit on a rooted device Chrome threw loud `NET::ERR_CERTIFICATE_TRANSPARENCY_REQUIRED` errors on every single HTTPS page, like so:

![Chrome showing a certificate transparency error for example.com](./chrome-android-certificate-transparency-error.png)

This applies to all MitM web debugging proxies. If you put your certificate in the system store so you can intercept app traffic, then you can't intercept Chrome v99+. If you put your certificate in the user store to intercept Chrome, then you can't intercept anything _except_ Chrome. (And no, you can't do both: if the certificate's in the system store at all, then certificate transparency is mandatory and it's game over). Very inconvenient!

## How to Fix It

First up, it'd be great if Chrome fixed this themselves, by treating user-installed system certificates differently to the built-in root certificates. I've filed [a Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1324303) suggesting that, but I'm not holding my breath - despite the popular use case, I suspect they'll likely consider adding your own system certificates as officially unsupported, and an acceptable casualty for the benefits of certificate transparency. We'll see though (feel free to star that bug if this is interesting to you too).

In the meantime, there is a way to work around this: you can manually modify the flags used by Chrome, to explicitly trust your specific CA certificate, in addition to installing it the system store, thereby disabling certificate transparency checks.

You can do this using the `--ignore-certificate-errors-spki-list=<cert hash>` option. This is available on all platforms, but it's a bit tricky to set on Android, since you don't directly control how Chrome starts up. To enable this, you need to:

* Get the SPKI fingerprint of your certificate. You can do so using this OpenSSL magic incantation:
  ```
  openssl x509 -in $YOUR_CA_CERTIFICATE -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
  ```
* Create a file containing one line:

  `chrome --ignore-certificate-errors-spki-list=$YOUR_SPKI_FINGERPRINT`
* Use `adb push` to store this on your Android device at:
    * `/data/local/chrome-command-line`
    * `/data/local/android-webview-command-line`
    * `/data/local/webview-command-line`
    * `/data/local/content-shell-command-line`
    * `/data/local/tmp/chrome-command-line`
    * `/data/local/tmp/android-webview-command-line`
    * `/data/local/tmp/webview-command-line`
    * `/data/local/tmp/content-shell-command-line`

    This ensures it applies for all varieties of Chromium, in both normal & debug environments. You'll need root access to set the non-tmp files, which is what's used on production devices (while the `tmp` files are used by userdebug builds).
* Set the permissions of each the above with `chmod 555 <filename>` to ensure that it's readable by Chromium when it starts.
* Force stop Chrome (`am force-stop com.android.chrome`), and then open it again.
* Check the command line flags shown on `chrome://version` to ensure this command line option is included there.

Not convenient at all, but not the worst workaround in the world, and although it requires root in many cases, this only affects rooted devices & emulators so that's no big deal.

This is now integrated into HTTP Toolkit as part of the automated ADB setup in the latest release, so if you're using a rooted device with HTTP Toolkit this will work for you automatically in future! Of course, if you do still have problems do please [file an issue](https://github.com/httptoolkit/httptoolkit/issues/new/choose).

**Want to take your Android reverse engineering to the next level? [HTTP Toolkit](https://httptoolkit.com/android/) gives you one-click HTTP(S) interception, inspection & mocking for any Android app.**
