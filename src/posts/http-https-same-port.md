---
title: 'One Port to Rule Them All'
date: '2021-04-15T16:45'
cover_image: './lotr.jpg'
---

Traditionally, a TCP port has a single server listening for incoming connections, and that server expects you to send messages in the right protocol for that port. For HTTP, it's normally a web server that'll send you a response directly, or some kind of proxy that will pass all requests through to another server, and then pass the responses back.

This is boring.

**[HTTP Toolkit](https://httptoolkit.tech/)** acts as an HTTP(S) proxy for debugging and interception. With all the possible combinations of clients and configurations, tools like this can be complicated to set up, and getting everything working and properly intercepted is a common pain point.

To make setup as easy as possible, HTTP Toolkit uses a single incoming port for absolutely _everything_, for every widespread HTTP format, for both HTTP & HTTPS, for both direct and proxied requests.

Specifically, on one single port it accepts:

* Plain HTTP/1.* (1.1, or 1.0 if you just can't quit the 90s)
* HTTP/1.* over TLS (HTTPS)
* Plain-text HTTP/2 with prior knowledge
* Plain-text HTTP/2, upgraded on the first request by an Upgrade header
* HTTP/2 over TLS (HTTPS) negotiated via ALPN

These can then all be combined to suit your tastes with a selection of ways to make your actual HTTP request:

* Make a direct request to HTTP Toolkit's URL as if it were a server, and mock a response for that in the app (`GET /`).
* Proxy through HTTP Toolkit explicitly in plain text (`GET http://example.com/`).
* Redirect unsuspecting traffic that's not aware of the proxy to HTTP Toolkit, to transparently proxy traffic elsewhere:
  ```
  GET /
  Host: example.com
  ```
* Tunnel traffic by connecting with HTTP/1.1, sending `CONNECT example.com:443` to make the connection into a tunnel to another server, and then doing any of the above within that tunnel.
* Tunnel traffic within a single HTTP/2 stream, by sending a CONNECT request to convert that one stream into a tunnel, and then doing any of the above again within that tunnel.

**No matter what you send, or what tunnels you create, at every step you're only ever talking to HTTP Toolkit**.

All tunnels and proxying are just connections that get unwrapped, intercepted, and handled again, looping back through HTTP Toolkit until you make a real request, at which point your configured rules are applied (which might then proxy traffic upstream, redirect it, return a fixed response, reset the connection, or anything else).

All the above can be combined together on a single connection, and then combined in different ways in the following tunnel. You can connect to HTTP Toolkit with TLS, use HTTP/1.1 to open a CONNECT tunnel to a remote server through that, send the remote server a plain text HTTP/1.0 request asking to upgrade, then make your real request with HTTP/2, and you're still just talking to HTTP Toolkit.

This allows HTTP Toolkit to transparently intercept traffic from every possible client configuration, all in one place.

It might sound confusing right now, but it's certainly not boring. How does it work?

## Under the hood

There's a few steps involved in making this work smoothly, powered by two key tricks: connection packet sniffing, and the magical stream & server APIs of Node.js.

### 1. Sniff the data

When a connection is received, we look directly at the first byte on the stream and:

* If the first byte is 0x16, it's a TLS connection (this indicates a TLS handshake)
* If the first byte is 0x50 ('P'), it's probably the start of the HTTP/2 preamble (which looks like `PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n`, sent before the raw binary data begins on all HTTP/2 connections). We wait for the full preamble, just to be sure, then treat this as plain HTTP/2.
* Otherwise, it's probably plain-text HTTP/1 (or some completely unknown protocol)

Implementing this in practice looks something like this:

```javascript
const firstByte = socket.read(1);

if (firstByte === 0x16) {
    // Do something with this TLS connection
} else if (firstByte === "P".charCodeAt(0) && isHttp2Preamble(socket)) {
    // Do something with this HTTP/2 connection
} else {
    // Do something with this HTTP request
}
```

This tells us what the _first_ protocol on this connection is going to be, but we still need to fill in those blanks.

_(Credit where it's due: the original concept here came from [@mscdex](https://twitter.com/mscdexdotexe), who built the [original HTTP/1-only implementation](https://www.npmjs.com/package/httpolyglot) that all this logic is based on)_

### 2. Connect the right server

Ok, so we know what protocol is coming on our connection, now we need to actually handle the sniffed protocol.

To do this normally you'd create a server for the protocol, tell it to listen on a given port, and then expect it to handle traffic to that port and give you usable streams or requests or whatever that expose the meaningful data from within the protocol.

For example, you can start a TLS server to listen on a port, and it'll handle TLS for you and expose streams to which you can read and write your application data. Each stream write will be encrypted and sent on the TLS connection, and each incoming TLS packet will be transparently decrypted, with the stream exposing the useful data within.

Similarly, you can start an HTTP/2 server listening on a port, and once somebody connects and sets up the HTTP/2 connection it'll fire an event for each request, so that you can handle the request and send your response.

This is normally great, but it's not going to work for us: in every standard use of these servers, they completely control the port and the stack of protocols required internally to give you the behaviour you want.

Helpfully though, there is a little-used alternative API that can do this. Instead of asking the server to listen on a port, you can directly pass it a readable & writable stream (pretending it's an incoming raw network connection) and it'll run its own protocol on top of that, just as if it were a real socket.

The API to do this is simple: `server.emit('connection', myStream)`. When you do that, the server runs all the same logic as if a new network socket had arrived, but it uses that stream as the transport.

Adding that into the mix, we can implement logic to sniff and then handle incoming connections like so:

```javascript{15,17,19}
// Create a real server that'll listen on a real port:
const rawServer = new net.Server();

// Create various sub-servers, which will handle the actual
// protocols, once we work out which one is relevant:
const httpServer = http.createServer();
const http2Server = http2.createServer();
const tlsServer = tls.createServer(tlsConfig);

// Sniff and then delegate incoming sockets:
rawServer.on('connection', (socket) => {
    const firstByte = socket.read(1);

    if (firstByte === 0x16) {
        tlsServer.emit('connection', socket);
    } else if (firstByte === "P".charCodeAt(0) && isHttp2Preamble(socket)) {
        http2Server.emit('connection', socket);
    } else {
        httpServer.emit('connection', socket);
    }
}));

rawServer.listen(8000); // Only the raw server is attached to a port
```

(Simplified for readability, feel free to dig into [the full implementation](https://github.com/httptoolkit/httpolyglot/blob/master/lib/index.js) if you're interested).

It's important to note that HTTP Toolkit can decrypt and intercept TLS connections for any domain using the above TLS server, because it's set up as an HTTPS MitM proxy. Those details are a topic for another blog post ([e.g.](https://httptoolkit.tech/blog/intercepting-android-https/)) but in practice this means the `tlsConfig` here contains a CA certificate trusted by all clients to issue certificates for any host we like, so we can handle and decrypt TLS connections for any host that's requested.

With that, this gives us enough to immediately handle the first step for all 3 protocols in one place on one port, but there's one big problem.

### 3. Pretend we never sniffed the data

When you remove data from a stream, it's removed from the buffer entirely. Once we've read the first byte from an incoming socket, that data is removed from the socket's buffer, and it's no longer readable.

Because of this, when we pass the sockets to a server, they're all missing the essential initial data. TLS sockets are missing the 0x16 that signals an initial client handshake, plain-text HTTP is missing the first letter of the HTTP method (ET, OST, ELETE, PTIONS), and HTTP/2 is missing the whole of its required preamble.

This breaks everything. Fortunately, there's another convenient Node streams API that can save us!

After we've read the data, we just need to push it back into the socket's buffer, so everything is as it was before. We can do that nice and easily by adding `socket.unshift(data)`. This is a rarely used Node [streams API](https://nodejs.org/api/stream.html#stream_readable_unshift_chunk_encoding), but it's officially supported and it works nicely.

If we add that just after we read the data then everything will work nicely:

```javascript{3}
rawServer.on('connection', (socket) => {
    const firstByte = socket.read(1);
    socket.unshift(firstByte);

    // ...
```

### 4. Unwrap TLS

Even once that's working, we still need to do something inside the TLS server to make it useful. HTTP Toolkit is looking for HTTP requests, so when we do accept a TLS connection we then need to parse and handle the decrypted TLS content somewhere.

Once we get to the TLS stage though that's easy enough, because modern TLS protocols are negotiated explicitly, using [ALPN](https://en.wikipedia.org/wiki/Application-Layer_Protocol_Negotiation).

For our purposes the details of that don't matter, but the end result is that after the TLS handshake is done, the client and server have agreed what protocol they're going to use. We just need to handle it, by replacing the TLS setup above with:

```javascript
const tlsServer = tls.createServer(tlsConfig, (tlsSocket) => {
    if (tlsSocket.alpnProtocol === false || tlsSocket.alpnProtocol.startsWith('http/1')) {
        // If the client doesn't support ALPN, or explicitly wants HTTP/1.*, use that:
        httpServer.emit('connection', tlsSocket);
    } else if (tlsSocket.alpnProtocol === 'h2') {
        // The client wants to talk HTTP/2, so pass the socket to the HTTP/2 server
        http2Server.emit('connection', tlsSocket);
    } else {
        // Unknown protocol - this shouldn't happen because we can configure which
        // protocols the server will accept ourselves within the TLS config.
    }
});
```

Here we're now giving a TLS socket to each of the HTTP servers, while we're giving them a plain socket in the previous example. That's OK though, as this is all invisible to them. They just get given streams, and they read and write plain text data from them and it works, the protocol carrying the stream doesn't matter.

Strictly speaking, some of this isn't totally necessary. For HTTP/2, Node already supports accepting both HTTPS HTTP/1.1 and HTTP/2 on the same port via ALPN with the [allowHTTP1](https://nodejs.org/api/http2.html#http2_alpn_negotiation) option. That intentionally only works for HTTPS though, not plain text, and we can't easily combine it with the rest of the logic here, so it's better to do everything ourselves instead.

### 5. Build some tunnels

We've now got a `net.Server` which receives packets from the network, and two HTTP servers that receive and process the appropriate requests, on all the protocols I listed at the start.

We're not handling the requests yet, but even if we added a request listener, we would still only be accepting direct HTTP requests so far (e.g. unproxied GET requests). To capture tunnelled content, we need to handle CONNECT requests too.

CONNECT tunneling is something that many application developers aren't aware of, but it's a powerful feature that's also actually very simple: the client sends a CONNECT request including the target host & port, the proxy sends a 200 OK response, and then the socket becomes a raw tunnel to the given target, so every byte sent is forwarded directly to the remote server untouched.

That gives you a connection to the target, and on top of this you'd typically use TLS so the proxy can't see what you're sending.

Implementing this ourselves is surprisingly easy & elegant:

```javascript
// When somebody sends an HTTP/1.1 CONNECT request:
httpServer.on('connect', (connectRequest, socket) => {
    // Tell the client the tunnel is connected, so they can start talking
    // to the remote server:
    socket.write('HTTP/1.1 200 OK\r\n\r\n');

    // That was a lie: pass the socket straight back our raw sniffing server
    // and read all the tunnelled data ourselves as if it were a new connection.
    rawServer.emit('connection', socket);
});
```

This completes the loop: if you create a tunnel, the socket goes back to the `net.Server`, which reads the first byte to work out what the data is, and then passes the socket to the appropriate server for the sniffed protocol, and then we listen there for more CONNECT requests... That works just fine though, and this means we can handle tunnels in tunnels in tunnels, as deep as you want to go!

That's how this works for HTTP/1.1. For HTTP/2 the concept is a little different, because a single HTTP/2 connection contains many parallel streams, each of which can include requests and responses at the same time. This is how HTTP/2's multiplexing works: by wrapping all request and response data in frames, which include a stream id, so you can tell which requests match which responses.

That framing applies to CONNECT requests too. When you proxy over HTTP/2, a single stream within an HTTP/2 connection becomes a tunnel, not the whole connection. This means that when you send data through the tunnel, it's actually wrapped up in an HTTP/2 frame marking it as part of the tunnel stream, rather than being sent raw as in HTTP/1.1.

We don't have to care about all that though, because the API is still super easy:

```javascript
http2Server.on('connect', (connectRequest, response) => {
    // Once again, tell the client we've created a tunnel:
    response.writeHead(200, {});

    // And then betray them, handling the connection ourselves:
    rawServer.emit('connection', response.stream);
});
```

We're now firing a `connection` event that doesn't even contain a socket any more. `response.stream` is just a stream that is part of the larger HTTP/2 connection. Doesn't matter though - `net.Server` can still write to it just like any other stream, so we loop around again and the protocol sniffing continues.

### 6. Handle real requests

All of this is great, and yet we've achieved nothing: when the ~~tonguing~~ tunneling is done we still can't handle an HTTP request. That's the last step:

```javascript
const requestListener = (request, response) => {
    // ...Read from the request, write to the response.
    // In reality HTTP Toolkit matches the request against the configured
    // rules here, and then delegates this to an appropriate request
    // handler that can respond somehow.
};

// We pass both HTTP/1 and HTTP/2 requests to the listener. There's only a
// small number of differences here, but making the URL absolute using the
// appropriate header is 90% of the work to support this, and accept other
// transparently redirected requests too.
httpServer.on('request', (request, response) => {
    request.url = getAbsoluteUrl(request.url, request.headers['host']);
    requestListener(request, response);
});

http2Server.on('request', (request, response) => {
    request.url = getAbsoluteUrl(request.url, request.headers[':authority']);
    requestListener(request, response);
});
```

That's it! Put this code together, and you can handle all those different types of HTTP requests, all in one place.

## Wait, what about HTTP/3?

Touché, you got me. This can intercept almost all kinds of HTTP requests in widespread use today, but it doesn't yet support HTTP/3.

HTTP/3 is different, in that it runs over UDP, not TCP, so it's never going to be possible to completely intermingle it with TCP connections and tunnels like this.

That should make it simpler to implement, as it creates a strictly separate request pipeline, although that would be a bit less fun. In theory it should support tunnels too though, so you can tunnel HTTP/1.0 over TLS over HTTP/3 over QUIC over UDP, I think... (This is going to need more research).

Either way I intend to try and ensure the server uses the same UDP & TCP port numbers regardless, where possible, to simplify setup as much as I can.

In the short term, the main reason this isn't supported is because Node.js doesn't support either [QUIC](https://en.wikipedia.org/wiki/QUIC) (the underlying UDP-based protocol) or HTTP/3 yet without enabling experimental features. I'd rather wait for it to be production ready, but it's scheduled to be included in Node.js v16, landing next week, so hopefully this will be available soon! Watch this space.

## Real talk

That's a quick overview of how this all works. Of course the code above is significantly simpler than the real code HTTP Toolkit runs in production. There's many more details involved in making this stable & effective!

However, if you're looking to implement similar things for real yourself, I have 3 pieces of good news:

First, I've published the connection sniffing HTTP server as a standalone npm package called [@httptoolkit/httpolyglot](https://www.npmjs.com/package/@httptoolkit/httpolyglot), so you can drop that into your projects and immediately start accepting all HTTP protocols in one place straight away. It looks like this:

```javascript
const httpolyglot = require('@httptoolkit/httpolyglot');
const fs = require('fs');

const server = httpolyglot.createServer({
    // Provide your HTTPS configuration:
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
}, (req, res) => {
    // Both HTTP/1 and HTTP/2 requests will end up here, for both plain text and HTTPS.

    // Both of them support the same core request & response API:
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end((req.socket.encrypted ? 'HTTPS' : 'HTTP') + ' Connection!');
})

// This server can then handle everything on a single port:
server.listen(8000);
```

Second, the complete proxy is available as a separate npm package called [Mockttp](https://www.npmjs.com/package/mockttp). This is all of the low-level internals of HTTP Toolkit, as a standalone JavaScript package, which you can use for testing & automation, or to build intercepting proxies for yourself.

Using that, if you want to write code that accepts and proxies HTTP requests of all kinds and then handles or transforms the traffic, you can get started right now in 20 lines:

```javascript
const mockttp = require('mockttp');

const https = mockttp.generateCACertificate();
const server = mockttp.getLocal({ https });

server.start(8000).then(async () => {
    // Create rules to mock responses:
    await server.get('https://example.com/').thenReply(404);

    // Or proxy requests upstream, log them, and transform the response
    await server.anyRequest().thenPassThrough({
        beforeResponse: ({ statusCode, body }) => {
            console.log(`Got ${statusCode} with: ${body.text}`);
            return { body: body.text + " appended" };
        }
    });

    console.log(`Server running on port ${server.port}`);
});
```

Make any requests you like any way you like against port 8000 (making sure you trust the CA certificate first, for HTTPS) and they'll all be intercepted and handled according to your rules.

Lastly, if you want to go further, all the real-world underlying implementation of this is open source. You can go explore [the connection sniffing](https://github.com/httptoolkit/httpolyglot/blob/master/lib/index.js) or [the proxy unwrapping implementation](https://github.com/httptoolkit/mockttp/blob/f58f18f88f5f784e21560dd1b27dfa8810eb0388/src/server/http-combo-server.ts#L224-L274) or [the HTTP normalization logic](https://github.com/httptoolkit/mockttp/blob/f58f18f88f5f784e21560dd1b27dfa8810eb0388/src/server/mockttp-server.ts#L349-L372) to your heart's content.

I hope all this helps you in your HTTP endeavours! If you build something cool related to this, or if you want to ask lots more questions, feel free to [get in touch on Twitter](https://twitter.com/pimterry).

_Doing interesting things with HTTP? **[Download HTTP Toolkit now](https://httptoolkit.tech/)** to capture, inspect & mock HTTP from browsers, servers, apps and anything else in one click._