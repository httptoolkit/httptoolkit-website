---
title: "Chrome 79+ no longer shows preflight CORS requests"
date: '2020-02-13T16:25'
cover_image: './header-images/datacenter.jpg'
draft: false
twitterUrl: https://twitter.com/HttpToolkit/status/1227974900561981440
hackerNewsUrl: https://news.ycombinator.com/item?id=22319054
redditUrl: https://www.reddit.com/r/javascript/comments/f3clz5/chrome_79_no_longer_shows_preflight_cors_requests/
devToUrl: https://dev.to/pimterry/chrome-79-no-longer-shows-preflight-cors-requests-4k7e
---

Chrome 79 brings some important changes in its CORS implementation, rolling out now, which mean that CORS preflight OPTIONS requests will no longer appear in the network tab of the Chrome developer tools.

## CORS?

Cross-Origin Resource Sharing ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) allows web servers to tell browsers which web applications are allowed to talk to them.

This applies when a web application tries to send a request to a server with a different origin, for example a page hosted at https://example.com tries to make a request to https://api.mybank.com. For simple requests that are defined to not cause side effects, the browser will make the request, but examine the `Access-Control-*` headers on the response from the server before allowing the web application to read that data.

For more dangerous requests, which could trigger an action on the server, the browser sends a so-called "preflight" request. Before sending the real request, it sends an OPTIONS request to the server that includes `Access-Control-Request-*` headers describing the method and any restricted headers that the application would like to send. The server then responds with a response including its own `Access-Control-*` headers, which tell the browser whether or not this is allowed.

If it's allowed, the browser goes on to send the real request, if not then the application isn't allowed to make that request, so it fails.

Phew, make sense? This is just an outline of CORS, there's quite a bit more detail available in [MDN's docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). It trips up quite a few people, and checking that you've done it securely on the server side (i.e. you're not allowing other malicious web applications to do or read things they shouldn't) is harder still.

## Changes in Chrome 79

In Chrome 79, a new flag was added:

![The "Out of blink CORS" chrome flag, which moves CORS handling out of blink](./chrome-79-cors.png)

If you're running 79+, you can see this on the `chrome://flags` page. It appears that this was disabled by default at the release in December 2019, but it's [intended](https://dev.chromium.org/Home/loading/oor-cors) to be enabled incrementally over the weeks from January 6th 2020, which brings us to approximately today, where [people](https://twitter.com/__jakub_g/status/1227889797584302080) are seeing this for themselves.

When this flag is enabled, the CORS handling logic is moved entirely out of the core Blink browser engine. In general this is a good thing - CORS is a core security feature, browser engines are very exposed to untrusted remote inputs, and trying to isolate the two from one another is a great move for security.

In practice, the main visible change from this is that **CORS preflight requests will no longer appear in the Chrome developer tools network tab**. That means debugging CORS - already tricky - just got quite a bit harder, because these requests are going to be completely invisible to you.

They'll also no longer be considered as a separate entry by [the resource timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API).

There's a bit more background on this from [Mike West](https://twitter.com/mikewest/) on the Chrome security team:

> We moved CORS checks out of our renderer process to (among other things) ensure that we’re not exposing cross-origin data to Spectre, et al. In the short-term, this is a pain in the ass for developers, and I’m sorry for that. I do hope it’s temporary.
> \- https://twitter.com/mikewest/status/1227918108242989056

Judging from the [bug discussion](https://bugs.chromium.org/p/chromium/issues/detail?id=941297) there's a bit of an outline on how this might be resolved in future whilst keeping CORS outside Blink itself, but not a lot of progress or detail yet, so I wouldn't bet on this changing any time soon.

## What can I do about this?

Cheeky plug: you could debug Chrome's HTTP traffic with **[HTTP Toolkit](https://httptoolkit.com/)** instead. HTTP Toolkit lets you collect _all_ traffic the browser sends, even for CORS requests (or any other requests) that happen outside the core renderer process.

One-click setup to start intercepting Chrome, and then you can see literally everything, with a far nicer UI than the network tab to boot:

![The HTTP Toolkit UI](./httptoolkit-cors-screenshot.png)

There are other options too though:

* You can manually disable this flag in your browser on the `chrome://flags` page, but do be aware that this non-Blink CORS implementation does have some different behaviour compared to the Blink one (see the [design doc](https://dev.chromium.org/Home/loading/oor-cors)). If you want to see the same thing as your users, you probably don't want to leave this enabled all the time.
* You can take [a NetLog dump](https://www.chromium.org/for-testers/providing-network-details) from Chrome, to log the full requests and examine them elsewhere.
* You can test with another browser, like Firefox.
* You can use hosted HTTP request recording & reporting tools, like [WebPageTest](https://www.webpagetest.org/).
* You can use any other standalone HTTP debugging tools, like Fiddler or Charles, which should also still be able to collect this traffic.

When you do start seeing CORS requests failing for no good reason though, none of these are quite as convenient as being able to check the preflight inline...

**Want to see & explore _all_ your HTTP traffic? Get started with [HTTP Toolkit](https://httptoolkit.com) now**.