---
title: "Apple already shipped attestation on the web, and we barely noticed"
date: '2023-07-25T14:00'
cover_image: 'header-images/signing.jpg'
tags: apple, browsers
isFeatured: true
---

There's been a lot of concern recently about the [Web Environment Integrity](https://github.com/RupertBenWiser/Web-Environment-Integrity) proposal, developed by a selection of authors from Google, and apparently being prototyped in Chromium.

There's good reason for anger here (though I'm not sure yelling at people on GitHub is necessarily the best outlet). This proposal amounts to attestation on the web, limiting access to features or entire sites based on whether the client is approved by a trusted issuer. In practice, that will mean Apple, Microsoft & Google.

Of course, Google isn't the first to think of this, but in fact they're not even the first to ship it. Apple already developed & deployed an extremely similar system last year, now integrated into MacOS 13, iOS 16 & Safari, called "[Private Access Tokens](https://developer.apple.com/news/?id=huqjyh7k)":

> Private Access Tokens are powerful tools that prove when HTTP requests are coming from legitimate devices without disclosing someone's identity.

The focus here is primarily on removing captchas, and as such it's been integrated into Cloudflare (discussed [here](https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/)) and Fastly ([here](https://www.fastly.com/blog/private-access-tokens-stepping-into-the-privacy-respecting-captcha-less)) as a mechanism for recognizing 'real' clients without needing other captcha mechanisms.

Fundamentally though, it's exactly the same concept: a way that web servers can demand your device prove it is a sufficiently 'legitimate' device before browsing the web.

## How do Private Access Tokens work?

The mechanism is a fairly simple exchange over HTTP, handled by built-in browser APIs, which in turn integrate with operating system components to confirm that the browser & OS are 'legitimate' (the exact definition of that is left to the attester - i.e. Apple).

The flow looks like this:

1. A browser makes an HTTP request from a web server.

2. The web server refuses the request, and returns an HTTP 401 response with a `PrivateToken` challenge:

    ```
    HTTP/1.1 401 Unauthorized
    WWW-Authenticate:
        PrivateToken challenge=<base64 challenge data>,
            token-key=<base64 public-key>
    ```

    _(Newlines added for readability)_

3. The browser recognizes this, and sends parts of the challenge, in addition to verified details of your device provided by the OS, to an attester (e.g. Apple).

4. The attester verifies your device is real & unmodified (depends on the device, but both Android & iOS have existing ways to check this) and works with a token issuer (somebody trusted by the origin & that trusts the attester, e.g. Cloudflare/Fastly) to return a signed token, proving that your device has been verified as legitimate.

5. The browser resends the request, with the signed token in their `Authorization` header:

    ```{3}
    GET /protected-content HTTP/1.1
    Host: example.com
    Authorization: PrivateToken token=<signed token>
    ```

6. The server now knows that the client has been verified by a trusted provider (but nothing more) and can treat the client differently on that basis.

This all happens on Apple devices today when using Safari, any time a service using this (such as Fastly & Cloudflare) is concerned about the legitimacy of your requests.

The privacy protections in here appear fairly strong (I'm not an expert on this, but that's a very clear goal of the proposal and the separation of the origin/issuer/attester flow) but the core issue from Web Environment Integrity remains: your treatment on the web depends on whether Apple says your device, OS & browser configuration are legitimate & acceptable.

## How bad is this?

This feature is largely bad for the web and the industry generally, like all attestation (see below).

That said, it's not as dangerous as the Google proposal, simply because Safari isn't the dominant browser. Right now, Safari has around 20% market share in browsers (25% on mobile, and 15% on desktop), while Chrome is comfortably above 60% everywhere, with Chromium more generally (Brave, Edge, Opera, Samsung Internet, etc) about 10% above that.

With Safari providing this, it can be used by some providers, but nobody can block or behave differently with unattested clients. Similarly, Safari can't usefully use this to tighten the screws on users - while they could refuse to attest old OS versions or browsers, it wouldn't make a significant impact on users (they might see statistically more CAPTCHAs, but little else).

Chrome's usage is a larger concern. With 70+% of web clients using Chromium, this would become a major part of the web very quickly. With both Web Environment Integrity & Private Access Tokens, 90% of web clients would potentially be attested, and the "oh, you're not attested, let's treat you suspiciously" pressure could ramp up quickly.

## Why is attestation bad generally?

This has been [covered](https://arstechnica.com/gadgets/2023/07/googles-web-integrity-api-sounds-like-drm-for-the-web/) [extensively](https://gabrielsieben.tech/2022/07/29/remote-assertion-is-coming-back-how-much-freedom-will-it-take/) elsewhere, so I won't dig into it too deeply, but as a quick summary:

* Attestation means you can only use approved clients, which is terrible for competition and innovation (sorry, it's now impossible to make a new browser or OS!) particularly for open-source, community & smaller indie efforts that are consistently excluded from these mechanisms. If attestation was around in the days of IE6, it would've been a major roadblock in the rise of Firefox & Chrome.

* Attestation blocks users' control of their own devices, by design. A key goal is that users using modified software should not be attested as legitimate. I would like to be able to browse the web on my rooted Android phone please. There's no way any fully user-modifiable OS or hardware can ever be attested in the way these proposals intend.

* Attestation opens dangerous doors that allow the approved providers to freely tighten the rules later. "Sorry, we only attest devices during their 2 year official support window", and "Sorry, we don't attest browsers with ad-block extensions installed" are both perfectly plausible and thoroughly problematic next steps.

Proponents would argue that none of this applies to the Web Environment Integrity proposal, as it suggests 'holdbacks', i.e. refusing attestation a small percentage of times to make blocking based on attestation impossible. I suspect business pressures will make that unworkable in practice (there's already [strong industry pushback](https://github.com/RupertBenWiser/Web-Environment-Integrity/issues/5) from a closely involved F5 / Shape Security representative) and it's notable that Google's existing Android Play Integrity attestation does _not_ do this.

Free usage of different clients & servers on the web is what has built the open web, and is a large part of why it's so successful. Attestation breaks this by design.

All of this has already played out on Android, where you technically _can_ create and run your OS, and Android distributions like [LineageOS](https://lineageos.org/) are perfectly functional, but attestation features mean that this implies the constant risk of key apps (like your bank!) blocking you as suspicious.

Fundamentally, attestation is anti-competitive. Blocking competition between different Android versions is already problematic. Blocking competition for both browsers & OSs on the web would be catastrophic.

## Shit

Quite.

If you're concerned about all this, you might also be interested in the [other proposals](https://github.com/antifraudcg/proposals/issues) from the Anti-Fraud Community Group, discussing various other potential web 'features' along the same lines.

Fraud & bots on the web are a real problem, and discussion on ways to defend against that is totally reasonable, and often very valuable! It's a hard problem. That said, this has to be carefully balanced against the health of the web itself. Blocking competition, hamstringing open-source and the open web, and removing all user control over their own devices is not a reasonable tradeoff.

Have thoughts or comments? Get in touch [on Twitter](https://twitter.com/pimterry), [on Mastodon](https://toot.cafe/@pimterry) or [directly](https://httptoolkit.com/contact/).

**Want to understand how this all works up close? Try intercepting, exploring & modifying your web traffic with [HTTP Toolkit](https://httptoolkit.com) now**.