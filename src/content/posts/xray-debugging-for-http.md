---
title: 'X-Ray Debugging for HTTP'
date: '2019-04-24T12:00'
cover_image: 'header-images/xray.jpg'
draft: false
productHuntUrl: 'https://producthunt.com/posts/http-view'
tags: http, interception, announcements
---

HTTP Toolkit is a suite of open-source & cross-platform tools for developing, debugging & testing anything using HTTP. It lets you intercept HTTP(S) with one click, and explore, examine & understand all your traffic, to spot bugs, fix bugs, and build better software.

The free release of the first version (HTTP View) has been available for a little while, and today I've got some new killer features launching as part of [HTTP Toolkit Pro](/), to let you look deep inside your HTTP traffic, with all the context you need to understand everything your application is doing.

## API integrations for 1400+ APIs

Understanding your traffic takes more than just the raw data. Using [OpenAPI](https://swagger.io/docs/specification/about/) and the [OpenAPI directory](https://github.com/APIs-guru/openapi-directory), HTTP Toolkit can work out exactly which API every single request is talking to, for APIs from AWS to Stripe to Github, and a whole lot more.

With that, there's a lot of cool things we can do. For example:

![API metadata for a request to the YouTube API](../images/understand-screenshot.png)

Here we've taken a request to the YouTube API, and immediately worked out what operation it's doing, interpreted the parameters to provide inline documentation, pointed out that one parameter has an invalid value, and spotted another required parameter that's missing.

Debugging tools with real context - tools that really understand what you're _trying_ to do - let you take your development skills to a whole new level.

## Performance analysis, tips & warnings

Performance is hard. There's a huge number of ways to tweak & tune the speed of your application with HTTP, a lot of confusing specs (what's the difference between a `no-store` and `no-cache` cache-control header?), and not a lot of advice.

For most applications though, the two most important things to focus on are compression, and caching. Streaming large responses hugely slows down client applications, and caching lets them avoid request round trips entirely.

![Performance analysis for an HTTP request](../images/accelerate-screenshot.png)

You can now get automated performance analysis for all HTTP responses, including the response time itself, but also the details of the request & response body compression (and a comparison to other content encodings you could've used), and a breakdown of the response cacheability itself.

The caching details come with a summary & detailed explanation of whether & why the request is cacheable, and also which future requests it'll match, who can cache it (just browsers, or CDNs and proxies too?), and when it'll expire.

Caching is hard, and HTTP Toolkit has your back to help you really understand what your response headers mean. In addition, if you've made mistakes like missing directives that would make your caching more consistent & reliable, or disagreeing configuration for the same property (like `Expires` & `max-age`), you'll get tips and warnings to help you fix them easily.

## Lots more

On top of all that, we've now got light, dark & high-contrast themes, inline documentation for every HTTP header & status code, one-click man-in-the-middle setup for terminals (on all platforms) in addition to browsers, and everything else you might need to quickly & easily understand your HTTP traffic.

## A sustainable future

HTTP Toolkit is fundamentally an open-source project. It's been hugely driven by the hard work and many contributions to [Mockttp](https://github.com/httptoolkit/mockttp), and user feedback from the community over the past couple of months has been essential.

Releasing this paid version doesn't change that, and the entire Pro code is open-source too: [github.com/httptoolkit](https://github.com/httptoolkit). The aim is to make the project sustainable though, by encouraging professional developers & power users to help support ongoing development, to drive the project forward into the future.

If you like the sound of this, help fund it! **[Get HTTP Toolkit now](/get-pro/)**, and supercharge your software debugging. If you're on the fence, you can also get started by with the existing [free release](/).

**We're also launching on Product Hunt today! Take a look at the reviews and leave your feedback at [producthunt.com/posts/http-view](https://producthunt.com/posts/http-view).**