---
title: 'Notarize your Electron App with Electron Forge'
date: '2019-08-06T13:00'
cover_image: './header-images/signing.jpg'
draft: false
tags: electron, javascript, certificates
---

In the next release of macOS (10.15), if your app isn't notarized, your users can't run it. If you're distributing Mac apps, you need to deal with this. Fortunately, for Electron apps the process is fairly easy.

The final release date for 10.15 isn't yet announced, but there are many betas available to developers for testing. It's planned for fall 2019, and the hard requirement for notarization is already the reality in 10.14.5 for all new developer accounts (i.e. anybody who has never distributed software associated with their Apple developer id).

## What is notarization?

Notarization is designed to allow Apple to quickly ensure that your software is safe to run on users' computers. The full details are available in [Apple's own developer documentation](https://developer.apple.com/documentation/security/notarizing_your_app_before_distribution).

In short, it's a process where:

* You upload your new app build to Apple's notary service,
* The notary service automatically checks it for malicious content and other issues
* The notary service returns you a ticket showing that this check has been done on this build
* You attach ('staple') this ticket to the software
* When the app is installed, the Gatekeeper software on your users' Macs can check the stapled ticket, and thereby know that the software has already been examined by Apple.

In addition this means that every distributable version of your software comes with an attached ticket, which can be revoked later if necessary. If you discover that malicious code has somehow entered your application, or that your signing key has been leaked and other people are distributing unauthorized versions, you can remotely revoke the tickets and make that software uninstallable.

In addition the requirements for notarization are stricter than the existing code signing restrictions. Since notarization is now mandatory, this effectively represents Apple tightening their application security rules.

Note that this is _not_ app review: there's no human process here, it's an automated scanning of your distributable app versions, and a audit trail of those scans.

## What's involved?

There's a few main steps required for a typical Electron app build:

1. Ensure your app build conforms to the requirements for notarization. That means you need to:
    * Build with Xcode 10+, on macOS 10.12+
    * Build against the macOS 10.9 or later SDK
    * Code sign your builds with your Developer ID (local development or Mac Distribution certificates aren't enough)
    * Include a secure timestamp with your code signing signature (in most cases this already happens automatically)
    * Enable the 'Hardened Runtime' capability
    * Give your app the `com.apple.security.cs.allow-unsigned-executable-memory` entitlement, or Electron will fail to run when hardened runtime is enabled
2. Notarize all your builds before they're distributed:
    * Build the executable, but don't package it into a DMG/etc yet
    * Submit the app build to Apple's notary service
    * Wait for the notary service to give you a ticket
    * Attach that to the executable
    * Continue with your packaging process

## How do I do that in practice?

If you'd like a worked example, I recently added notarization to [HTTP Toolkit](https://httptoolkit.com), and you can see the commits involved here:

* [Update to XCode 10](https://github.com/httptoolkit/httptoolkit-desktop/commit/d8c55a6b42fa9ab67475c03cd497d8eb6d0d5d90)
* [Complete notarization requirements](https://github.com/httptoolkit/httptoolkit-desktop/commit/c67896837fb50cb635a0a9589052e4fafc48dd64)
* [Enable notarization](https://github.com/httptoolkit/httptoolkit-desktop/commit/956327cad3a6d2367470fc7a4ffb6600d8cc7c28)

Let's walk through it, step by step, for a typical app built with Electron Forge v5. I'm assuming that you have code signing set up already, but nothing else, and that you're building the app on Travis. If you're not using Travis this should translate easily to other environments, but if you don't have code signing in place you'll have to set that up first.

1. Make sure you're using OSX 10.12+ and Xcode 10+
    - For travis, just need to set `osx_image` to at least `xcode10`.
2. Record the Apple ID login details required
    - Save your username (your Apple developer account email address) in a secure environment variable called `APPLE_ID`.
    - Create an app-specific password for your developer account, following the instructions at https://support.apple.com/en-us/HT204397.
    - Store the app-specific password in a secure environment variable called `APPLE_ID_PASSWORD`.
3. Set `hardened-runtime: true` and `gatekeeper-assess: false` in your [electron-osx-sign](https://github.com/electron/electron-osx-sign) configuration
    - For Electron Forge v5, this is in your forge config under `osxSign`, within `electronPackagerConfig`.
    - `hardened-runtime` is clear enough: this enables [hardened runtime](https://developer.apple.com/documentation/security/hardened_runtime_entitlements).
    - Disabling `gatekeeper-assess` is required because otherwise electron-osx-sign will ask Gatekeeper to sanity check the build, and in new MacOS versions this will fail as it's not yet notarized. Fortunately, notarization will make these same checks for us later on anyway, so this is safe to skip.
4. Create an entitlements file, and set the `entitlements` and `entitlements-inherit` config properties of electron-osx-sign to use it
    - The minimal entitlements file for an Electron app looks like this:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
        <dict>
            <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
            <true/>
        </dict>
    </plist>
    ```

    - The `entitlements` and `entitlements-inherit` configuration properties should be a relative path to this file (e.g. `src/entitlements.plist`), in the same `osxSign` configuration as the previous step.
5. Install [electron-notarize](https://www.npmjs.com/package/electron-notarize)
6. Create a script that will perform the notarization
    - This needs to call the `notarize` function from electron-notarize, and wait for it to complete.
    - An example script might look like:

    ```js
    const { notarize } = require('electron-notarize');

    // Path from here to your build app executable:
    const buildOutput = require('path').resolve(
        __dirname,
        '..',
        'out',
        'HTTP Toolkit-darwin-x64',
        'HTTP Toolkit.app'
    );

    module.exports = function () {
        if (process.platform !== 'darwin') {
            console.log('Not a Mac; skipping notarization');
            return;
        }

        console.log('Notarizing...');

        return notarize({
            appBundleId: 'tech.httptoolkit.desktop',
            appPath: buildOutput,
            appleId: process.env.APPLE_ID,
            appleIdPassword: process.env.APPLE_ID_PASSWORD
        }).catch((e) => {
            console.error(e);
            throw e;
        });
    }
    ```

    - Don't forget to update the `buildOutput` path &  `appBundleId` in the above to match your codebase!
7. Run this script, after the executable is built but before it is packaged into a DMG or similar.
    - Confusingly, the correct forge hook for this is called `postPackage`.
    - To set that up in Electron Forge v5, you need to add the below at the top level of your forge config:

    ```js
    "hooks": {
        "postPackage": require("./src/hooks/notarize.js")
    }
    ```

## Get notarizing!

Once this is in place, your builds should immediately start notarizing your OSX Electron executable. You'll receive an email from Apple each time a notarization is completed; these might be useful to audit notarization in your processes, but they can be very noisey, so you'll probably want to filter them out of your inbox.

You can check that notarization is worked by opening the resulting app on a Mac; on the first run after downloading it, you should see a popup saying something like:

> "YourApp.app" is an app downloaded from the Internet.
> Are you sure you want to open it?
> Chrome downloaded this file on August 6, 2019.
> **Apple checked it for malicious software and none was detected.**

That final line is the key here: your Mac has detected the stapled ticket, it's happy with it, and you're all good.

Don't forget to actually run the app though, and confirm it all works happily under the tighetened hardened runtime requirements! If you have any issues there you may want to look at including [extra entitlements](https://developer.apple.com/documentation/bundleresources/entitlements), or reducing your use of protected APIs.

One last note: that message above is what you'll see if you download a built version from the internet, e.g. from your CI build output. If you built it locally, or need to manually confirm the notarization for some other reason, take a look at [Apple's Gatekeeper testing instructions](https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Procedures/Procedures.html#//apple_ref/doc/uid/TP40005929-CH4-SW25).

That's it! Good luck, and happy notarizing.