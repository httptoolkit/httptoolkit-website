---
title: "Ignore HTTP Client Errors At Your Peril"
date: '2020-04-16T17:45'
cover_image: './header-images/wrong-way.jpg'
---

There's a lot that can go wrong when talking to servers on the web. When you're building and running a web service, keeping an eye on errors is essential to finding bugs, and understanding the experience of your end users (and hopefully even improving it).

With so many possible forms of failure though, there's some critical cases that can fall through the cracks.

Most backend monitoring and logging will detect and report on _explicit_ server failures, from tracking the number of 5xx HTTP error responses that you send to reporting thrown exceptions to services like [Sentry](https://sentry.io). For this post, I want to go beyond these surface checks, but that's not to say they're unimportant: before you do anything else here, I'd strongly recommend having that fundamental monitoring in place.

In many cases though, those checks alone can offer a false confidence to teams, who assume that no explicit server errors means that everything is working fine. That's frequently not true. These don't tell the whole story, as there's a whole world of errors that matter to the backend, and whose root cause lies in the server itself, but which surface as _client_ errors, and never get reported.

## The Client is Always Right

When we talk about 'client' errors, I'm talking about errors that are typically blamed on bad client behavior. Think unexpected connection resets, semantically invalid HTTP requests, syntactically invalid HTTP requests, and the like.

These are issues caused by how the client communicates with the server, rather than by the server's core application logic. They're often handled at a lower level of your HTTP stack, and logged and handled separately. 4xx errors often aren't included in default metrics, invalid or disconnected HTTP requests often don't get a response at all, and many of the raw errors these trigger will be handled and swallowed by your HTTP server or framework. These are near-invisible failures.

They're ignored usually simply to manage the noise. There really are bad clients out there, from bots to old browsers to individual users doing quick tests with cURL, and you don't want to hear about their problems. However, in many cases you control the client for your application &mdash; be it your mobile app, your single-page web application, or other servers within your own infrastructure &mdash; and failures in communication with them means your product is broken for your users. Even when you're producing an API used by 3rd parties, those 3rd parties are often your customers, and those client errors are hurting their experience of your product, regardless of the cause.

**Your users do not care about layers of your software stack.** From their point of view, your software either solves their problem or it's broken. If it's broken because of an error in a client, be it their browser or their phone or the JS you've delivered to their device, it's just as broken as if the server threw an exception. Monitoring and reacting only to explicit server errors, simply because they're easier to spot, is a classic example of [the streetlight effect](https://en.wikipedia.org/wiki/Streetlight_effect), where attention is focused on the issues that are easiest to see, rather than the issues that are most important.

If lots of your HTTP clients suddenly start hitting errors, as the person responsible for the server, you want to hear about it, and right now, many teams won't.

Let's look at some examples, to make this more concrete:

### TLS setup errors

If you're running an HTTPS service, the first thing any client does when they connect is negotiate a TLS connection, creating a secure channel with your server that they can use for their request. This can fail.

There's a few ways this can fail:

* If your certificate expires. Automation with services like [Let's Encrypt](https://letsencrypt.org/) helps with this, but it's not sensible to assume they're infallible. You may also see this if the client's clock is wrong - on the web that might be their problem, but if your client is another server in your infrastructure then it's definitely something you want to be aware of.
* If your clients' certificate validation requirements change. In 2018, the latest Chrome released [started requiring](https://www.ssls.com/blog/2018-certificate-transparency-requirements-google-chrome/) Certificate Transparency for all certificates. In September 2020, Apple will [stop trusting certificates](https://support.apple.com/en-us/HT211025) with lifetimes longer than 398 days. The rules for a 'valid' certificate are inconsistent and subject to change. When they change, new HTTPS certificates issued in exactly the same way to previous ones will be invalid and non-functional.
* If your clients' TLS requirements change. Your server has configuration defining which TLS versions and cipher suites it supports, as does every TLS client. If the server & client can't agree on a common configuration then TLS connections will fail. Updates to your servers or updates to clients can make browsers, API clients and mobile devices silently incompatible with your server.
* If your certificate authority (CA) becomes untrusted. In 2018, all certificates signed by Symantec's CA or any of its intermediate CA brands (e.g. Verisign, GeoTrust, Thawte, RapidSSL...) were [distrusted by all major browsers](https://wiki.mozilla.org/CA:Symantec_Issues). If you were one of the sites using those certs, a huge proportion of web browsers started rejecting your certificates almost overnight.
* If your certificate is revoked. If your private key is leaked, you need to revoke your certificate, and clients should all stop trusting it immediately. In addition, at times CAs make mistakes, and have to [revoke active certificates en-mass](https://threatpost.com/lets-encrypt-revoke-millions-tls-certs/153413/). Revocation checking is hit-and-miss in a few ways, but can definitely result in your certificate suddenly being rejected by clients.
* If you screw up certificate pinning. With [HPKP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning) in browsers (now deprecated, though still generally supported) or certificate pinning configuration in [mobile apps](https://developer.android.com/training/articles/security-config.html#CertificatePinning), a client can be configured to only trust a specific certificate. If your server starts using a different certificate, serves an incorrect HPKP configuration, or if a mobile app is misconfigured, your TLS setup will be rejected.

In any of these cases, those requests fail and your product is broken, but no server-side error appears. This is bad. Fortunately, it's detectable.

Firstly, TLS handshakes can be terminated by a fatal TLS alert (and MUST be, in some cases) with codes defined to describe the various possible issues, e.g. 42 bad certificate, 44 certificate revoked, 45 certificate expired, etc. These are alerts sent from the TLS client to the server before the handshake is rejected, and in most cases your server will already receives these alerts without doing anything. With most web servers, you can subscribe to these directly or log them automatically, and then include them in your metrics and reporting.

Unfortunately, not all clients will close all connections with clear alerts like this when they're not happy. In many cases, clients will simply close the connection once they receive unacceptable TLS data, or complete the handshake 'successfully' but then immediately close the connection without sending any data. That brings us to our next error:

### Unexpected connection resets and closes

Once a client has connected to your server, it's supposed to send its request (`GET /hello`), listen for the response, and then cleanly close the connection (ignoring keep-alives for a moment).

If that connection is immediately reset or closed, before a request is sent, it's likely that this is one of the above TLS setup issues.

There are other cases here too though, where the request will be closed earlier than expected in that process, like:

* User client connectivity issues (perhaps interesting in aggregate, but unlikely to be important individually).
* Connectivity issues in your own infrastructure, perhaps between caches or reverse proxies and your servers.
* Issues where certain statuses or header values crash the client outright, killing the connection before the response can be completed.
* Broken mobile apps or other API clients, which mishandle their outgoing connections.

Except for the HTTPS case, the causes of these disconnections can often be unclear, and many of these are just noise. Nonetheless, these cases are very easy to detect, and in aggregate this data can help to pinpoint server issues and spot broken clients far earlier than you would otherwise.

### Semantically invalid HTTP requests

Clients can send HTTP requests that are structurally valid, but make no sense.

Perhaps this might be an attempts to update a user who doesn't exist, or to set a completely invalid property on some resource. Requests for invalid paths, requests with the wrong method, or requests with invalid authentication parameters all fall into this camp. In each of these cases, the server does understand the raw content of the client request, but your application logic can't or won't do what it's requesting.

These requests should result in 4xx status code responses. In many cases though, these are tracked completely separately from 5xx server error responses, and largely ignored, though many of these are interesting!

Clients sending semantically invalid requests to your API implies a bug in either the client or server. Perhaps the client is using a endpoint that you've removed, thinking it was unused. Perhaps the client is genuinely using the API wrong, or perhaps your server is configured incorrectly and is rejecting valid requests.

In each case, these are clearly real bugs, and are either your problem and need urgent fixes (for 1st party clients), or these highlight issues in your documentation, SDK & examples (for 3rd party API clients).

The main exception to this is 404 errors from browser clients and crawler bots. These are common, it's easy to get overwhelmed if you start paying attention to them, and they are often just noise. That said, it's worth tracking the URLs that most often trigger such 404 errors, and skimming the top of that list occasionally, to spot broken links and URLs in your service.

### Syntactically invalid HTTP requests

Clients can send HTTP requests that make no sense whatsoever. Instead of `GET /index.html HTTP/1.1` they might send non-ASCII binary data, or some other unparseable gibberish, such that the server cannot understand what they want at all.

These generally imply some lower-level failure of basic communications expectations. Some examples:

* Sending HTTPS traffic to a server that only accepts HTTP
* Optimistically sending HTTP/2.0 traffic to an HTTPS server that only supports HTTP/1.1
* Somebody sending you traffic that isn't HTTP at all
* Headers longer than the maximum header length your server will accept
* Invalid content-encodings, content-length or transfer encodings for a request body
* A body containing content with the wrong content-type, which can't be parsed

All of this means that somebody is seriously misinterpreting what your server expects to receive. That usually means a major bug in either the server or the client, and these can have serious consequences.

Overlong headers are a particularly interesting example. Although the HTTP spec doesn't define a maximum, in practice most servers have a limit on the length of headers they'll accept in a request, and will reject requests immediately with a 431 response if they exceed this. Apache defaults to 8KB, IIS to 16KB, and Node.js recently reduced theirs from 80KB to 8KB [as a security fix](https://nodejs.org/en/blog/vulnerability/november-2018-security-releases#denial-of-service-with-large-http-headers-cve-2018-12121).

It's surprisingly easy to go over this limit, particularly if you're setting a few large cookies or using a metadata-heavy JWT for authentication. If that happens, then when your users tick over the limit their requests will all be [suddenly, inexplicably and silently rejected](https://medium.com/@evgeni.kisel/troubleshoot-nodejs-application-silently-rejects-requests-without-any-logs-c09c9111656a). On almost all servers this is a simple configuration change to fix (or of course, you could stop sending so much metadata in your requests), but if you're not logging client errors then you won't notice this on the server side at all.

This is particularly bad for cookies, since these can accumulate and many will be set for a long time, this rarely comes up in automated testing, and the end result is to effectively lock the user out of the service indefinitely & invisibly. Oops.

You'll also see errors like this in broken server configuration, for example if you accidentally disable HTTP/2 on a server that previously supported it, or if your request body parsing isn't capable of handle all valid inputs.

Each of the other cases suggests a major bug, somewhere in the server or client implementation. Something is very wrong, the server definitely has the details, and you should look into that.

## Collecting Client Feedback

There's a lot of things that can go wrong in a client's requests. Fortunately, in all of these cases your server already knows this is happening, it's just not telling you about it. Most server frameworks don't report on client errors like these by default:

* Node.js & Express won't report or call error handlers for most client errors automatically, and you need [`clientError`](https://nodejs.org/api/http.html#http_event_clienterror) (for HTTP errors) and [`tlsClientError`](https://nodejs.org/api/tls.html#tls_event_tlsclienterror) (for TLS errors) listeners to hear about them.
* Apache and Nginx won't log TLS handshake issues like other errors, unless you [explicitly configure](https://cwiki.apache.org/confluence/display/HTTPD/DebuggingSSLProblems) them [to do so](https://stackoverflow.com/questions/38934956/nginx-log-ssl-handshake-failures).
* Puma (the most popular Ruby server) has a [separate error handler](https://puma.io/puma/file.README.html#error-handling) for all low-level (non-application) errors, separate from the error handling in your Rails/Sinatra/etc application.
* AWS's API Gateway automatically parses and handles many types of client error [for you](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-gatewayResponse-definition.html), making them invisible to your application code.
* Microsoft's IIS has [a separate log](https://learn.microsoft.com/en-US/troubleshoot/developer/webapps/aspnet/site-behavior-performance/error-logging-http-apis) for all HTTP errors that it handles outside the application, from connection resets to parsing issues to TLS failures.

You get the idea.

This isn't a hard problem to solve: the servers have this information, but they often don't include it as part of normal error logging & handling, simply because these errors can be irrelevant or noisy. That's not an unreasonable default to start with, but once you have an application in production and you really care if it works, it's good to look into these.

On the other hand, that definitely doesn't mean you want to get a notification for every single client error, or even for every spike in errors, but tracking metrics to spot patterns and enabling notifications for specific classes of these errors can be useful. For example:

* Even a small spike in certificate rejections or malformed requests suggests a major configuration bug has been released somewhere.
* Graphing unexpected connection closes & resets can be another easy way to spot TLS issues, and get a better understanding of your users' overall experience of your product.
* Receiving notifications for any [431 Request Headers Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431) errors is probably a good idea, and potentially other 4xx errors depending on your application, as these can otherwise hide serious & invisible client failures.
* Recording and occasionally checking on your top 404 URLs can highlight interesting cases of broken links or client bugs.

The specific cases that matter to your application will vary, and there will be noise that you want to ignore too, but ignoring all client errors completely is rarely the right balance.

Lastly, in addition to monitoring these on the server, where possible of course it's also good to have tests in places for your client applications, and to monitor them in production too. For many cases that isn't possible though (for 3rd party clients and applications merely using your SDK), that may comes with serious privacy risks (for clients running on user devices), and reporting client errors from the server directly can make issues more directly available to the team best placed to deal with them. Collecting these on the server side is easy, and solves this for all possible clients out of the box.

## A Worked Example

To wrap up, let's see how this looks in practice.

In my own case, I've been integrating HTTP client error reporting into [HTTP Toolkit](/). HTTP Toolkit intercepts HTTP connections for debugging, and already highlights common cases like TLS errors (to easily spot clients that don't trust the MITM certificate yet), but I recently discovered that many of the client errors listed here were hidden, or not fully reported, making it hard to inspect all client behaviour. This is [now fixed](https://github.com/httptoolkit/mockttp/commit/1083d61f75d57b937d5a84821453ad0b4c271428) in the underlying open-source [proxy library](https://github.com/httptoolkit/mockttp), so all of these errors will be fully surfaced in the next HTTP Toolkit server update.

How does this work?

For TLS errors, we just listen for `tlsClientError` events on the HTTP server. That's super simple:

```js
server.on('tlsClientError', (error) => recordClientError(error));
```

As mentioned above, there's also the case of TLS connections that reject silently, by connecting 'successfully' then disconnecting immediately without sending anything. This is a fairly common pattern for clients who don't trust your HTTPS certificate for some reason. To spot those, you'll want something like this:

```js
// Takes a new TLS socket, calls the error listener if it's silently closed
function ifTlsDropped(socket, errorCallback) {
    new Promise((resolve, reject) => {
        socket.once('data', resolve);
        socket.once('close', reject);
        socket.once('end', reject);
    })
    .catch(errorCallback); // Called if 'close'/'end' happens before 'data'
}

// Check for this on all new connections:
server.on('secureConnection', (tlsSocket) =>
    ifTlsDropped(tlsSocket, () =>
        recordClientError(new Error("TLS connection closed immediately"))
    )
);
```

Those two quick checks should let you record and report on most HTTPS issues.

You'll also want to catch non-TLS client errors. To do so, you're looking for the [clientError](https://nodejs.org/api/http.html#http_event_clienterror) event:

```js
server.on('clientError', (error, socket) => {
    recordClientError(error);

    // By listening for this, you take responsibility for cleaning
    // up the client socket. Here's the equivalent of Node's default
    // implementation for that:

    if (socket.writable) {
        if (error.code === 'HPE_HEADER_OVERFLOW') {
            socket.write(Buffer.from(
                "HTTP/1.1 431 Request Header Fields Too Large\r\n" +
                "Connection: close\r\n\r\n"
            , 'ascii'));
        } else {
            socket.write(Buffer.from(
                "HTTP/1.1 400 Bad Request\r\n" +
                "Connection: close\r\n\r\n"
            , 'ascii'));
        }
    }
    socket.destroy(error);
});
```

Easy peasy.

Make sense? Agree, disagree, or hate the whole concept? Get in touch [on Twitter](https://twitter.com/pimterry) or [send a message directly](/contact/) and let me know.