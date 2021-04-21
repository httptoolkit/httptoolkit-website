---
title: Fixing DNS in Node.js
date: '2021-02-17T16:00'
cover_image: './forest-look-up.jpg'
---

DNS is one of those invisible technologies that you use every day, but which works so well that you can conveniently ignore it.

That is until it breaks completely, or slows your application down to a crawl, or you want to resolve something unusual, and then you're in a world of trouble.

Unfortunately, DNS in Node.js isn't implemented quite as you might have hoped, and includes some gotchas that can create some of these problems for you, when you least expect it. If you're a node developer, it's worth understanding how it works in detail, so you can understand what your code is really doing, and boost your application performance & reliability.

## Why is Node.js DNS problematic?

DNS is how you turn domain names (example.com) into IP addresses (93.184.216.34). That sounds easy, but there's a whole world of complexity in here.

Critically, this is something that most modern applications do _a lot_, every time you make an HTTP request or any other network request to a machine, on the internet and often within your internal infrastructure too.

In node specifically this can go wrong in quite a few ways, because:

* DNS requests in node appear asynchronous, but they're actually internally implemented as synchronous calls within node's internal libuv threadpool (which by default has only 4 threads). That means if you do >4 DNS lookups in parallel then you're going to block the libuv threadpool, even though they look like async IO. This will block every other DNS lookup, and also unrelated file IO and various crypto APIs, creating some extremely confusing performance problems.
* Node itself doesn't do any DNS caching at all. All of that is delegated to the OS, out of your control, and every DNS lookup must go to the OS every time.
* DNS lookups aren't free. If you're frequently making requests to a wide variety of different hostnames or hostnames with a short TTL (e.g. if you support webhooks, if you're building a monitoring tool, or if you're polling URLs elsewhere) then you may quickly find you're spending a substantial amount of your network time on endless DNS queries.
* When your DNS server goes down, all your outgoing requests will fail (eventually, once some invisible OS caching runs out) in an exciting new way that you haven't seen or tested before.
* When your DNS server gets slow, eventually all your outgoing requests will become inexplicably slow, even while your connection appears to be working otherwise fine.

Because DNS is taken out of your hands in most cases, when this goes wrong it goes _really_ wrong. Do you know whose DNS servers you're using in production, or how you'd change them? If not, it's going to be pretty hard to work around issues or even to check the status of those servers to confirm whether any of the above issues are your problem or theirs. Not fun.

This isn't theoretical. At Zalando they [hit mysterious HTTP timeout errors](https://shuheikagawa.com/blog/2019/04/30/dns-polling/) that broke their internal API requests, which they eventually traced to node's DNS implementation failing to handle certain AWS configurations. Meanwhile Phabricator reconfigured their infrastructure to use raw IP addresses just to avoid node DNS issues, before eventually [implementing an in-memory cache](https://phabricator.wikimedia.org/T158338), and Yahoo [implemented](https://github.com/yahoo/dnscache) their own DNS caching module to try and improve node's DNS performance.

It would be great to avoid these issues. It's useful to at least have the option to take control over your DNS, to manage these risks, and give yourself visibility into a system that's involved in every single network request you make.

## How does Node's DNS work?

Node's [dns module](https://nodejs.org/api/dns.html) is where all the magic happens. Internally, this is used by the `http` module and everywhere else, anywhere that node needs to translate a name into an IP address.

This defines a wide variety of useful methods, including `dns.setServers` to change the configured DNS servers, `dns.resolveAny` to look up all records for a hostname, and `dns.reverse` to look up a hostname from an IP address, and lots more. In addition, it exposes a Resolver class that you can use to encapsulate custom DNS configuration, and constants for all the various error codes & DNS lookup flags you might be interested in for these queries.

Surprisingly though, when node uses the `dns` module itself, it doesn't use any of this.

Instead, when node does DNS it only uses the weird `dns.lookup` function, which acts completely differently to everything else here, and ignores every DNS setting you might configure in your application. Excellent.

### What's up with dns.lookup?

This is the key behind the 'default' node.js behaviour above. Rather than making DNS lookups explicitly, as `dns.resolve*` etc do, `dns.lookup` calls the synchronous `getaddrinfo` function from libc, which always uses the OS's own configuration and hostname resolution mechanisms.

This has a few important effects. This function:

* completely ignores any servers you might have configured with `dns.setServers`.
* can lookup things that aren't technically DNS, including names in your hosts file, `localhost`, and mDNS/Bonjour hosts on your local network.
* is synchronous, and just simulates asynchronous behaviour from a JS point of view by blocking one of the internal libuv threads.
* doesn't cache anything: it calls through to `getaddrinfo` to look up the name from scratch every. single. time.

This usually works fine as a default, and it's a good option for ensuring you can resolve any possible hostname, but in production it can fail & create performance problems in all sorts of fun ways.

## How do you change Node's DNS?

You can reconfigure the DNS mechanism used by any socket by passing the `lookup` option, with a replacement function that has the same signature as `dns.lookup`.

This works for `net.Socket`, for `http.request` and `http.get`, and everything else similar. Like so:

```javascript
http.get("http://example.com", {
    lookup: myCustomLookupFunction
});
```

That function will be called instead of `dns.lookup` during this HTTP request to look up the `example.com` hostname.

So it's easy to change the lookup function. What should we change it to?

## Building a better DNS configuration

There's two key things we can do to improve on Node's defaults:

* We should cache all lookups in memory in node (according to the DNS record's TTL) so that we don't block libuv and (so far as possible) our application doesn't unnecessarily wait for DNS resolutions elsewhere.
* We should configure reliable & fast DNS servers, to improve performance, and make us more resilient to any individual DNS failure.

You could even go further with this, and add custom logic to our DNS resolution to do more exciting & wild things. It's just a function, you can resolve things however you like! For example, **[HTTP Toolkit](https://httptoolkit.tech/javascript/)**'s upcoming automatic Docker interception reconfigures its DNS so that it can resolve traffic between docker container network aliases automatically, from a node process running entirely outside docker (yes, building that is the original reason I started down this whole rabbit hole).

This is powerful, and there's a whole world of resolution games available with custom `lookup` functions, for everything from unusual service discovery approaches to monitoring & measuring your DNS queries.

For now though, let's focus on the immediately practical improvements.

## Caching & configuring DNS in Node.js

To add caching & configure custom servers, there's a few different options. I'd strongly suggest you _don't_ write your own, and you pick up a module off the shelf.

Personally, I think a good option is [cacheable-lookup](https://www.npmjs.com/package/cacheable-lookup). This is part of [Got](https://www.npmjs.com/package/got), a popular HTTP client from Sindre Sorhus. It supports caching, which observes the DNS TTL plus a configurable maximum cache time, it supports configurable error caching too, it supports custom DNS servers, it (optionally) supports fallback to `dns.lookup` for domains that can't be resolved via real DNS like `localhost` et al, it's all asynchronous, and it's super easy to use.

Setting that up looks like this:

```javascript
const http = require('http');
const CacheableLookup = require('cacheable-lookup');
const cacheable = new CacheableLookup({
    // Set any custom options here
});
cacheable.servers = [
    // Put your DNS servers of choice here
];

// Configure this to be used by a single request:
http.get("http://example.com", {
    lookup: cacheable.lookup
});

// Or configure this as the default for all requests:
cacheable.install(http.globalAgent);
```

If you'd like to add DNS servers, rather than replacing the default DNS configuration (i.e. node's own default DNS servers), then you can use `cachable.servers.push(...)` instead.

When multiple servers are configured, subsequent servers are queried only when the first server is inaccessible or fail to respond correctly. They're not used if the first server explicitly returns a `NOTFOUND` response.

For all hostnames that can't be resolved by these servers (for any reason at all) by default cacheable-lookup will then fall back to `dns.lookup`, and cache that result as normal. This is really useful for apps like **[HTTP Toolkit](https://httptoolkit.tech/javascript/)** that are heavily used by developers, and so are often used with local servers and unusual network configurations, but it might not be applicable in other cases.

If you frequently make requests to domains that don't resolve then this extra step could create its own performance problems, so if you don't need this for your case then you can disable it by passing a `lookup: false` option.

## When should you _not_ do this?

Don't follow these suggestions blindly! This applies to all posts about performance on the internet. Don't make performance improvements without testing that they really improve real performance in your application specifically.

Whether these changes are helpful depends a lot on your specific system, and the pattern of DNS lookups your application is making. Test it!

In general even if this doesn't help it won't hurt, except for three specific cases:

* If it's very important that you share your DNS cache with the rest of the OS, rather than caching lookups just in your node process. This may be affect performance in some process cluster scenarios (but, again, test it!).
* If a major percentage of your DNS lookups are not really domain names: e.g. `localhost`, mDNS names, or host file mappings. In that case you're going to end up doing `dns.lookup` to resolve this in the end anyway, so making separate DNS requests elsewhere first may be unhelpful.
* If a major percentage of your DNS lookups don't resolve. In that case this will work, but you probably want to disable `dns.lookup` fallback entirely by passing `lookup: false` to cacheable-lookup.

---

Hopefully that's a useful way to quickly improve the performance & reliability of your node network requests. Have any thoughts or questions? Feel free to in touch on [Twitter](https://twitter.com/pimterry) or [directly](/contact).

**Debugging APIs or HTTP clients, and want to inspect, rewrite & mock live traffic? Try out [HTTP Toolkit](https://httptoolkit.tech/javascript/) right now. Open-source one-click HTTP(S) interception & debugging for web, Android, servers & more.**