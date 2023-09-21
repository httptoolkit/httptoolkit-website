---
title: "New ways to inject system CA certificates in Android 14"
date: '2023-09-21T12:00'
cover_image: './header-images/android-phone.jpg'
---

A couple of weeks ago I published a post about [changes in Android 14](https://httptoolkit.com/blog/android-14-breaks-system-certificate-installation/) that fundamentally break existing approaches to installing system-level CA certificates, even with root access. This has triggered some fascinating discussion! I highly recommend a skim through the debate on [Mastodon](https://toot.cafe/@pimterry/111012860794214522) and [Hacker News](https://news.ycombinator.com/item?id=37391521).

Since that was posted, quite a few people have talked to me about possible solutions, going beyond the previous approaches with new mechanisms that make it practical to do this in Android 14+, and there are some good options here.

While direct root access to change these certificates by simply writing to a directory is indeed no longer possible, root is root, and so with a bit of work there are still some practical & effective ways to dig down into the internals of Android and seize control of these certs once more.

### Choose your own adventure:

If you just want to intercept an Android 14+ device right now, stop reading this, **[download the latest HTTP Toolkit](https://httptoolkit/android/)**, connect your device to ADB, click the 'Android Device via ADB' interception option for automatic setup, and dive into your traffic.

If you just want to know the steps to manually do system certificate injection on Android 14 for yourself, **jump down to [How to install system CA certificates in Android 14](#how-to-install-system-ca-certificates-in-android-14)**.

If you want the full background, so you can understand how & why this all works, **read on**:

## Clearing up confusion

Before digging into this, I do want to explicitly clear up a few misunderstandings that I've seen repeatedly pop up from the previous article:

* These changes don't affect installation of CAs in other scenarios. As far as I'm aware, CA installation for fully managed enterprise-provisioned devices and the limited user-installed (as opposed to system-level) CA certificates will continue functioning as before. If you're not using root access to inject system-level CA certificates into a rooted device or emulator, you don't need to worry about this.
* Similarly, it is still possible to soft-remove system CA certificates using the existing toggle in the Settings UI.
* This does affect AOSP too, and so will presumably affect most alternative distributions unless they actively disable it.
* Yes, Android root access is still all powerful - it's not literally true that Android has made modifying certificates _impossible_, they've just blocked doing so directly. In the extreme case, you can build your own Android images from scratch without these changes, and even without that, root access provides many mechanisms to change system behaviour. Nonetheless, moving from 'write to a directory' to 'technically possible via largely undocumented internals' is a meaningful problem, and any divergence from mainline Android behaviour means more problems later (not least, maintaining that divergence as Android keeps evolving). Removing users' ability to _directly_ modify system configuration reduces practical user control over their devices.
* No, this is not likely to be an explicit manouever on the part of Google. I think this is just thoughtless collateral damage (and yes, the primary goal of the actual change is a good thing!). Even unintentionally though, it's not great that a key workflow for Android privacy & security research has been thoughtlessly broken, nor that major friction has been created for users' control of their own devices. To my eyes, whilst Google aren't actively blocking those use cases, they're very much 'not supported' WONTFIX scenarios, and so impacts like this are sadly just not considered.

## Under the hood

The debate around all this has lead me on a fascinating exploration, delving into the internals of Android. To recap the problem quickly:

* Until now, system-trusted CA certificates lived in `/system/etc/security/cacerts/`. On a standard AOSP emulator, those could be modified directly with root access with minimal setup, immediately taking effect everywhere.
* In Android 14, system-trusted CA certificates will generally live in `/apex/com.android.conscrypt/cacerts`, and all of `/apex` is immutable.
* That APEX cacerts path cannot be remounted as rewritable - remounts simply fail. In fact, even if you unmount the entire path from a root shell, apps can still read your certificates just fine.
* The alternative technique of mounting a tmpfs directory over the top also doesn't work - even though this means that `ls /apex/com.android.conscrypt/cacerts` might return nothing (or anything else you like), apps will still see the same original data.

So, what's going on here?

The key is that Android apps are containerized - much like Docker, Android uses [Linux namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html) to isolate each app's view & access to the wider system they're running on. There's a few elements to this, but from our point of view, the interesting point is that each app has its own [mount namespace](https://man7.org/linux/man-pages/man7/mount_namespaces.7.html) which means that they see different mounts to what's visible elsewhere.

You can test this out for yourself, on a rooted Android device:

* Open a root shell (e.g. `adb shell`, `su`)
* Run `mount` to see what's mounted (from the perspective of the shell process)
* Run `ps -A`
* Find a process id for a normal running Android app from the list
* Run `nsenter --mount=/proc/$PID/ns/mnt /bin/sh` - This opens a shell inside that process's mount namespace
* Run `mount` again
* Note that the results are quite different!

For example, inside an app's mount namespace, you'll see different mounts including `/dev/block/dm-{number}` resources mounted on `/data/misc/profiles/ref/{your.app.build.id}` and `tmpfs` mounts over `/data/user` and other directories.

Normally, this doesn't matter. By default, mounts are created with 'SHARED' propagation, meaning that changes to mounts immediately within that path will be propagated between namespaces automatically (i.e. the mount namespaces are _not_ fully isolated) so that everybody sees the same thing (on Linux, you can check the propagation of your mounts with `findmnt -o TARGET,PROPAGATION`).

This is the case for `/` on Android, and most other mounts, so for example in a root shell you can do this:

* `mkdir /data/test_directory` - Create an empty target directory
* `mount -t tmpfs tmpfs /data/test_directory` - Mount a writable temporary in-memory filesystem there
* And then, for both your normal shell _and_ in an app's mount namespace (via `nsenter` as above) `mount` will show this:
    ```bash
    tmpfs on /data/tmp_dir type tmpfs (rw,seclabel,relatime)
    ```
    I.e. both your ADB shell and all other processes on the device can see and use this mount, just as you'd expect

Unfortunately though, that's not the case for APEX. The `/apex` mount is [explicitly mounted](https://cs.android.com/android/platform/superproject/main/+/main:system/core/init/mount_namespace.cpp;l=97;drc=566c65239f1cf3fcb0d8745715e5ef1083d4bd3a) with PRIVATE propagation, so that all changes to mounts inside the `/apex` path are never shared between processes.

That's done by the `init` process which starts the OS, which then launches the [Zygote process](https://en.wikipedia.org/wiki/Booting_process_of_Android_devices#Zygote) (with a new mount namespace copied from the parent, so including its own private `/apex` mount), which then in turn starts each app process whenever an app is launched on the device (who each in turn then copy that same private `/apex` mount).

This means from an ADB shell's mount namespace, given this private mount, it's impossible to directly make changes to APEX mounts that will be visible to apps on the device. Since all APEX mounts are read-only, that means you can't directly modify how any of that filesystem appears for your running apps - you can't remove, modify or add anything. Uh oh.

So, for those of us trying to inject certificates, or indeed change any other APEX content, how do we solve this? In a perfect world, there's a few specific things we're looking for here, which the previous pre-14 Android solution did provide:

* Being able to add, modify and remove CA certificates from a device
* Not needing to inconveniently reboot the device or restart apps
* Having those changes become visible to all apps immediately
* Being able to do so quickly & scriptably, for easy certificate management and tool integrations

It turns out there's at least two routes that tick those boxes:

### Option 1: Bind-mounting through NSEnter

The key to this is the first caveat in the above paragraph: we can't solve this _from an ADB's shell's mount namespace_. Fortunately, using `nsenter`, we can run code in other namespaces! I've included a full script you can blindly run this for yourself below, but first let's talk about the steps that make this work:

* First, we need set up a writable directory somewhere.
    For easy compatibility with the existing approach, I'm doing this with a `tmpfs` mount over the (still present) non-APEX system cert directory:
    ```bash
    mount -t tmpfs tmpfs /system/etc/security/cacerts
    ```
* Then you place the CA certificates you're interested in into this directory (e.g. you might want copy all the defaults out of the existing `/apex/com.android.conscrypt/cacerts/` CA certificates directory) and set permissions & SELinux labels appropriately.
* Then, use `nsenter` to enter the Zygote's mount namespace, and bind mount this directory over the APEX directory:
    ```bash
    nsenter --mount=/proc/$ZYGOTE_PID/ns/mnt -- \
        /bin/mount --bind /system/etc/security/cacerts /apex/com.android.conscrypt/cacerts
    ```
    The Zygote process spawns each app, copying its mount namespace to do so, so this ensures all newly launched apps (everything started from now on) will use this.
* Then, use `nsenter` to enter each already running app's namespace, and do the same:
    ```bash
    nsenter --mount=/proc/$APP_PID/ns/mnt -- \
        /bin/mount --bind /system/etc/security/cacerts /apex/com.android.conscrypt/cacerts
    ```
    Alternatively, if you don't mind the awkward UX, you should be able to do the bind mount on `init` itself (PID 1) and then run `stop && start` to soft-reboot the OS, recreating all the namespaces and propagating your changes everywhere (but personally I do mind the awkward reboot, so I'm ignoring that route entirely).

Bingo! Every app now sees this mount as intended, with the contents of your own directory replacing the contents of the Conscrypt module's CA certificates.

Actually doing this in practice takes a little more Bash scripting trickery to make it all run smoothly, like automatically running all those app remounts in parallel, managing permissions & SELinux labels, and dealing with Zygote vs Zygote64 - see the full script below for a ready-to-go demo.

### Option 2: Recursively remounting mountpoints

The second solution comes from [infosec.exchange/@g1a55er](https://infosec.exchange/@g1a55er/), who published [their own post](https://www.g1a55er.net/Android-14-Still-Allows-Modification-of-System-Certificates) exploring the topic. I'd suggest you read through that for the full details, but in short:

* You can remount `/apex` manually, removing the PRIVATE propagation and making it writable (ironically, it seems that entirely removing private propagation _does_ propagate everywhere)
* You copy out the entire contents of `/apex/com.android.conscrypt` elsewhere
* Then you unmount `/apex/com.android.conscrypt` entirely - removing the read-only mount that immutably provides this module
* Then you copy the contents back, so it lives into the `/apex` mount directly, where it can be modified (you need to do this quickly,  as [apparently](https://infosec.exchange/@g1a55er/111069489513139531) you can see crashes otherwise)
* This should take effect immediately, but they recommend killing `system_server` (restarting all apps) to get everything back into a consistent state

As above - this is a neat trick, but it's not my work! If you have questions on that do get in touch with [@g1a55er](https://infosec.exchange/@g1a55er/) directly.

Note that for both these solutions, this is a temporary injection - the certificates only last until the next reboot. To do this more permanently, you'll need to permanently modify the mount configuration somehow. I haven't investigated that myself (for testing & debugging use cases, automated temporary system re-configuration is much cleaner) but if you find a good persistent technique do please [get in touch](https://toot.cafe/@pimterry) and I'll share the details here for others.

## How to install system CA certificates in Android 14

So, putting that together, what do you need to do in practice, to actually inject your system-level CA certificate in Android 14?

First, copy your CA certificate onto the device, e.g. with `adb push $YOUR_CERT_FILE /data/local/tmp/$CERT_HASH.0`. You'll need the certificate hash in the filename, just as you did in previous OS versions (see my implementation of this [here](https://github.com/httptoolkit/httptoolkit-server/blob/54234266743bb76988efc80071f1f1da69b88b12/src/certificates.ts#L11-L25) if you're not sure).

Then run the below, replacing `$CERTIFICATE_PATH` with the path on the device (e.g. `/data/local/tmp/$CERT_HASH.0`) for the cert you want to inject:

```bash
# Create a separate temp directory, to hold the current certificates
# Otherwise, when we add the mount we can't read the current certs anymore.
mkdir -p -m 700 /data/local/tmp/tmp-ca-copy

# Copy out the existing certificates
cp /apex/com.android.conscrypt/cacerts/* /data/local/tmp/tmp-ca-copy/

# Create the in-memory mount on top of the system certs folder
mount -t tmpfs tmpfs /system/etc/security/cacerts

# Copy the existing certs back into the tmpfs, so we keep trusting them
mv /data/local/tmp/tmp-ca-copy/* /system/etc/security/cacerts/

# Copy our new cert in, so we trust that too
mv $CERTIFICATE_PATH /system/etc/security/cacerts/

# Update the perms & selinux context labels
chown root:root /system/etc/security/cacerts/*
chmod 644 /system/etc/security/cacerts/*
chcon u:object_r:system_file:s0 /system/etc/security/cacerts/*

# Deal with the APEX overrides, which need injecting into each namespace:

# First we get the Zygote process(es), which launch each app
ZYGOTE_PID=$(pidof zygote || true)
ZYGOTE64_PID=$(pidof zygote64 || true)
# N.b. some devices appear to have both!

# Apps inherit the Zygote's mounts at startup, so we inject here to ensure
# all newly started apps will see these certs straight away:
for Z_PID in "$ZYGOTE_PID $ZYGOTE64_PID"; do
    # We use 'echo' below to trim spaces
    nsenter --mount=/proc/$(echo $Z_PID)/ns/mnt -- \
        /bin/mount --bind /system/etc/security/cacerts /apex/com.android.conscrypt/cacerts
done

# Then we inject the mount into all already running apps, so they
# too see these CA certs immediately:

# Get the PID of every process whose parent is one of the Zygotes:
APP_PIDS=$(
    echo "$ZYGOTE_PID $ZYGOTE64_PID" | \
    xargs -n1 ps -o 'PID' -P | \
    grep -v PID
)

# Inject into the mount namespace of each of those apps:
for PID in $APP_PIDS; do
    nsenter --mount=/proc/$PID/ns/mnt -- \
        /bin/mount --bind /system/etc/security/cacerts /apex/com.android.conscrypt/cacerts &
done
wait # Launched in parallel - wait for completion here

echo "System certificate injected"
```

The corresponding change to fully automated this in HTTP Toolkit is [here](https://github.com/httptoolkit/httptoolkit-server/commit/965fd8d9b287af0e4b305d828d5e8e1aa52dce36).

In my testing, this works out of the box on all the rooted official Android 14 emulators, and every other test environment I've managed to get my hands on (if you have a case that doesn't work, please get in touch!). With a few tweaks (see the commit above) it's possible to build this into a single script that works out of the box for all modern Android devices, down to at least Android 7. When actually running this in practice, entering and remounting certificates within every running app on a device seems to take comfortably less than a second, so this fits nicely within the acceptable time for automated device setup time in my use cases.

This has all come together just in time, since at the time of writing Android 14 is on its (likely) final beta release with a full launch coming within weeks. HTTP Toolkit users will have automated setup for Android 14 ready and waiting before any of their devices even start to update.

That's everything from me, and hopefully that resolves this for many Android versions to come. A big thanks to everybody who discussed this and shared suggestions, and especially [mastodon.social/@tbodt](https://mastodon.social/@tbodt), [ioc.exchange/@tmw](https://ioc.exchange/@tmw) & [infosec.exchange/@g1a55er](https://infosec.exchange/@g1a55er/), who popped into my Mastodon mentions with some really helpful background & suggestions.

Have thoughts, feedback or questions? Get in touch [on Mastodon](https://toot.cafe/@pimterry), [on Twitter](https://twitter.com/pimterry) or [directly](https://httptoolkit.com/contact/).

**Want to inspect, debug & mock HTTP(S) traffic on your Android devices and test this out? [Try out HTTP Toolkit](https://httptoolkit.com/android/) - hands-free HTTP(S) interception for mobile, web browsers, backend services, Docker, and more.**