---
title: 'What is X-Forwarded-For All About?'
date: '2024-01-03T15:26'
# cover_image: './header-images/notepad.jpg'
author: Phil Sturgeon
authorUrl: https://philsturgeon.com/
---

The X-Forwarded-For (XFF) HTTP header serves a crucial role in providing insight into the origin of web requests. The header works as a mechanism for conveying the original source IP addresses of clients, and not just one client, but multiple. This list of IPv4 and IPv6 addresses is handy in scenarios where requests traverse several servers, proxies, or load balancers.

A typical HTTP request goes on a bit of a journey, traversing multiple layers of infrastructure before reaching its destination. Without the `X-Forwarded-For` header, the receiving server would only see the IP address of the last intermediary in the chain, rather than the true client origin. 

<mermaid-js>
sequenceDiagram
    actor Client as Client
    participant CDN as CDN
    participant LB as Load Balancer
    participant B as Backend App X
    Client->>CDN: 28.178.124.142
    CDN->>LB: 198.40.10.101
    LB->>B: 198.40.10.102
</mermaid-js>

By the time the backend application is seeing an incoming request the IP address of the original client is long forgotten. This is where `X-Forwarded-For` can help out.

```http
X-Forwarded-For: 28.178.124.142, 198.40.10.101
```

The goal here is to give a proxy the chance to say "Alright hang on, I'm forwarding you a request, and this the history of where it came from as far as I know". The proxy will not add its own IP address to the list, because if the receiver of that request cares about who is calling it they can combine the `X-Forwarded-For` with the requests source IP address, e.g.: `req.connection.remoteAddress` in NodeJS. So in this example, the load balancer has said "Hey backend app, I am forwarding you a request that came from this client via the CDN, but it does not pop its own IP in there because the backend app can tell if it's coming from the load balancer or not. 

## What is X-Forwarded-For Used For?

This has a whole load of use cases depending on what you're building.

- **User Authentication:** Use the header information to ensure that login attempts originate from recognized and authorized locations, and flag the login as suspect if not, triggering 2FA check.

- **Load Balancing:** Evenly distribute incoming traffic across servers, to ensure optimal performance during busy periods.

- **Data localization:** European Union, Brazil, and China all have privacy laws about keeping data within their zones, and this can help identify those users who need special treatment.

- **Geographic Content Delivery:** CDNs use `X-Forwarded-For` to determine the user's location and serve content from the nearest server to reduce latency.

- **Access Control and Security:** Websites use `X-Forwarded-For` to verify the legitimacy of requests and implement access controls based on IP addresses, like a corporate intranet that only allows access to certain resources for employees coming from recognized office IP ranges.

- **Web Application Firewalls (WAF):** Filter incoming traffic, blocking suspicious requests from a known malicious IP address listed in `X-Forwarded-For`.

- **Fraud Prevention:** Financial institutions use `X-Forwarded-For` to detect and prevent fraudulent activities based on user location, e.g. identifying an unusual login attempt from a location that is inconsistent with the user's typical access patterns.

- **API Rate Limiting:** APIs use `X-Forwarded-For` to enforce rate limiting on a per-client basis. An API provider limits the number of requests from a specific IP address within a given time frame to prevent abuse.

- **Localized Advertising:** Ad platforms use `X-Forwarded-For` to customize and target ads based on the user's geographical location.

- **Logging and Analytics:** log to analyze user traffic patterns and behaviors for statistical purposes, like the geographical distribution of users over a specific time period.

We're talking about security here, but this is a HTTP Request header... so can it not just be completely faked? Is the whole Internet built on a lie?! 

## Can You Trust X-Forwarded-For?  

You should never trust anything in a HTTP request that is coming from the outside world. Actors can be malicious or misconfigured, but either way the contents of a HTTP request can be completely made up, and somebody could use `X-Forwarded-For` to pretend they're coming from inside your corporate VPN once they know the IP, pretend they're in the same geographic region as a user who's bank account they're trying to log into, or all sorts of other shenanigans. 

One way to add some control to the `X-Forwarded-For` header is to involve a trusted reverse proxy, and disable direct access to the other proxies/servers/load balancers other than through that proxy. For API developers this might be an API Gateway, but it could also be a CDN like Fastly, Squid Proxy, Cloudflare, etc. If the request is coming through here, assuming that reverse proxy hasn't been hacked, you're probably ok to believe at least some of the IP chain you're seeing. But how?

The further left you look in the field the more room there is for mistakes, as there are more servers which could be misconfigured, and anything that's coming from beyond the left most proxy you control should be treated with suspicion. 

You can make decisions at the reverse proxy level that change how the field is constructed. For example, nginx can set/override the `X-Forwarded-For` header completely, ditching whatever the client provides, and replacing it with the IP address it is seeing.

```
proxy_set_header X-Forwarded-For $remote_addr;
```

Say the client (IP 28.178.124.142) is trying to hide their IP address, or pretend to be somebody else, the request value would be replaced with the actual IP address of the network actor as seen by that server, not just blindly accepting whatever they've said their IP is.

<mermaid-js>
sequenceDiagram
    actor Client as Client<br>IP 28.178.124
    participant CDN as CDN<br>IP 198.40.10.101
    participant LB as Load Balancer<br>IP 198.40.10.102
    participant B as Backend App X
    Client->>CDN: X-Forwarded-For<br>1.1.1.1
    CDN->>LB: X-Forwarded-For<br>28.178.124.142
    LB->>B: X-Forwarded-For<br>28.178.124.142 ,198.40.10.101
</mermaid-js>

This is the safest approach for when you're not sure how securely and reliably the rest of your call chain is going to be. If other proxies and backend apps are likely to blindly trust the incoming information, or generally make insecure choices (which we'll get into more later) then it's probably safest to completely replace the `X-Forwarded-For` header at that outside-world facing reverse proxy, and ditch any untrustworthy data in the process.  

If you're confident the backend app is able to handle it, you can take whatever they provide, and simply append the IP address being seen by the server on the end of the chain.

```
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

This is a special bit of functionality in nginx, but most reverse proxies will have similar logic. It will build up the header to maintain whatever the client initially passed, and if they are connecting through any intermediary proxies, so long as those proxies support `X-Forwarded-For`, then that information will be passed along too.

<mermaid-js>
sequenceDiagram
    actor Client as Client<br>IP 28.178.124
    participant CDN as CDN<br>IP 198.40.10.101
    participant LB as Load Balancer<br>IP 198.40.10.102
    participant B as Backend App X <br>IP 198.40.10.103
    Client->>CDN: X-Forwarded-For<br>1.2.3.4
    CDN->>LB: X-Forwarded-For<br>1.2.3.4,28.178.124.142
    LB->>B: X-Forwarded-For<br>1.2.3.4,28.178.124.142,198.40.10.101
</mermaid-js>

This means you've got the whole chain of everything that is reported to you, for good or bad, and you need to hope everyone using it knows there can be a fair few problems with this data.

### Invalid IP Addresses

First of all there's no reason to assume everything in there will be a valid IP address. 

At the most basic, an invalid IP address might trigger a 500 Internal Server Error, and that could be a source of DDoS attacks. 

Slightly worse would be blindly exploding on a `,` and sending it off to various other services (like an API call) then all sorts of unexpected things could happen.

### Arbitrary Code Execution

Beyond invalid, or faked, there could be literal malicious code in there. 

If a bad actor knew (or guessed) the programming language and logging frameworks being used, and that logging system does not sanitize/escape input, or has a bug that allows code to be executed in the logger, then somebody could be running random code on your server.

This has been known to happen ([CVE-2021-44228 a.k.a. "Log4Shell”](https://blog.shiftleft.io/log4shell-apache-log4j-remote-code-execution-4f58ed7e74f9)).

```nohighlight
X-Forwarded-For: 1.2.3.4,nonsense,${mailicious()},2.2.2.2,28.178.124.142,198.40.10.101
```

Any logic using this field should ignore anything that is not a valid IP address, and beyond that it needs to do some basic checks before logging it to a database, like checking the length of string so you're not filling up your DB with trash and potentially making other DDoS and resource management issues.

See [OWASP A03:2021 – Injection](https://owasp.org/Top10/A03_2021-Injection/) and [OWASP API4:2023 - Unrestricted Resource Consumption](https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/) for more on what can go wrong there.

Whichever approach you pick for the client-facing proxy, make sure every other server in the chain is not directly accessible, or you'll not ever be able to trust any of it.

## Picking the right IP

You might be looking at that list of IPs wondering "which is THE client IP". The answer is "Reading right to left, it's first IP address that is not one of yours". When it comes to logging you want to log all of them (escaped and limited), but when it comes to security based use cases there is only one "client IP" you can trust: the one immediately to the left of the last known private/internal IP address, as in, the last "not one of ours" server that's valid, and not internal.

So if we got a request like this, which one do we use for security checks or geolocation?

```nohighlight
X-Forwarded-For:1.2.3.4,172.16.1.101,28.178.124.142,198.40.10.101
```

There are two common approaches.

### 1.) Picking by Trusted Proxy List

One approach is to look at the specific IPs and see if they are recognized, going from the right until you see an IP you don't recognize. 

- `198.40.10.101` would be flagged as one of yours buy the same list.
- `28.178.124.142`. Not one of yours? Not invalid? Not internal? Great, that's the client, and it looks like they're in Ohio, USA. Serve them content from the American servers, and no data protection required because they don't care about privacy laws.

One mistake would be to see for the first to the left of all internal IPs, because that might notice `172.16.1.101` which is an [internal IP according to IANA](https://www.lifewire.com/what-is-a-private-ip-address-2625970). Yes, it is internal, but it's not a known and trusted internal IP you control. That has been reported to you in the HTTP request, possibly for valid reasons (the client is using some sort of intermediary server), or possibly malicious reasons (they want you to think their real IP address is `1.2.3.4` and hoped that would trick you).

That can be a pretty complicated approach and requires the backend to know quite a lot about the infrastructure involved, and might be even harder in a cloud environment where IPs might be changing a lot, but it's doable.

### 2.) Picking by Trusted Proxy Count

Instead of looking at the specific IPs, the number of trusted proxies between the internet and the backend server is configured. 

The `X-Forwarded-For` IP list is searched from the rightmost by that count minus one. 

<mermaid-js>
flowchart LR
    A(Client) --> B(CDN)
    B --> C(Load Balancer)
    C --> D[Backend App]
</mermaid-js>


```nohighlight
X-Forwarded-For:1.2.3.4,172.16.1.101,28.178.124.142,198.40.10.101
```

Seeing as the IP address of the backend is not in X-Forwarded-For, it is not included in the count, so we're going to look at how many proxies are to the left before we get to the outside Internet.

1. `198.40.10.102` - Load Balancer
2. `198.40.10.101` - CDN
3. `28.178.124.142` - Client IP

Here the trusted proxy count would be 2, and that can be popped into configuration somewhere. The backend app can split those 2 off IPs off, and the next one will be the client IP address.

```javascript
const headers = {
  "X-Forwarded-For": "1.2.3.4,172.16.1.101,28.178.124.142,198.40.10.101,198.40.10.102"
}

const config = { 
  trusted_proxy_count: 2 
}

const clientIp = headers["X-Forwarded-For"]
	// Split the string into multiple parts
	.split(',')
	// If the count is 2, we want the 3rd from the end,
	// which means flipping to negative and subtracting one more
	// then grabbing the first item in the list with [0]
	.slice(-1 - config.trusted_proxy_count)[0]);
	
console.log(clientIp) // "28.178.124.142"
```


Basically if there are three reverse proxies, the last two IP addresses will be internal.

If your infrastructure is simple and there is only one reverse proxy, that proxy will add the client's IP address, so the rightmost address can be used. 

## Alternatives & Standards

`X-Forwarded-For` is not part of any current specification, it's a convention implemented by various bits of software and services in a similar way, but has not been standardized by anyone like the IETF.

The IETF folks deprecating X- headers since [RFC 6648: Deprecating the "X-" Prefix and Similar Constructs](https://datatracker.ietf.org/doc/html/rfc6648) in 2012, and if you're interested in why Mark Nottingham gives great backstory on this in *[Stop it with the X- Already! (2009)](https://www.mnot.net/blog/2009/02/18/x-)*. In part the effort to standardize common X- extensions is down to a single specification making implementations more reliable, but in practice its also because the convention that was first imagined is often overly simplistic, missing important use-cases not thought of when first conceived. 

### Forwarded Header

Whilst the `X-Forwarded-For` is popular, and generally doesn't suffer from compatibility issues, there's room for making it better, and that takes the form of the `Forwarded` header defined by [RFC 7239: Forwarded HTTP Extension](https://datatracker.ietf.org/doc/html/rfc7239) finalized in 2014.

```
Forwarded: for=192.0.2.60;proto=http;by=203.0.113.43
```

It's really similar to `X-Forwarded-For`, but also incorporates functionality from `X-Forwarded-Proto` which helps define the protocols (HTTP or HTTPS) used in the chain instead of the IP. By combining `-For` and `-Proto` into a single header there's less room for confusion stitching things together.

```
X-Forwarded-For: 192.0.2.172
Forwarded: for=192.0.2.172

X-Forwarded-For: 192.0.2.43, 2001:db8:cafe::17
Forwarded: for=192.0.2.43, for="[2001:db8:cafe::17]"
```

_Examples from [MDN Web Docs: HTTP > HTTP headers > Forwarded](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded)._

Whether you should use `X-Forwarded-For` or `Forwarded` version can be a tricky question. 

Does all the tooling in your infrastructure support it? Probably, but you'll want to check.

Does it matter for any practical reason when you can just use `X-Forwarded-For` or is this just vibes and "being proper"? Well, it has one major benefit that might make it worth the effort of checking compatibility: Forwarded has extensibility. 

With `X-Forwarded-For`, you have to figure out which IP address is the client IP with hardcoded rules such as “take the 3rd last IP address”. Whether you're using lists or counts, it's not just a faff, it's subject to change as your infrastructure evolves. 

With `Forwarded`, [as nginx suggest](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/), your trusted client-facing proxy could include a secret token to identify itself:

```
Forwarded: for=12.34.56.78, for=23.45.67.89;secret=egah2CGj55fSJFs, for=10.1.2.3
```

That seems like a pretty solid reason to consider using the standard version.

## Via Header

There is another similar HTTP header: `Via`, defined in RFC 9110 and finalized in 2022. This header has more of a focus on the protocol (HTTP or HTTPS) and the version (`HTTP/1.1 proxy.example.re, 1.1 edge_1`). This information is intended to help figure out if connection has been downgraded at any point, whether that's from HTTP/2 to 1.1, or from HTTPS to HTTP. 

As it also adds the hostname of proxy, and some optional information about the specific product and version of the proxy, it may seem pretty similar for `X-Fowarded-For` and `Forwarded`, but the `Via` header is more for information/debugging or identifying and working around buggy proxies.

## Summary

Now you know what X-Forwarded-For and Forwared are for, and can leverage that knowledge to do some handy stuff if you like. Maybe that's targeted advertisements, but maybe it's something more meaningful like serving content from the closest server to [reduce the carbon impact of your data transmission](https://learn.greensoftware.foundation/introduction), or using it as an extra data point in flagging scammers trying to access to your users accounts.

Use these powers wisely, and don't sneak them in at the infrastructure changes without talking to the backend developers managing the systems this could effect. 

## Further Reading

- [RFC 7239: Forwarded HTTP Extension](https://datatracker.ietf.org/doc/html/rfc7239)
- [MDN Web Docs: X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)
- [MDN Web Docs: Forwarded](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded)
- [Using Forwarded in NGINX](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)
- [Cloudflare Fundamentals: HTTP request headers](https://developers.cloudflare.com/fundamentals/reference/http-request-headers/)
