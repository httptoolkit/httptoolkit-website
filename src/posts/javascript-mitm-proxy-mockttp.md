---
title: 'Build an HTTPS-intercepting JavaScript proxy in 30 seconds flat'
date: '2021-04-27T14:00'
cover_image: './header-images/network.jpg'
---

HTTP(S) is the glue that binds together modern architectures, passing requests between microservices and connecting web & mobile apps alike to the APIs they depend on.

What if you could embed scripts directly into that glue?

By doing so, you could:

* Inject errors, timeouts and unusual responses to test system reliability.
* Record & report traffic from all clients for later analysis.
* Redirect requests to replace production servers with local test servers.
* Automatically validate and debug HTTP interactions across an entire system.

It turns out setting this up is super quick & easy to do. Using easily available JS libraries and scripts, you can start injecting code into HTTP interactions in no time at all. Let's see how it works.

## Putting the basics together

[Mockttp](https://www.npmjs.com/package/mockttp) is the open-source HTTP library that powers all the internals of [HTTP Toolkit](https://httptoolkit.com/), built in TypeScript. It can act as an HTTP(S) server or proxy, to intercept and mock traffic, transform responses, inject errors, or fire events for all the traffic it receives.

First though, if you want to inspect & edit HTTP manually with a full UI and tools on top, it's better to **[download HTTP Toolkit](https://httptoolkit.com)** for free right now instead, and start there!

On the other hand, if you do want to build scripts and automations that capture & rewrite HTTPS, or if you've used HTTP Toolkit and now you want to create complex custom behaviour on top of its built-in rules, then Mockttp is perfect, and you're in the right place.

Getting started with Mockttp is easy: install it, define a server, and start it. That looks like this:

* Create a new directory
* Run `npm install mockttp`
* Create an `index.js` script:
    ```javascript
    (async () => {
        const mockttp = require('mockttp');

        // Create a proxy server with a self-signed HTTPS CA certificate:
        const https = await mockttp.generateCACertificate();
        const server = mockttp.getLocal({ https });

        // Inject 'Hello world' responses for all requests
        server.forAnyRequest().thenReply(200, "Hello world");
        await server.start();

        // Print out the server details:
        const caFingerprint = mockttp.generateSPKIFingerprint(https.cert)
        console.log(`Server running on port ${server.port}`);
        console.log(`CA cert fingerprint ${caFingerprint}`);
    })(); // (Run in an async wrapper so we can use top-level await everywhere)
    ```
* Start the proxy by running `node index.js`

And you're done!

To make this even easier I've bundled up a ready-to-use repo for this, along with easy Chrome setup to test it, [on GitHub](https://github.com/httptoolkit/mockttp-proxy-demo/).

This creates an HTTPS-intercepting [MitM](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) proxy. All requests sent to this server directly or sent through this server as a proxy will receive an immediately 200 "Hello world" response.

From the client's point of view (once configured) it will appear that this fake response has come directly from the real target URL (e.g. `https://google.com/`) even though it's clearly being injected by our script.

When started, this script prints the port it's running on, the fingerprint of CA certificate used, which you can use to quickly temporarily trust that certificate in some clients, e.g. all Chromium browsers.

To test your proxy right now, connect a browser to it (assuming you have Chrome installed) by running:

```bash
google-chrome --proxy-server=localhost:$PORT --ignore-certificate-errors-spki-list=$CERT_FINGERPRINT --user-data-dir=$ANY_PATH
```

You'll need to replace the $variables appropriately ($ANY_PATH will be used to store the profile data for a new temporary Chrome profile that will trust this CA certificate) and you may need to find the full path to the browser binary on your machine, if it's not in your $PATH itself.

If you don't like Chrome, the exact same arguments will work for any other Chromium-based browser, e.g. Edge or Brave, and we'll look at how to intercept all sorts of other clients too in just a minute.

If you run this, and visit any URL in the browser that opens, you should immediately see your "Hello world" response being returned from all requests to any URL, complete with the nice padlock that confirms that this message definitely _definitely_ came from the real website:

![Chrome, showing a HTTPS google URL sending a Hello World response](google-replaced-with-hello-world.png)

Neat!

With this, we can now invisibly rewrite real HTTPS traffic. Let's make that traffic do something more exciting.

## Rewriting HTTPS dynamically

Mockttp lets you define rules, which match certain requests, and then perform certain actions.

Above, we've created a script that matches all requests, and always returns a fixed response. But there's a lot of other things we could do, for example:

```javascript
// Proxy all example.com traffic through as normal, untouched:
server.forAnyRequest()
    .forHostname("example.com")
    .thenPassThrough();

// Make all GET requests to google.com time out:
server.forGet("google.com").thenTimeout();

// Redirect any github requests to wikipedia.org:
server.forAnyRequest()
    .forHostname("github.com")
    .thenForwardTo("https://www.wikipedia.org");

// Intercept /api?userId=123 on any host, serve the response from a file:
server.forGet("/api")
    .withQuery({ userId: 123 })
    .thenFromFile(200, "/path/to/a/file");

// Forcibly close any connection if a POST request is sent:
server.forPost().thenCloseConnection();
```

Rules like these give you the power to rewrite traffic any way you like: pass it through untouched like normal, replace responses, redirect traffic, you name it.

Replace the "hello world" line in the previous example with some of these rules, restart your server, and then try browsing the web again. Example.com will now work fine, but Google will be completely inaccessible, all POST requests will fail, and Github.com will be inexplicably replaced with the content of Wikipedia.org:

![GitHub.com in the URL bar, Wikipedia on the page](./github-as-wikipedia.png)

If you'd like to use more rules like this, the [detailed API docs](https://httptoolkit.github.io/mockttp/) provide more specific information on each of the methods available and how they work.

By default each rule will only be run for the first matching request it sees, until all matching rules have been run, in which case the last matching rule will repeat indefinitely. You can control this more precisely by adding `.always()`, `.once()`, `.times(n)`, etc, as part of the rule definition. If you're defining overlapping rules, you probably want to use `.always()` every time.

## Advanced custom rewrite logic

There's some more advanced types of rule we can add to our script: we can define our own custom request or response transformation logic.

Using this, it's possible to run arbitrary code that can send a response directly, intercept a request as it's sent upstream, or intercept a response that's received from a real server. You can examine all real request & response content in your code, and then complete that request or response with your own changes included.

That looks like this:

```javascript
// Replace targets entirely with custom logic:
let counter = 0;
server.forAnyRequest().forHostname("google.com").thenCallback((request) => {
    // This code will run for all requests to Google.com
    return {
        status: 200,
        // Return a JSON response with an incrementing counter:
        json: { counterValue: counter++ }
    };
});

// Or wrap targets, transforming real requests & responses:
server.forAnyRequest().forHostname("example.com").thenPassThrough({
    beforeResponse: (response) => {
        // Here you can access the real response:
        console.log(`Got ${response.statusCode} response with body: ${response.body.text}`);

        // Values returned here replace parts of the response:
        if (response.headers['content-type']?.startsWith('text/html')) {
            // E.g. append to all HTML response bodies:
            return {
                headers: { 'content-type': 'text/html' },
                body: response.body.text + " appended"
            };
        } else {
            return {};
        }
    }
});
```

The first rule will handle all Google.com requests by itself. The second rule will forward requests upstream, get a response, and then run the custom logic before returning the appended response back to the client:

![Example.com with extra text appended](./example.com-with-text-appended.png)

You can similarly use `beforeRequest` to change the content of outgoing requests. Check [the docs](https://httptoolkit.github.io/mockttp/interfaces/requestHandlers.PassThroughHandlerOptions.html) for a full list of the options and return values available.

## Connecting more clients

So far we've created a proxy that can automatically rewrite specific traffic from a Chromium-based browser. That's great, but a bit limited. How do you connect more clients?

There are generally two steps required:

1. Configure the client to use your Mockttp proxy as its HTTP(S) proxy
2. Configure the client to trust your HTTPS CA certificate

### Configuring your client to use your proxy

Configuring the proxy settings will depend on the specific HTTP client you're using, but is normally fairly simple and well documented.

You can often get away with just setting `HTTP_PROXY` and `HTTPS_PROXY` environment variables to `http://127.0.0.1:$YOUR_PROXY_PORT`, as that's a common convention, but that won't work everywhere. Alternatively, in many cases you can change your system-wide proxy settings to use this proxy, but be aware that this will intercept _all_ traffic on your machine, not just the target application.

If you want to intercept a Node.js application specifically, there is no global configuration option, but you can use the [global-agent](https://www.npmjs.com/package/global-agent) npm module with a `GLOBAL_AGENT_HTTP_PROXY` environment variable to do this like so:

```bash
npm install global-agent

export GLOBAL_AGENT_HTTP_PROXY=http://127.0.0.1:$YOUR_PROXY_PORT
node -r 'global-agent/bootstrap' your-target-app.js
```

For other cases, you'll need to look into the docs for the HTTP client in question.

### Configuring your client to trust your CA certificate

This is the step that ensures the client trusts your proxy to rewrite HTTPS.

It's normally easiest to create CA certificate files on disk, and then import them, so you can easily load them directly into other software.

You can do that in JS by saving the `key` and `cert` properties of the CA certificate to a file. Like so:

```javascript
const mockttp = require('mockttp');
const fs = require('fs');
const { key, cert } = await mockttp.generateCACertificate();
fs.writeFile("key.pem", key);
fs.writeFile("cert.pem", cert);
```

This creates `key.pem` (your certificate private key) and `cert.pem` (your public CA certificate) files on disk, so you can use the same key & certificate every time, and so you can import the CA certificate into your HTTPS clients.

You can reuse these saved certificate details, instead of creating a certificate from scratch every time, by changing your server setup to look like this:

```javascript
const server = mockttp.getLocal({
    https: {
        keyPath: './key.pem',
        certPath: './cert.pem'
    }
});
```

These certificate files can be imported into most tools either via UIs (e.g. in Firefox's certificate settings) or via environment variables (e.g. `SSL_CERT_FILE=/path/to/cert.pem`).

If you want to intercept a Node.js process, there's a custom `NODE_EXTRA_CA_CERTS` variable you can use to do this.

As a full example, combining that with the proxy settings above, that looks like this:

```bash
export NODE_EXTRA_CA_CERTS=/path/to/cert.pem # Trust the cert
export GLOBAL_AGENT_HTTP_PROXY=http://127.0.0.1:$YOUR_PROXY_PORT # Use the proxy

# Start your target app, fully intercepted:
node -r 'global-agent/bootstrap' your-target-app.js
```

If you're having trouble with either of these steps, you may be interested in [the source behind the HTTP Toolkit Server](https://github.com/httptoolkit/httptoolkit-server/tree/master/src/interceptors), which automatically sets up a wide variety of clients for use with HTTP Toolkit in general, from Android to Electron apps to JVM processes.

## Going further

To wrap up then, what can you do with this? Here are some ideas:

* Create a proxy that completely blocks various hostnames or file types. No more ad networks, no more PDFs, no JS bigger than 100KB, whatever you like.
* Proxy traffic during testing to replace some of your internal services or external dependencies with simple mocked versions, with no code changes required in the system under test.
* Capture and log all traffic sent through your proxy matching certain patterns.
* Randomly add delays or timeouts to test the reliability of your clients in unstable environments.
* Combine this with **[HTTP Toolkit](https://httptoolkit.com)** by redirecting some traffic there to your local proxy, to combine a full debugging UI with any custom logic you please, like so:
    ![An HTTP Toolkit rule forwarding traffic to a local proxy](./http-toolkit-to-mockttp-rule.png)

Play around with [the example repo](https://github.com/httptoolkit/mockttp-proxy-demo/), and feel free to get in touch [on Twitter](https://twitter.com/pimterry) if you build anything cool or if you have any questions.