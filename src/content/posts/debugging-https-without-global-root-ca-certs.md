---
title: "Global developer CAs considered harmful"
date: '2020-01-14T13:00'
cover_image: './header-images/locks.jpg'
redditUrl: https://www.reddit.com/r/programming/comments/eol0il/global_developer_cas_considered_harmful/
hackerNewsUrl: https://news.ycombinator.com/item?id=22044381
tags: tls, certificates, security
---

Certificate infrastructure is built on trust. If you trust the wrong thing, it all falls down. Unfortunately, we developers do it all the time anyway. YOLO.

A remarkable number of dev tools & practices encourage or require you to globally trust a certificate authority (CA) that they provide or generate locally. If you do so these, anybody with access to the key for that CA can rewrite any HTTPS traffic between you and anything, and take almost complete control of your internet traffic.

We don't need to do this. These tools could easily work without globally installed CAs, and they open you to unnecessary risks by not doing so. We can do better.

## Who does this?

Lots of different dev tools, for a couple of different reasons.

First, there's a selection of tools that generate HTTPS CAs & certificate for local development servers, and trust them for you globally & automatically. That lets you easily run a local HTTPS server on a hostname where certs aren't otherwise available, like `localhost` or other local hostnames (`my-docker-container:8080`). That's often useful because more and more web features are limited to only HTTPS origins.

The tools doing this include:

* [mkcert](https://github.com/FiloSottile/mkcert) - a go-based CLI tool that generates a CA and then automatically trusts it everywhere, recommended for HTTPS setup with everything from [ASP.NET](https://www.scottbrady91.com/ASPNET/Using-mkcert-for-ASPNET-Core-Development) to [Python](https://gist.github.com/h007/196575c0d68d3832d246f1a32c07e6fd).
    ```
    $ mkcert -install
    Created a new local CA at "/Users/filippo/Library/Application Support/mkcert" 💥
    The local CA is now installed in the system trust store! ⚡️
    The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
    ```
* [Devcert](https://github.com/davewasmer/devcert) - an npm module which creates a self-signed CA, and automatically trusts this CA globally in the OS keystore and in all browsers it finds.
* [Gatsby](https://www.gatsbyjs.org/docs/local-https/) - a static site framework. Running Gatsby with `--https` will generate a CA, prompt you for your password, and then trust it automatically & globally, in both your system cert store and every browser store it can find.
* [Create-React-App](https://create-react-app.dev/docs/using-https-in-development/) - the official toolchain for setting up React single-page app projects. To their credit, they don't explicitly tell you to trust the cert system-wide, but they don't tell you what to do instead, and the internet is full of [guides](https://medium.com/@danielgwilson/https-and-create-react-app-3a30ed31c904) telling you how to trust it globally.
* [Generator-Office](https://github.com/OfficeDev/generator-office) - a popular template for building MS Office add-ins. Generates & prompts you to install a system-wide root CA for local HTTPS development, without the slightest warning about what that means.

In addition to local HTTPS servers, there's also a world of HTTPS debugging tools, in a similar space to [HTTP Toolkit](/) itself. These tools let you intercept, inspect & rewrite HTTPS traffic between a client and a server, for testing, debugging & prototyping. They typically intercept HTTPS traffic from your whole system, and require/strongly encourage you to trust their CA certificates globally to do so.

There's a host of examples of these, from [Fiddler](https://docs.telerik.com/fiddler/Configure-Fiddler/Tasks/TrustFiddlerRootCert) on Windows, to [Charles](https://www.charlesproxy.com/documentation/using-charles/ssl-certificates/) on Mac, or [Burpsuite](https://support.portswigger.net/customer/portal/articles/1783075-installing-burp-s-ca-certificate-in-your-browser) (Java, cross platform), all following that same pattern.

A few of these server & debugging tools do recognize that there's risks inherent in this (although they do it anyway). Warnings abound:

**Mkcert:**

> **Warning**: the rootCA-key.pem file that mkcert automatically generates gives complete power to intercept secure requests from your machine. Do not share it.

**Devcert:**

> This exposes a potential attack vector on your local machine: if someone else could use the devcert certificate authority to generate certificates, and if they could intercept / manipulate your network traffic, they could theoretically impersonate some websites, and your browser would not show any warnings (because it trusts the devcert authority).

**Burp Suite:**

> If you install a trusted root certificate in your browser, then an attacker who has the private key for that certificate may be able to man-in-the-middle your SSL connections without obvious detection, even when you are not using an intercepting proxy. To protect against this, Burp generates a unique CA certificate for each installation, and the private key for this certificate is stored on your computer, in a user-specific location. If untrusted people can read local data on your computer, you may not wish to install Burp's CA certificate.

If only we could avoid these warnings somehow, and do something safer instead...

## What could possibly go wrong?

Doing this but showing warnings isn't the right choice. Firstly because it's rarely necessary at all (we'll get to that), but mainly because nobody reads warnings. Silently creating new risks on your machine and then waving away concerns with "well we warned you" is a touch rude. We should all encourage our users to do the safe thing by default, so far as possible.

As a case in point, both Preact-CLI & Webpack-Dev-Server support automatic local HTTPS, so that users can easily use HTTPS locally by trusting their CA certificates. In 2017 it was [discovered](https://medium.com/@mikenorth/webpack-preact-cli-vulnerability-961572624c54) by Mike North that both projects were using a shared default CA whose HTTPS key & certificate was published as part of the tool.

Anybody who trusted the certs from either tool before June 2017 and hasn't heard about this now trusts a compromised CA, which means they 100% trust pretty much anybody to send them anything, until that CA expires. For webpack-dev-server, that CA cert is valid until 2026, 10 years after it was issued. Oops.

It's hard to get precise numbers on how many users this affected, but the Webpack-Dev-Server package was installed 27 million times before the fix for this was released, so even with conservative estimates this was Very Bad.

To quote Mike's disclosure:

> As a result of this vulnerability, an attacker could very easily and reliably eavesdrop on, and tamper with HTTPS traffic across ALL DOMAINS, undetected. Essentially HTTPS is completely compromised, and no data is secret or safe anymore.

This happened because the private key was shared & fully public. All the tools above generate fresh CA certificates & keys on every developer's machine, so they're not immediately vulnerable to this specific issue. They avoid the worst case, but this shows what happens if users keys are exposed, and just because we've fixed the worst case, that doesn't make that risk go away.

In fact, in some ways it's got even worse since 2017, with the new [Signed HTTP Exchanges](https://developers.google.com/web/updates/2018/11/signed-exchanges) feature (live in Chrome 73). In the past, abusing a trusted CA certificate would require you to intercept a machine's HTTPS traffic to the target domain. Nowadays you can instead generate signed HTTP exchanges from domain X using an exposed CA, then host that exchange on your own domain Y. Anybody visiting & trusting the CA will treat that as real traffic from X. Now domain Y can now run JS in domain X's origin, or poison its cache to inject code later. Drive-by attacks, no interception of traffic necessary.

And then there's everything else on your system that trusts your installed CA certificates. I wouldn't be surprised if this worked to defeat code signing checks, attack many app's automated update processes, and make you vulnerable in lots of other places. You can be too trusting.

## What're the chances?

Once you have a CA certificate like this installed, all certificate-based security on your machine becomes contingent on you keeping the private key of that CA secret. That's easier said than done, especially given that many users are unaware of the risks, where the key is stored, or even that it exists.

To use a CA like this locally you generally need the CA private key in a user-readable file, so you can use it (or you need to run your dev tools as root, which brings fun new risks). That means you have a user-readable file on your computer that is a catastrophic security risk if it's ever exposed.

If somebody ever gets access to your machine, if you accidentally commit this file to a project, if you back it up to the wrong place, or if a rogue app on your machine quietly reads it, you now have a huge & invisible problem.

As an industry we spend a lot of effort elsewhere avoiding exactly this kind of risk. We password protect our SSH keys, we salt & hash passwords in databases, and we encrypt our password manager's database on disk. You don't want a "if you can read this, you own my computer" user-readable file on your computer. You _definitely_ don't want tools to generate one for you and quietly & automatically store it somewhere.

To be fair, it is possible in the HTTPS devserver case to have a CA key that's only root-readable, and to cache user-readable certificates & keys per-domain instead. A tool then needs to prompt for sudo/admin rights for initial setup for each domain, and when certs expire. That definitely helps, but only for servers; it's not practical for debuggers, where you might talk to many domains unpredictably.

Even for servers this isn't perfect: only root-readable doesn't mean "100% secure forever", each per-domain key still needs to be user-readable so remains vulnerable, and your dev tools need to prompt you at intervals for authorization as your certs expire, which isn't great either (and potentially opens a UX hole for others to steal the root-readable CA key).

That brings me to one of the consequences of this whole mess: because refreshing global CAs is hard, managing global CAs is much easier with long-lived certificates, which makes things even worse if they ever do get exposed. Your dev tools do not need certificates that last 10 years.

Even if the CA key is never exposed, at the very least you're giving random developer tools you just downloaded permission to inspect & rewrite everything you ever see and do on the internet for years into the future. That should sound scary - as we saw with Webpack & Preact-CLI, great dev tool authors are not necessarily security experts.

Fundamentally, the problem here is that globally installing CA certificates for local development tools violates [the principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege). Nobody uses these tools intending to redefine their long-term definition of trust for the whole internet, but that's what they're doing. Instead, we should trust these tools to verify traffic to the specific domains we care about, for the client we're using, whilst we're using the tool.

Fortunately, we can do exactly that.

## How could this work better?

For 99% of cases you don't need to trust these CA certificates globally. When running an HTTPS server, you only need to trust it in your HTTP client whilst the server is running, and only for that one domain. When debugging a client, you only need to trust the certificate within that client, during that one debugging session.

We can and should do exactly that. The real only argument against this I've seen is that it's hard, but that's really not true, even before you compare this with the complexity of automatically elevating privileges & globally installing certificates for every possible browser & OS.

Let's talk about browsers, for example. If you're running a local HTTPS server for development, that's probably your client of choice. To trust a CA in Chrome temporarily for that one Chrome process, without affecting other or future Chrome processes, and without trusting anything system-wide, you need to:

* Get the certificate's fingerprint.
    * Easy to do in lots of tools & libraries, from the [openssl CLI](https://security.stackexchange.com/a/188059/99885) to [node-forge](https://github.com/httptoolkit/mockttp/blob/2c10ae1/src/util/tls.ts#L88-L97)
* Start Chrome with `--ignore-certificate-errors-spki-list=$FINGERPRINT`

This is not that hard. That same option also works out of the box for other Chromium-based browsers, from Edge to Brave.

Firefox doesn't have one single option to trust this certificate, but you can create a new Firefox profile, trust it manually there (or automatically using [`certutil`](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/tools/NSS_Tools_certutil)), and then use that profile just when you need it. Setting this up and selecting the profile is automatable, and in fact devcert & mkcert already do most of the setup (but against your global user profile).

For non-browser HTTPS clients, there are good options too. In most cases, certificate trust can be configured just with an environment variable. That means you can set this variable in the script you use to run your tests or start your client, and you're done.

For starters, for anything that uses the OpenSSL defaults you can set the `SSL_CERT_FILE` environment variable to point to the certificate path. This covers many apps and popular tools out of the box, from curl to apt-get, notably including most code running in Ruby, Python, PHP, and other similar languages.

There's a few other special cases, depending on what you're building. Node.js ignores this variable, but provides its own `NODE_EXTRA_CA_CERTS` env var which works similarly. A few other specific libraries need their own configuration too, like Python's popular Requests library (`REQUESTS_CA_BUNDLE`), and Perl's LWP (`PERL_LWP_SSL_CA_FILE`). For Java you need to build a truststore for your app that includes the cert, which means running [one command](https://stackoverflow.com/a/2893932/68051).

While this isn't trivial, it wouldn't be hard to bundle it into a zero-config package that did make this effortless. For any of these languages, it's very possible to temporarily trust a given certificate for effectively all HTTPS traffic, with no global side effects or long-term risk.

As a last step, we could also limit the power of the CA certificates themselves. Support for the [Name Constraints](https://tools.ietf.org/html/rfc5280#section-4.2.1.10) certificate extension [is rapidly growing](https://nameconstraints.bettertls.com/#!view). This lets you create a CA that's only trusted to sign certificates for a whitelisted range of domains, so that trusting a CA doesn't mean giving them a blank cheque for the whole internet.

With improvements like this, in 99% of cases we can directly trust the certificate only when and where we need it, from browsers to backend code to shell scripts to CLI tools. It's simply not necessary to globally trust certificate authorities just to use simple dev tools.

## What should we do?

Ok, so this is happening, it's bad, and it's unnecessary. How do we fix it?

* Tools that set up a local HTTPS server by globally trusting the CA should drop that, and instead add commands to start browsers that trust the cert directly, and encourage users to use that instead by default.
* Automated tests & scripts that talk to local HTTPS servers should not require installing global certs, but should instead trust the certs just by configuring their clients, and only during the test.
* HTTPS debuggers should take control of the clients they care about, and inject settings directly into them, rather than requiring global trust & intercepting all traffic from the entire system.
* Anybody building logic that decides which certificates to trust should include an escape hatch like the above, rather than only trusting the OS store, and should implement name constraints.
* Tools should aim to generate CA certificates with name constraints & short lifetimes by default. For many use cases you could even go further, and generate a fresh CA for every session.
* Developers (and everybody else) should stop trusting & installing CA certificates globally without a really really rock-solid good reason that they fully understand.

Phew. Sound good?

Of course, a big part of why I'm writing this is my work in HTTP Toolkit solving the exact same problem. [HTTP Toolkit](/) is an open-source HTTPS debugger that has tools to intercept traffic from single clients, by injecting proxy settings & trusting certificates only where they're necessary, doing exactly the above. With this, you capture & rewrite only the traffic you're interested in, you don't have any of the global trust problems we've talked about here, and you never need to give anything any extra permissions.

That implementation is all [open source](https://github.com/httptoolkit), so if you're interested or working on something similar then go take a look at how HTTP Toolkit [launches Chrome with interception](https://github.com/httptoolkit/httptoolkit-server/blob/v0.1.29/src/interceptors/fresh-chrome.ts#L45-L100), or all the env vars it uses [to intercept arbitrary CLI commands](https://github.com/httptoolkit/httptoolkit-server/blob/master/src/interceptors/terminal/terminal-env-overrides.ts).

Have any thoughts on this? Get in touch [on Twitter](https://twitter.com/pimterry), [by email](/contact/), or join the discussion on [HN](https://news.ycombinator.com/item?id=22044381) & [reddit](https://www.reddit.com/r/programming/comments/eol0il/global_developer_cas_considered_harmful/).
