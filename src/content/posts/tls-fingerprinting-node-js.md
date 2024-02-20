---
title: 'Fighting TLS fingerprinting with Node.js'
date: '2021-12-07T13:40'
cover_image: './header-images/fingerprint.jpg'
tags: tls, node.js, javascript, interception
---

The modern internet is full of services that want to know who you are. Fingerprinting is the latest way to do this: capturing many small details about your client, and using it to create an id that's sufficiently unique to recognize you and infer details about your network client and device.

This is a privacy problem, which I'm not going to focus on here, but collecting and analysing interaction metadata is also a powerful tool to recognize certain _types_ of clients, even when they attempt to disguise themselves.

TLS provides a particularly good surface for this kind of fingerprinting, which allows a server or proxy to recognize the kind of software (a specific browser version, Python, Ruby, Node.js, etc) that's opening any TLS connection, before the client has even sent any data (such as an HTTP request) within the connection, and purely using unencrypted public data from the connection.

In many cases, this is a problem. **[HTTP Toolkit](https://httptoolkit.com)** acts as a MitM proxy for HTTP(S) traffic inspection & mocking, and this potentially allows servers to recognize and block it, along with any other similar debugging proxies. Many other automated scripts and tools can also be recognized, blocking web scraping and other requests from anything but a real browser.

Until recently, I thought this was fairly theoretical, but last week an HTTP Toolkit user showed me a real-world example, where non-browser traffic is blocked completely, based just on its TLS fingerprint, causing big problems for HTTP Toolkit usage.

Fortunately, we can work around this. In this article, I want to explain how TLS fingerprinting works, look at a real-world example, and then see exactly how you can defeat this blocking using Node.js (with techniques that you can easily apply elsewhere too).

## How does TLS fingerprinting work?

TLS provides a huge amount of data for fingerprinting. Every connection secured by TLS (for example, all HTTPS requests) starts with a 'client hello' message from the client, sent unencrypted, with the essential details that the client proposes for the connection. This client hello includes many parameters that can be specified in multiple equivalent ways, and which are independent of the specific server you're talking to.

If you want to see this data up close, this byte-by-byte walkthrough of a TLS connection is a great demo: [tls13.xargs.org](https://tls13.xargs.org/)

Some of the specific fingerprintable parameters in a client hello include:

* A list of ciphers, in the client's order of preference ([ciphersuite.info](https://ciphersuite.info/cs/?security=secure) lists 60 options that are currently considered 'secure', a typical client might send 20 options)
* A list of TLS extensions, in an arbitrary order (a typical client hello includes about 15)
* A list of elliptic curves ordered by client preference (typically 4 options)
* A list of elliptic curve formats ordered by preference (with 3 possible options defined)

(As I understand it - I am not a cryptographer - elliptic curves are a way to use keys backed by more difficult maths problems than RSA, thereby increasing security without increasing the size of the encryption keys, which are already pretty big. The details don't matter here anyway though; it's just a parameter you need for modern TLS setup)

If you take the ids of each of these parameters in order, and hash the resulting string, then you get a simple but unique id for a client hello, which is likely to be the same for every server that that client connects to. The specific algorithm generally used is called JA3, defined more precisely [here](https://github.com/salesforce/ja3#how-it-works).

How unique is that id? With a quick bit of maths we can check the combinations of these. Assuming a typical 20 ciphers, 15 extensions, 4 curves and 3 curve formats, we get:

```
CipherPermutations = 20!
ExtensionPermutations = 15!
CurvePermutations = 4!
CurveFormatPermutations = 3!
TotalPermutations = 20! + 15! + 4! + 3! = 2432903315851008030
```

That's 2 quintillion ways of sending a typical client hello.

The orders of the ciphers and curve parameters do have an effect, so all those hellos are not all completely equivalent, and so this is an upper bound on the possible hellos you could ever see. In reality, it's unlikely that you'll see many hellos that prefer slow & insecure ciphers over quick & more secure ones. That said, extension order is totally arbitrary. Using that ordering alone (15 factorial permutations) gives you 15 trillion different possibilities, and there is definitely some real variance in the order of the ciphers & curve parameters in addition to that.

So yes, this is pretty unique.

Taking some quick examples, it's possible to recognize & differentiate TLS client hellos from:

* Firefox 94: 2312b27cb2c9ea5cabb52845cafff423
* Firefox 87: bc6c386f480ee97b9d9e52d472b772d8
* Chrome 97: b32309a26951912be7dba376398abc3b
* Chrome 70: 5353c0796e25725adfdb93f35f5a18f7
* Tor: e7d705a3286e19ea42f587b344ee6865
* Trickbot C2 malware: 8916410db85077a5460817142dcbc8de
* Dridex malware: 51c64c77e60f3980eea90869b68c58a8
* cURL 7.68: eaa1a9e1db47ffcca16305566a6efba4
* Python urllib 3.8: 443dc2089573571e9e8a30d49e52572a
* Node.js v10: 5d1b45c217fe17488ef0a688cf2cc497
* Node.js v12/14/16: c4aac137ff0b0ac82f3c138cf174b427
* Node.js v17: 4c319ebb1fb1ef7937f04ac445bbdf86

So it's not perfect, but we can differentiate a lot interesting clients here. You can check your own JA3 TLS fingerprint via [ja3.zone](https://ja3.zone/), and you can search previously seen fingerprints to see the associated user agents there too.

Again, this fingerprinting is based on _un_-encrypted content, which is sent the initial client hello. This fingerprint is visible to everybody on the connection path, not just the target server (so everybody on your local wifi, your ISP, your college, your office IT team, you name it) and it's available before your client has completed TLS setup and sent any application data (e.g. any HTTP requests).

## What about GREASE?

[GREASE](https://datatracker.ietf.org/doc/rfc8701/) (Generate Random Extensions And Sustain Extensibility) is a neat new technique designed to stop [protocol ossification](https://en.wikipedia.org/wiki/Protocol_ossification) (more poetically, GREASE will stop TLS from 'rusting shut'), which is also relevant here.

In the past, TLS has had problems evolving, because many middleboxes (proxies and other network infrastructure) which passed through TLS traffic examined it in some ways, using hardcoded values, and/or without any planning to handle possible future extensions of TLS at all. Because of this, some changes in the TLS protocol like using a new version number or adding new extension types became completely impossible - if you try to send a TLS request with version 1.3 in the client hello, many networks would reject it outright, and because of this TLS 1.3 still continues to use TLS 1.0's version number, and makes only backward-compatible additions.

This is clearly bad, and GREASE is designed to stop it getting worse in future. The idea is to preemptively generate and include invalid random values in client hellos, such as non-existent ciphers and extensions, which don't have any effect, but ensure that all new networking code has to be able to handle unexpected values. This is in active use in Chrome for TLS and others, and the same technique is being used in new protocols, for example Cloudflare [uses it for all HTTP/3 connections](https://twitter.com/SimmerVigor/status/1261952795336458240)

In theory, although this isn't the main intention, this would break TLS fingerprinting too - since clients include random values, you can't get a reliable hash. In practice though, it doesn't help, as you can still generate consistent TLS fingerprints by simply excluding any unrecognized values before computing the hash.

You could extend GREASE to randomize the order of extensions, which would help a lot, but this isn't the main goal of GREASE, and it seems unlikely that popular clients like Chrome are going to start doing that any time soon.

## TLS fingerprinting in the wild

While I've been aware and interested in this for a while, I didn't think it was a major concern for HTTP Toolkit.

It is practical for real-world use, but the [original research](https://blog.squarelemon.com/tls-fingerprinting/) into this in 2015 was focused on malware detection in the presence of encrypted malware traffic. It's also used by [Cloudflare](https://blog.cloudflare.com/monsters-in-the-middleboxes/) for TLS interception research and metrics, and by Salesforce and others (unclear how, but Tor & malware detection is [discussed](https://engineering.salesforce.com/tls-fingerprinting-with-ja3-and-ja3s-247362855967)). None of that should matter for intercepting your own HTTPS on your own network.

In reality though, it turns out it is used more widely: Akamai use TLS fingerprinting to block bot traffic at the CDN level for some of their customers. I don't know for sure, but I suspect this is part of their optional [bot management](https://www.akamai.com/products/bot-manager) features.

An easy example is available on [the Zalando website](https://en.zalando.de/) (a major online retailer based in Germany).

This page makes various requests to the Zalando API, to endpoints like `https://en.zalando.de/api/navigation`, which you can see from your browser console. These work happily in the browser, returning a 200 response with some JSON data.

Unfortunately, if you make the same request from Node.js (in Node v12 - v16), it fails:

```javascript
request = require('https').get('https://en.zalando.de/api/navigation');
request.on('response', (res) => {
    console.log(res.statusCode); // Prints 403

    res.pipe(process.stdout);
    /*
    Prints:
    {
        "edge_error": "halt",
        "ref_id": "15.72843445.1638543455.958cf4d0",
        "wait": 60,
        "feedback": {
            "email": true,
            "url": "",
            "recaptcha": {
                "enabled": false,
                "type": 0,
                "sitekey": ""
            }
        }
    }

    */
})
```

We get an immediate 403 forbidden response, and a `edge_error: halt` message from the CDN.

(I've omitted copying the full headers from the browser here for brevity, but you can trust me that the same thing happens even when all the exact same browser headers are included too)

This applies in all currently supported LTS versions (Node.js v12 to v16) but not in Node.js v10 or v17 (which have different fingerprints) even though they're all sending the exact same content.

Zalando's API, backed by `akamaiedge.net`, is actively detecting & rejecting requests from Node.js clients, regardless of the content, based on the TLS fingerprint.

What can we do about this?

## Defeating TLS fingerprinting

In a perfect world, you'd beat this by exactly matching somebody else's TLS fingerprint. If you make connections with the exact same TLS fingerprint as the latest version of Chrome, nobody can tell the difference. In theory, you can match any client you like.

In practice, this is not always possible. Many TLS implementations (including Node's) don't allow you to configure low-level details that aren't semantically meaningful, such as the order the TLS extensions are set in the client hello. This isn't unreasonable - outside of TLS fingerprinting there is never any reason to do so whatsoever - but it does create some limitations.

Fortunately, you still have options. There's one major advantage to clients when trying to defeat TLS fingerprint blocks: nobody can implement them with a fixed list of allowed fingerprints. They have to use a blocklist instead, because new fingerprints appear frequently. Fingerprints often change when new browser versions come out, with new versions of other client runtimes and TLS libraries, and simply because a client has set any individual TLS parameter for themselves.

That means you can quite reliably defeat TLS fingerprint blocking by simply coming up with a configuration that generates a new fingerprint the server doesn't yet block.

In Node.js, while we can't do this by changing the extension order, there are APIs available to set the specific cipher order, which is enough to change the fingerprint. You can do this using the `ciphers` option to any API that takes TLS options (including `https.get()` and similar). You do have to be careful though - if you change the ciphers incorrectly, you can enable outdated or broken ciphers and seriously weaken the security of your outgoing requests.

The default set of ciphers in Node.js 14 are:

```javascript
> require('crypto').constants.defaultCoreCipherList.split(':')
[
  'TLS_AES_256_GCM_SHA384',
  'TLS_CHACHA20_POLY1305_SHA256',
  'TLS_AES_128_GCM_SHA256',
  'ECDHE-RSA-AES128-GCM-SHA256',
  'ECDHE-ECDSA-AES128-GCM-SHA256',
  'ECDHE-RSA-AES256-GCM-SHA384',
  'ECDHE-ECDSA-AES256-GCM-SHA384',
  'DHE-RSA-AES128-GCM-SHA256',
  'ECDHE-RSA-AES128-SHA256',
  'DHE-RSA-AES128-SHA256',
  'ECDHE-RSA-AES256-SHA384',
  'DHE-RSA-AES256-SHA384',
  'ECDHE-RSA-AES256-SHA256',
  'DHE-RSA-AES256-SHA256',
  'HIGH',
  '!aNULL',
  '!eNULL',
  '!EXPORT',
  '!DES',
  '!RC4',
  '!MD5',
  '!PSK',
  '!SRP',
  '!CAMELLIA'
]
```

(No idea what any of these mean? You can look them up easily at [ciphersuite.info](https://ciphersuite.info/))

If you pass these (as a colon-separated string) as the `cipher` option on a request, changing the order of these in any way, then you'll get a new TLS fingerprint, and fingerprint blocks will happily let you through. But how should you change them?

Those first 3 `TLS_` prefixed ciphers are all modern and strongly recommended TLS v1.3 ciphers with no known current issues, and all modern clients will include those 3 first as their first three options, in some order. While Node.js picks the order above, any order of those is a pretty safe & reasonable bet. In a quick test on my machine, it seems like:

* cURL 7.68 uses the same order as Node.js
* Firefox uses `TLS_AES_128_GCM_SHA256` (#3) then `TLS_CHACHA20_POLY1305_SHA256` (#2) then `TLS_AES_256_GCM_SHA384` (#1)
* Chrome uses `TLS_AES_128_GCM_SHA256` (#3) then `TLS_AES_256_GCM_SHA384` (#1) then `TLS_CHACHA20_POLY1305_SHA256` (#2)

The specific order has various performance & security trade-offs, and if you're writing extremely security or performance sensitive software you should absolutely investigate that in more detail, but in most software any ordering of these 3 is totally fine, secure, and performant. That means we can shuffle them up!

In practice, that means you can beat TLS fingerprinting in Node.js with an implementation like:

```javascript
const tls = require('tls');
const https = require('https');

const defaultCiphers = tls.DEFAULT_CIPHERS.split(':');
const shuffledCiphers = [
    defaultCiphers[0],
    // Swap the 2nd & 3rd ciphers:
    defaultCiphers[2],
    defaultCiphers[1],
    ...defaultCiphers.slice(3)
].join(':');

request = require('https').get('https://en.zalando.de/api/navigation', {
    ciphers: shuffledCiphers
}).on('response', (res) => {
    console.log(res.statusCode); // Prints 200
});
```

Bingo.

You can of course go further: reordering the later ciphers (with research to ensure the resulting combination is secure for your use case).

You can even put any number of duplicate ciphers in the list, which will still affect the fingerprint. As far as I can tell from reading the TLS RFCs this is entirely valid! It's technically possible that you could find servers which reject this, but I think it's very unlikely, and by injecting randomly ordered duplicates you can generate an arbitrary number of entirely random fingerprints at will.

These techniques should be enough to get you past any TLS fingerprint block you run into, and I'm working on integrating them into the next HTTP Toolkit release as we speak.

It is unfortunate that perfectly matching a TLS fingerprint or generating a huge set of equivalent random values (by randomizing the extensions order) isn't possible in Node.js. This is possible in other low-level languages such as Go, where libraries like [uTLS](https://github.com/refraction-networking/utls) allow for direct manipulation of the client hello for these purposes, and if you're using other languages it's worth investigating that in more detail. In theory you could alternatively write a native extension for Node.js to do the same, but it's not a quick job, and I suspect the above will be enough to stay ahead of any TLS fingerprint blocks anyway for at least the foreseeable future.

**Spend lots of time sending & debugging HTTPS? [Try out HTTP Toolkit](https://httptoolkit.com/). One-click HTTP(S) interception, inspection & mocking for browsers, Android apps, Docker containers, Node.js/Python/Ruby/Java applications & more.**
