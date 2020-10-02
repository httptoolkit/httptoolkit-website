---
title: 'Translating between HTTP/1 and HTTP/2'
date: '2020-07-15T14:00'
cover_image: './translation.jpg'
---

Semantically, what changed in HTTP/2?

Multiplexed connections, binary frames, header compression - all the headline changes are syntactic and network format changes, rather than fundamental changes to the concept. As a developer building on top of this, you can often ignore the low-level syntax of network protocols like this, and just think about the meaning of each message (the semantics) rather than byte-by-byte how it's sent between computers.

Semantically though, while HTTP/2 is built on top of the ideas of HTTP/1.1, and the [HTTP/2 spec](https://httpwg.org/specs/rfc7540.html) is at pains to emphasize that it is not redefining HTTP's semantics, there are a few real-world semantic differences you need to use it effectively (and with HTTP/2 now in use on [nearly 50% of the top 10 million webservers](https://w3techs.com/technologies/details/ce-http2), you really do need to know how it works).

This matters when building anything non-trivial on HTTP/2, but especially matters if your application does need to translate between the two, e.g. as a proxy or from a cache, and it's important to understand if you want to reliably handle requests in both protocols using the same code.

## The more things change, the more they stay the same

Let's start with what _doesn't_ change.

Firstly, the core communication model is still a request from a client followed by a response from the server.

Requests have a method like GET, a URL, some headers, and optionally a body. Responses have a status code (200, 404...), their own headers, and their own body. Most HTTP methods and status codes still have the same fundamental meanings.

You can write code that takes a request, looks at the method & URL to decide what to do, and sends back a response with a status code and the data requested, and most frameworks will make that work for you automatically. For basic HTTP handling like that, you can just enable HTTP/2 in your server of choice, and you're golden.

Once you get into anything more complex though, you can run into some interesting issues. Let's dig into the differences:

### Status messages are dead

In HTTP/1, every response has a status code, and a status message. In its raw format, that might look like this:

```
HTTP/1.1 200 OK
header-name: header-value
another-header: ...
```

`OK` is the default for 200, but it's not fixed. This is equally valid:

```
HTTP/1.1 200 Super great
header-name: header-value
another-header: ...
```

This status info is received in the client, and can be used to make error messages more informative, to differentiate nuance in status-only responses, and so on.

However, although it's useful in theory to have a space for a single-line summary of a response, this isn't used much in practice, and adds complexity, so HTTP/2 drops it entirely. It's just status codes now, and you'll need to put other data into the body or headers.

### Everything's a header

HTTP/2 moves request and response metadata into so-called 'pseudo-headers'. These are headers, but prefixed with a colon, like `:path` (because in HTTP/1 that's an unparseable header name, so it's guaranteed to not have been used).

That means that although requests do still have methods and URLs and responses still have status codes, they're now part of the header data itself. Rather than building the URL from the request path plus the old `Host` header, we now have `:scheme` (http/https), `:authority` (the hostname) and `:path` (the URL path) headers. Rather than a standalone status code, we have a `:status` header.

This makes translation a bit more complicated, as a lot of pre-HTTP/2 code will choke on header names like these and the values need to be extracted for HTTP/1-compatible usage, but this allows these values to take advantage of [header compression](https://blog.cloudflare.com/hpack-the-silent-killer-feature-of-http-2/) to be sent far more efficiently.

### Hop-by-hop connection headers are no more

The [Connection header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection), along with a few other related headers, describes specific details about how the direct TCP connection between the client and the server or proxy works. For example, in HTTP/1.1 a `Connection: close` header might be sent with a message to close the connection immediately afterwards, rather than keeping it alive ready for future requests.

The Connection header can also include a list of other header names, to declare them as only relevant for the current direct connection, i.e. to tell any proxies involved not to forward them to the target server.

Other hop-by-hop headers include `Keep-Alive` (which defines exactly _how_ a connection should be kept alive), `Proxy-Authenticate` (authentication details for HTTP proxies) , `Trailer` (announces headers that will arrive _after_ the message body in chunked messages), `Upgrade` (switches the protocol of the current connection), and `Transfer-Encoding` (describes data transfer formats, made unnecessary with HTTP/2's data framing).

In HTTP/2, connection-specific headers like `Connection` and `Keep-Alive` are prohibited. While some browsers will simply ignore them, Safari and other webkit-based browsers will outright reject any response that contains them. Easy to do by accident, and a big problem.

Other hop-by-hop headers aren't forbidden, but are not generally functional, and it's recommended that they not be used.

### Cookie headers

In HTTP/1, according to [RFC 6265](https://tools.ietf.org/html/rfc6265#section-5.4):

> When the user agent generates an HTTP request, the user agent MUST NOT attach more than one Cookie header field.

When a user agent (typically a browser) wants to send multiple cookies with a request, it sends them separated with a semicolon and space, like so:

```
Cookie: cookie1=a; cookie2=b
```

In HTTP/2, you can still use this form, but you can also send multiple cookie headers separately, breaking the rule above.

Splitting them up is generally better to do, because it allows HTTP/2 to more effectively compress cookie headers, so they're not sent repeatedly within the same connection. If you do send them separated like this then any change to them only requires sending the new changed header. If you concatenate them as with HTTP/1 then every change to any cookie requires resending all of them.

Unfortunately that means headers for most HTTP/2 requests are invalid in HTTP/1, potentially resulting in your server rejecting the request entirely, missing all but one of the values provided, or other undefined behaviour. It's easy to fix though: just join all Cookie header values with a `'; '` (semicolon + space) separator.

### The CONNECT method

A CONNECT request asks the server for a raw TCP tunnel to a different server. In HTTP/1 this is used almost exclusively for HTTP proxying, so that a client can make an HTTPS connection to a server through a proxy, without sharing the content of the connection with the proxy.

In HTTP/1, a proxy client makes a CONNECT request with the name of the target server, the proxy server returns a 200 response (if it accepts it), and then the entire TCP connection becomes a tunnel to the target server. Every byte sent is sent directly on to the target, and every byte received is sent back to the client.

In HTTP/2, a proxy client makes a CONNECT request with the name of the target server, the proxy returns a 200 response (if it accepts it), and then that one specific [request stream](https://developers.google.com/web/fundamentals/performance/http2#streams_messages_and_frames) becomes a tunnel to the target server. To send data, it must be wrapped up as an HTTP/2 DATA frame, with the id of the tunnelled stream, and the data within that is then forwarded on to the target server, and received data is similarly packed into DATA frames on that stream, whilst other HTTP/2 requests with the proxy server can keep using the same TCP connection independently.

In addition, setting up websockets and other HTTP protocol changes is now done using CONNECT requests, rather than the GET request + Upgrade header + 101 response that was used with HTTP/1. Like CONNECT tunnelling, websockets also now work over only a single stream within the HTTP/2 connection, rather than taking over the entire connection.

### Server Push

Server Push allows an HTTP/2 server to proactively send content to an HTTP/2 client, without it being requested.

You can think of it semantically as an extra response given to a client, along with the metadata of a request that would have generated this response, like "if you were to send me a GET request for /abc, this is what you'd receive".

This is useful when a server can guess what you're likely to request next, for example when you request an HTML page that contains lots of images, it can be useful for the server to push the critical images back alongside the HTML rather than wait for the client to realise they need them.

HTTP/1 has no mechanism similar to this, so there's no way to translate this back for older clients, but fortunately push support is entirely optional, and clients or intermediaries are free to ignore push requests, or set the `SETTINGS_ENABLE_PUSH` setting to `0` to explicitly refuse them up front.

## Translating one to the other

If you're translating between the two, what does that mean in practice?

If you want to safely translate an HTTP/2 message into HTTP/1, e.g. to handle an HTTP/2 request with HTTP/1.1-compatible code, you need to:

* In requests, build a method, URL and 'Host' header from the pseudo-headers
* In responses, read the status from the `:status` pseudo-header, and set the status message to the default for that status code
* Strip all pseudo-headers from the header data
* Join your `Cookie` headers with a `; ` separator, if you have more than one
* Build tunnels from CONNECT requests like normal, but tunneling just within that specific HTTP/2 stream, not the entire connection
* If you receive a server push, drop it silently (although you could cache it first), or considering signaling in the initial HTTP/2 SETTINGS frame that you don't accept pushes in the first place

To safely translate an HTTP/1.1 message into HTTP/2, e.g. to return an HTTP/1.1-compatible response to an HTTP/2 client:

* In responses, drop the status message entirely, and put the status code into the `:status` pseudo-header
* In requests, build the `:scheme`, `:authority` and`:path` headers from the URL and `host` header
* Optional, but recommended: Split `Cookie` headers into a separate header per cookie
* Strip all headers made illegal in HTTP/2 messages:
    * `connection` (and all headers listed in the value of the connection header)
    * `upgrade`
    * `host`
    * `http2-settings`
    * `keep-alive`
    * `proxy-connection`
    * `transfer-encoding`
    * `te` (unless the value is just `trailers`)

With all that in place, you can convert back and forth between HTTP/2 and HTTP/1 messages freely, and easily integrate HTTP/2 into your existing HTTP-powered codebase. Enjoy!

If you're interested in the finer details of implementing this, you might enjoy [this thread](https://twitter.com/pimterry/status/1280132796951007233), where I'm currently live tweeting the entire implementation of [HTTP Toolkit](/)'s new HTTP/2 interception & debugging support, with links and explanation for each commit along the way.

Anything I've missed? Any thoughts? Get in touch [on Twitter](https://twitter.com/pimterry) or [send me a message](/contact/) and let me know.