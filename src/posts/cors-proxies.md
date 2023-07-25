---
title: What are CORS proxies, and when are they safe?
date: '2021-04-01T09:30'
cover_image: './header-images/broken-paperclip.png'
---

CORS can be complicated. If you're struggling with it, you might discover the concept of a 'CORS proxy' that promises to solve this, like [cors-anywhere](https://github.com/Rob--W/cors-anywhere) or one of the many 'free CORS proxy' hosted services.

CORS proxies let you bypass the security restrictions that CORS applies, with just a tiny change of URL.

That feels convenient, but turning off security feels dangerous. How do CORS proxies work, and what real-world security problems can they create?

## Why is CORS a problem?

For a typical CORS request:

* You serve some content to your user via your origin (let's say `https://home.example`).
* Your content includes JavaScript, which makes a request to another origin (let's say `https://other.example`).
* The browser now needs to make a request from the user's machine to that other host.

Browsers are very cautious about doing that last step, for two main reasons.

First, browsers often have credentials (e.g. cookies) linked to each domain, and one website shouldn't be able to make requests which might use your credentials & sessions for an unrelated domain. Random sites on the internet shouldn't be able to make requests to your bank's servers with your session cookies.

Second, the target server might be private, an internal network address like `10.0.0.1`, `localhost`, or a remote server that only allows requests from certain IP addresses. These servers wouldn't normally be accessibly from the public internet, and remote websites shouldn't be able to make requests to them just by bouncing the request through your browser.

Both of these are important security protections for end users who (quite reasonably) want to visit websites without losing control of either their online banking or their home router.

To protect against this, browsers send CORS headers in requests (and sometimes a CORS preflight request, before the real request) to check that the server is happy to accept the request and share the contents of the response.

If the target server isn't aware of CORS, or doesn't want to allow browser clients, it won't send the CORS headers you need. In that case, the browser then won't allow you to make some requests to or view any responses from that site, even if the site is publicly available on the internet without any authentication (because the browser has no way to know that).

That failure case looks something like this:

![A failing CORS request in action, with the browser rejecting the response](./cors-failure.png)

Failures like this can be annoying if you just want to load some simple data from one website inside another, especially when it's publicly accessible outside the browser with no problems at all.

This is a particular problem for single-page applications, like React, Vue or Angular sites, where all API requests generally happen on the client side.

## How do CORS proxies work?

CORS proxies let you work around this. Rather than the browser sending a request to the target server directly, it sends the request to a CORS proxy with the target URL, which might look like `https://corsproxy.example/https://other.example` (using the target URL as a path). The CORS proxy then forwards the request to the real server, and then returns the response _plus the correct CORS headers_.

That looks like this:

![A successful CORS request sent via a CORS proxy](./cors-proxy.png)

This lets you make requests to servers that don't support CORS, which is lovely.

From the browser's point of view, any request via the proxy is just a request to the proxy's origin which does seem to support CORS. It's not aware you're talking to the real target address at all.

Because from the browser's point of view the content now comes from the CORS proxy's origin, that means the request will never include any pre-existing credentials linked to the real target origin.

Of course, this also only works for publicly accessible sites, which the CORS proxy can directly access from wherever it's hosted. You can't use a CORS proxy to access anything on the end user's local network.

There are quite a few tools you can use to implement a CORS proxy, from modules to easily run your own proxy like [cors-anywhere](https://www.npmjs.com/package/cors-anywhere), to [examples](https://developers.cloudflare.com/workers/examples/cors-header-proxy) you can deploy in seconds on CloudFlare workers, to a variety of [hosted CORS proxies](https://nordicapis.com/10-free-to-use-cors-proxies/).

All this seems great, and it sounds like it still protects users from abuse of their credentials or local network like CORS normally does too. Is this still secure? What are the dangers?

## Are CORS proxies secure?

CORS proxies are safe only if you use them very _very_ carefully. There are good reasons to use them, and safe ways to do so, but if you use them wrong you can create a whole world of new security problems.

Let's take a look:

### Free hosted CORS proxies are dangerous

If you want to use a CORS proxy, don't use somebody else's CORS proxy.

The CORS proxy can read and do anything with the full request & response of all traffic through it. While the browser will treat the request as secure (assuming the proxy uses HTTPS) it's only as secure as the proxy itself. If that's run by somebody else, you're giving them complete control of all your interactions with the remote URL.

That means you can't trust the responses unless you 100% trust the proxy, and any private data you send to the proxy is completely available to whoever runs it (which is a GDPR problem, at the very least). This makes them only usable for trivial & static public data even in the best case, so you can never use them for any authenticated API.

If you ever request JavaScript content through the proxy (e.g. from a JSONP API, or just a script file) or anything that could include that (e.g. some HTML you embed in your page) you're now allowing the CORS proxy to run arbitrary JS in your page, to do trivial XSS attacks and read any of your site's client-side data from your users' browsers, all on your own domain.

Because of all this, they're juicy targets for an attacker: if you can compromise a widely used CORS proxy service, you can often compromise every website that uses it for free. Ouch.

All of this is bad. Lastly, on top of all that, hosted CORS proxy services are super unreliable. They're expensive to run, almost always free, prone to abuse & attacks, and (as we'll see next) come with a bunch of their own security risks that aren't always well mitigated.

Even the most famous ones [get shut down eventually](https://github.com/Rob--W/cors-anywhere/issues/301). If you build a production service that depends on somebody else's CORS proxy, it's going to break later on when you least expect it. Don't.

### CORS proxies can leak private state between independent origins

For example, HTTP responses from a server might contain cookies. Normally, these would be stored in your browser and only be available to future requests and pages using the same origin.

Unfortunately, with a CORS proxy, every request through the proxy uses the origin to persist this kind of data: the origin of the proxy (not the origin of the real server).

Here's how this can go wrong:

* You make a request to `a.com` in your web page, through your CORS proxy.
* The response includes a `Set-Cookie` header, which sets a cookie containing some private data or state relevant to that origin.
* The browser treats this as being owned by the CORS proxy origin, not by `a.com`.
* You send a request to `b.com` through the CORS proxy.
* Your browser will now send the cookie for `a.com` to `b.com`, since they're both part of the CORS proxy origin.

The same applies to various other protections, e.g. [basic HTTP authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) which may share the entered username & password with every domain you request through the proxy.

To secure this you need to disable credentials entirely, by ensuring your CORS response never contains an [Access-Control-Allow-Credentials: true](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) header, and you need to drop all cookie headers.

This doesn't necessarily stop you from using authenticated APIs in CORS requests you proxy through your own servers, it just stops you from using built-in browser credentials like cookies. You can still send your own explicit authentication headers if required.

Some of this may be blocked by recent changes in browsers to block 3rd party browser state entirely, to restrict user tracking across websites. These features still include heuristics to allow certain real use cases though, and this won't work reliably for all browsers, so it's better to explicitly lock this down.

### CORS proxies can expose the proxy's local network

CORS protects the end user's local network. If you run your own CORS proxy though, it's very easy to accidentally expose your server's network and infrastructure, so a user can request `https://corsproxy.example/https://10.0.0.1/admin` to make your proxy server make requests and return information from inside your network. In general these are known as [Server-Side Request Forgery attacks](https://hdivsecurity.com/bornsecure/ssrf-what-is-server-side-request-forgery/).

Often this can be a huge problem. As just one example, all EC2 instances have access to a local-only `http://169.254.169.254/latest/meta-data/` endpoint, which returns metadata that by default includes the full credentials for the EC2 instance's IAM role.

I think that's worth reiterating:

**If you host a naive CORS proxy on EC2, external attackers may be able to access private internal resources from your AWS account.**

The default IAM role for EC2 instances doesn't let them access everything, but does provide full read & write access to S3 buckets and your CloudWatch logs. If you've given the instance more privileges, this gets even worse.

Here's a detailed walkthrough of exactly how this attack works, and ways you can mitigate it: https://medium.com/certik/cors-anywhere-the-dangers-of-misconfigured-third-party-software-df232aae144c.

This is just one example of how this can go wrong though. There are often many valuable services running on your network which assume that local network traffic is trusted.

To fix this properly, you need to define a whitelist of valid origins for your CORS proxy, and to only allow requests to be proxied to origins on that list. This list should only contain the external services you're interested in. That ensures your CORS proxy can't be used to scan or access local network addresses or anything else unexpected.

### CORS proxies are easily abused

You don't want to run an open CORS proxy, usable by everybody. If you do, you'll quickly discover other sites proxying traffic through it, attackers using it to send requests whilst hiding their IP, DoS attacks against yourself and others, and all sorts of other problems.

As in the previous point, a good first move is to limit the origins that your proxy can go to. If you do that, most of the abuse risk goes away immediately.

To go further, it's also usually a good idea to check the `Origin` header of the incoming request. If the request comes from a browser, from an origin other than the proxy's own origin, it'll be listed here. If somebody else tries to use the proxy in their website, that website origin will show up here. By limiting this to just allow your own origins you ensure no other pages can use your proxy.

You might still want to allow requests with no origin, if you're using the CORS proxy on the same origin as your own page, e.g. on a subpath. In that case your browser won't send an origin at all, and that's ok.

Lastly, if you're still having issues with abuse, a rate limit linked to the request source IP is a good idea - no individual user should be sending 100s of requests a second through your proxy.

---

I hope that's clarified some of the benefits and risks around CORS proxies. All of this is manageable, and CORS proxies can be very useful, but always make sure you lock them down tightly to allow only the use case you need, block cookies and credentials, and avoid free hosted proxies for any kind of non-trivial deployments.

**If you want to inspect your HTTP traffic, debug CORS requests, and test out mock CORS headers in 5 seconds flat, give [HTTP Toolkit](/javascript/) a try.**

Have questions, or do you think there's other CORS proxy dangers I've missed here? Feel free to get in touch [on Twitter](https://twitter.com/pimterry).