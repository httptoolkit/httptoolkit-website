---
title: HTTPWTF
date: '2021-03-04T15:00'
cover_image: './header-images/why.jpg'
---

HTTP is fundamental to modern development, from frontend to backend to mobile. But like any widespread mature standard, it's got some funky skeletons in the closet.

Some of these skeletons are little-known but genuinely useful features, some of them are legacy oddities relied on by billions of connections daily, and some of them really shouldn't exist at all. Let's look behind the curtain:

## No-cache means "do cache"

Caching has never been easy, but HTTP cache headers can be particularly confusing. The worst examples of this are `no-cache` and `private`. What does the below response header do?

```
Cache-Control: private, no-cache
```

It looks like this means "don't store this response anywhere", right?

_Hahaha_ no.

In reality, this means "please store this response in all browser caches, but revalidate it when using it". In fact, this makes responses _more_ cacheable, because this applies even to responses that wouldn't normally be cacheable by default.

Specifically, `no-cache` means that your content is explicitly cacheable, but whenever a browser or CDN wants to use it, they should send a request using `If-Match` or `If-Modified-Since` to ask the server whether the cache is still up to date first. Meanwhile `private` means that this content is cacheable, but only in end-client browsers, not CDNs or proxies.

If you were trying to disable caching because the response contains security or privacy sensitive data that shouldn't be stored elsewhere, you're now in big trouble. In reality, you probably wanted `no-store`.

If you send a response including a `Cache-Control: no-store` header, nobody will ever cache the response, and it'll come fresh from the server every time. The only edge case is if you send that when a client already has a cached response, which this won't remove. If you want to do that and clear existing caches too, add `max-age=0`.

Twitter notably [hit this issue](https://hacks.mozilla.org/2020/04/twitter-direct-message-caching-and-firefox/). They used `Pragma: no-cache` (a legacy version of the same header) when they should have used `Cache-Control: no-store`, and accidentally persisted every user's private direct messages in their browser caches. That's not a big problem on your own computer, but if you share a computer or you use Twitter on a public computer somewhere, you've now left all your private messages conveniently unencrypted & readable on the hard drive. Oops.

## HTTP Trailers

You're probably aware of HTTP headers. An HTTP message starts with a first line that contains the method & URL (for requests) or status code & message (for responses) and then it has a series of key/value pairs for metadata, called headers, and then it has a body.

Did you know you can also send trailers, to append metadata _after_ a message body?

These are not widely used, but they're fully standardized and in theory everything should support them, or at least ignore them. They can be useful if you have metadata that isn't easily available initially, and you don't want need to wait for it before you send the body.

They are used in some API protocols like gRPC, and they're primarily valuable for metadata about the overall response itself, for example you can use trailers to [include Server-Timing metadata](https://www.fastly.com/blog/supercharging-server-timing-http-trailers) to give the client performance metrics about server processing during a request, appended after the response is fully completed. They're especially useful for long responses, e.g. to include final status metadata after a long-running HTTP stream.

It's still rare that you'll need this, but it's pretty cool that it works when you do. There's a few requirements:

* For server response trailers, the client must advertise support for this, with a `TE: trailers` header on the initial request.
* The initial headers should specify the trailer fields that will be used later, with `Trailer: <field names>`.
* Some headers are never allowed as trailers, including `Content-Length`, `Cache-Control`, `Authorization`, `Host` and similar standard headers, which are often required initially to parse, authenticate or route requests.

To send trailers in HTTP/1.1, you'll also need to use chunked encoding. HTTP/2 meanwhile uses separate frames for the body & headers, so this isn't necessary.

A full HTTP/1.1 response with trailers might look like this:

```
HTTP/1.1 200 OK
Transfer-Encoding: chunked
Trailer: My-Trailer-Field

[...chunked response body...]

My-Trailer-Field: some-extra-metadata
```

## HTTP 1XX codes

Did you know that an HTTP request can receive multiple response status codes? A server can send an unlimited number of 1XX codes before a final status (200, 404, or whatever it may be). These act as interim responses, and can all include their own independent headers.

There's a few different 1XX codes available: 100, 101, 102, and 103. They're not widely used, but in some niche use cases they have some cool powers:

### HTTP 100

HTTP 100 is a response from a server that the request is ok _so far_, and the client should keep going.

Most of the time, this is a no-op. If you've started sending a request, you were probably going to keep going anyway, although it's always nice to have the server's support & encouragement.

This becomes useful though if you send a request including a `Expect: 100-continue` header. That header tells the server you expect a 100 response, and you're not going to send the full request body until you receive it.

Sending `Expect: 100-continue` allows the server to decide if it wants to receive the whole body, which might take a lot of time/bandwidth. If the URL & headers are enough for it to already send a response (e.g. to reject a file upload) this is a quick and efficient way to do that. If the server does want to receive the full body, it sends an interim 100 response, the client continues, and then the server handles the complete request as normal when it's done.

### HTTP 101

HTTP 101 is used to switch protocols. It says "I've sent you a URL and headers, and now I want to do something _completely different_ with this connection". Not just a different request, but different protocol entirely.

The main use case is to set up a websocket. To do so, the client sends a request including these two headers:

```
Connection: upgrade
Upgrade: websocket
```

Then, if the server accepts, it sends a response like:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
```

And then from there they stop speaking HTTP, and start exchanging raw websocket data on this connection instead.

This status is also used to upgrade from HTTP/1.1 to HTTP/2 on the same connection, and you could use it to transform HTTP connections into all sorts of other TCP-based protocols too.

That said, this status _isn't_ supported in HTTP/2, which uses a different mechanism for protocol negotiation and a [totally different mechanism](https://tools.ietf.org/html/rfc8441) to set up websockets (which basically isn't supported anywhere - websockets are always HTTP/1.1 right now).

### HTTP 102

HTTP 102 tells the client that the server is still processing the request, and it'll respond _soon_. This differs from 100 in that the whole request has now been received, and all the action is now happening on the server side, with the client just waiting.

This isn't much used as far as I can tell, and it seems to mainly exist as a keep-alive, to make sure the client doesn't think the server has simply died. It's in the original HTTP specifications, but it's been removed from many new editions.

Still, it is supported & used in real places in the wild, so it's quite possible to use it in your applications if it fits your needs.

### HTTP 103

HTTP 103 meanwhile is a new & trendy status intended to partially replace HTTP/2's server push functionality (which is now [being removed from Chrome](https://groups.google.com/a/chromium.org/g/blink-dev/c/K3rYLvmQUBY/m/vOWBKZGoAQAJ?pli=1)).

Using HTTP 103, a server can send some headers early, before fully handling the request and sending the rest of the response. This is primarily designed for delivering link headers, like `Link: </style.css>; rel=preload; as=style`, telling the client about other content that it may want to start loading early (like stylesheets, JS & images, for web page requests) in parallel with the full response.

When the server receives a request that takes a little processing, it often can't fully send the response headers until that processing completes. HTTP 103 allows the server to immediately nudge the client to download other content in parallel, without waiting for the requested resource data to be ready.

## Referer

The HTTP Referer header tells the server which page you came from previously, or which URL triggered a resource load. This has some privacy challenges, but it's stuck around, and it's sent in most requests made as you browse the internet.

Notably, it's spelled wrong. This was added in the very early days of the web, and the unix spell checker at the time didn't recognize either referer or referrer (the correct spelling). By the time anybody noticed, it was in serious use in infrastructure and tools all over the place, so nothing could be changed and we have to live with every browser request having a misspelled header forever.

Not especially important unless you're writing code to read this header yourself, but a great parable for the challenges of network compatibility.

For maximum confusion and damage potential, new privacy/security headers related to this like `Referrer-Policy` _do_ use the correct spelling.

## Websocket's 'random' UUID

<figure>
    <img alt="XKCD's getRandom() comic" src="https://imgs.xkcd.com/comics/random_number.png" />
    <figcaption>There's always <a href="https://xkcd.com/221/">a relevant XKCD</a></figcaption>
</figure>

We talked about how HTTP 101 requests are used to set up websockets earlier. A full request to do so might look like this:

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

with a response that starts the websocket connection like this:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

The `Sec-WebSocket-Accept` key here is interesting. This is designed to stop caching proxies accidentally reusing websocket responses that they don't understand, by requiring the response to include a header that matches the client header. Specifically:

* The server receives a base64 websocket key from the client
* The server appends the UUID `258EAFA5-E914-47DA-95CA-C5AB0DC85B11` to the base64 string
* The server hashes the resulting string, encodes the hash in base64, and sends that back

This is deeply weird. A single fixed random UUID that's used in the setup of every single websocket forever? Appending strings to base64 strings without decoding, and then base64-ing the result again too?

The idea is that this logic isn't something that could happen by accident, or something that could ever be used elsewhere, to guarantee that both parties are intentionally starting a websocket connection. This confirms that the server or proxy isn't used cached data without understanding it, and the client hasn't been tricked into opening a websocket connection that it doesn't understand.

This totally works, it's widely used and quick & easy to implement, which is all great, but it's wild that every websocket connection in the world relies on one magic UUID.

## Websockets & CORS

While we're talking about websockets: did you know that websockets effectively ignore all the CORS and single-origin policy restrictions that would normally apply to HTTP requests?

CORS ensures that JavaScript running on a.com can't read data from b.com unless the latter explicitly opts into that in its response headers.

This is important for lots of reasons, notably including network-local servers (a public web page shouldn't be able to talk to your router) and browser state (requests from one domain shouldn't be able to use cookies from another).

Unfortunately though, websockets ignore CORS entirely, assuming instead that all websocket servers are modern & sensible enough to correctly check the `Origin` header for themselves. Many servers do not, and most developers I've mentioned this to weren't aware of it.

This opens a whole world of fun vulnerabilities, nicely summarized in [this article](https://christian-schneider.net/CrossSiteWebSocketHijacking.html).

In short: if you have a websocket API, check the `Origin` header and/or use CSRF tokens before trusting any incoming connections.

## X-* headers

Once upon a time (1982) [an RFC](https://tools.ietf.org/html/rfc822#section-4.7.4) suggested that using an `X-` prefix for message headers was a good way to differentiate custom extensions from standardized names.

At the time this was relevant to email metadata, but this was later popularized for usage in HTTP headers too.

This is still a common pattern, and if you look at HTTP requests as you browse the web you'll see quite a few of these:

* `X-Shenanigans: none` - this appears on every response from Twilio's API. I have no idea why, but it is comforting to know there's _definitely_ no shenanigans this time round.
* `X-Clacks-Overhead: GNU Terry Pratchett` - a [tribute](https://xclacksoverhead.org/home/about) to Terry Pratchett, based on the message protocols within his own books.
* `X-Requested-With: XMLHttpRequest` - appended by various JS frameworks including jQuery, to clearly differentiate AJAX requests from resource requests (which can't include custom headers like this).
* `X-Recruiting: <cheesy pitch to get you to apply for a job>` - quite a few companies add these as a quick way to try and hire the kind of people who read HTTP headers for fun.
* `X-Powered-By: <framework>` - used to advertise the framework or technology that the server is using (usually a bad idea).
* `X-Http-Method-Override` - used to set a method that couldn't be set as the real method of the request for some reason, usually a client or networking limitation. Mostly a bad idea nowadays, but still popular & supported by quite a few frameworks.
* `X-Forwarded-For: <ip>` - A defacto standard used by many proxies & load balancers to include the original requester's IP in upstream requests.

Each of these is weird and wonderful in its own way, but the pattern in general is mostly a bad idea, and a new (2011) [RFC](https://tools.ietf.org/html/draft-saintandre-xdash-00) now formally discourages its use.

The problem is that many non-standard headers eventually do become standard. When that happens, if you used an `X-` prefix, now you either have to change the name (breaking all existing implementations) or standardize the `X-` prefix (defeating the point of the prefix entirely, and adding annoying noise to the name forever).

This is frustrating, and it's broken some real standards:

* Almost all web forms on the internet submit data with an unnecessarily confusing & long-winded `Content-Type: application/x-www-form-url-encoded` header.
* In the [1997 RFC for HTTP](https://tools.ietf.org/html/rfc2068#section-3.5) where it defines the parsing rules for `content-encoding`, it requires all implementations to treat `x-gzip` and `x-compress` as equivalent to `gzip` and `compress` respectively.
* The [standardized](https://tools.ietf.org/html/rfc7034) header for configuring web page framing is now forever `X-Frame-Options`, not just `Frame-Options`
* Similarly, we have `X-Content-Type-Options`, `X-DNS-Prefetch-Control`, `X-XSS-Protection`, and various `X-Forwarded-*` CDN/proxy headers, all of which are widely implemented and have become either formally or defacto standard headers in widespread use.

If you want to use a custom header, just use a custom header name that's not standardized by anybody else. If you really want to avoid collisions, consider namespacing it, but you're usually pretty safe if there's no standard header that appears after a 30 second google.

---

Standardization is _hard_, and HTTP is full of weird corners and odd details when you look closely. Let me know what you think on [Twitter](https://twitter.com/pimterry).

Interested in inspecting & rewriting HTTP for yourself? **[Try out HTTP Toolkit](https://httptoolkit.com)**.