---
title: Cache your CORS, for performance & profit
date: '2021-02-17T17:00'
cover_image: './library.jpg'
---

CORS is a necessity for many APIs, but basic configurations can create a huge number of extra requests, slowing down every browser API client, and sending unnecessary traffic to your backend.

This can be a problem with a traditional API, but becomes a much larger issue with serverless platforms, where your billing is often directly tied to the number of requests received, so this can easily double your API costs.

All of this is unnecessary: it's happening because you don't know how caching works for CORS requests. Let's fix that.

## What are CORS preflight requests?

Before your browser makes any request that crosses origins (e.g. example.com to api.example.com) if it's not a [simple request](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests) then the browser sends a preflight request first, and waits for a successful response before it sends the real request.

This preflight request is an OPTIONS request to the server, describing the request the browser wants to send, and asking permission first. It looks something like:

```
OPTIONS /v1/documents
Host: https://api.example.com
Origin: https://example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: origin, x-requested-with
```

The server has to respond with headers that confirm it's happy to accept the request, and the browser will wait to send the real request until this happens.

If you want to check exactly how these CORS rules work, and how you should respond, play around with [Will it CORS?](/will-it-cors/) to test out the possibilities.

In practice, almost all cross-origin API requests will require these preflight requests, notably including:

* Any request with a JSON or XML body
* Any request including credentials
* Any request that isn't GET, POST or HEAD
* Any exchange that streams the request or response body
* Use of any headers other than `Accept`, `Accept-Language`, `Content-Language` and `Content-Type`

## Why is this bad?

Each of these requests blocks your real request for at least the round-trip time to your server. OPTIONS requests aren't cacheable by default, so your CDN won't usually handle them, and this will have to hit your server every time.

They are cached in clients, but only for 5 seconds by default. If a web page polls your API, making a request every 10 seconds, it'll repeat the preflight check every 10 seconds too.

In many cases this effectively doubles the latency of your API for all browser clients. From the end user's point of view, your performance is halved! And as I'm sure you've heard a hundred times, a few hundred milliseconds of delay translates to big differences in conversion rates & user satisfaction. This is pretty bad.

In addition, it can add meaningful extra load & cost to your API servers.

This applies especially with serverless billing models. Platforms including AWS Lambda, Netlify Functions, Cloudflare Workers and Google Cloud Functions all bill based on the number of function invocations, and these preflight requests count towards that like any other. Serverless can be free when you're small, but becomes more expensive once large production systems are in play, and potentially doubling your costs is a huge hit!

Even without serverless, this can still catch you out badly. If you expect a large percentage of your APIs requests to be handled by your CDN, it can be a major surprise when adding a custom header to browser requests creates an extra request right through to your backend servers for every single client request.

## How can you cache preflight responses?

There two steps of caching you should put in place for these:

* Caching in the browser, so individual clients don't repeat the same preflight request unnecessarily.
* Caching in your CDN layer, where possible, to treat these as constant responses so your backend servers/functions don't have to handle them.

### CORS caching for browsers

To cache CORS responses in browsers, just add this header to your preflight responses:

```
Access-Control-Max-Age: 86400
```

This is a cache time in seconds.

Browser limit this: Firefox caps the value at 86400 (24 hours) while all Chromium-based browsers cap it at 7200 (2 hours). Making this request once every 2 hours instead of before every API request can be a big improvement in user experience though, and setting the value higher to ensure that even longer lifetimes apply where possible is an easy win.

### CORS caching for CDNs

To cache CORS responses in CDNs and other proxies between the browser and your API server, add:

```
Cache-Control: public, max-age=86400
Vary: origin
```

This caches the response in public caches (e.g. CDNs) for 24 hours, which should be enough for most cases without risking cache invalidation becoming a problem. For initial testing, you might want to set the cache time shorter, and increase it once you're happy that everything is set up correctly.

It's important to note that this _isn't_ standard (OPTIONS is defined as not cacheable by default) but it does appear to be widely supported by most CDNs, who will happily cache OPTIONS responses that explicitly opt-in like this. Some may require this to be manually enabled, so do test this in your configuration.

In the worst case, if this is not supported by your CDN it will just be ignored, so there's no real downside.

The `Vary` header here is important: this tells the cache to use this response only for other requests with the same `Origin` header (requests from the same cross-origin source), in addition to using the same URL.

If you don't set a `Vary` header, you can have big problems. Preflight responses often include an `Access-Control-Allow-Origin` header that matches the incoming `Origin` value. If you cache the response without setting `Vary` then the response with one origin might be used for a request with a different origin, which will fail the CORS checks and block the request completely.

If you're using other CORS response headers that depend on the request, you should include them here too, e.g:

```
Access-Control-Allow-Headers: my-custom-header
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Vary: Access-Control-Request-Headers, Access-Control-Request-Method
```

If you want to test any of this this out right now, install **[HTTP Toolkit](/)**, add a rule that matches your requests, launch an intercepted browser, and you can try manually injecting these headers into API responses to see exactly how browsers handle them.

## Configuration examples

How do you configure this in your case? There's some some helpful ready-to-go examples below. In each case, I'm assuming you already have preflight CORS handling set up, so we're just thinking about how to add caching on top of this.

### Caching CORS with AWS Lambda

To enable CORS with AWS Lambda, you can either manually return the headers above in your HTTP response, or you can [configure API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) to handle CORS for you.

If you use API Gateway's configuration, this allows you to configure the `Access-Control-Max-Age` header, but will not set `Cache-Control` by default, so if you're using CloudFront or another CDN, you should manually configure that and `Vary` too.

Alternatively, you can control this all yourself in a preflight lambda handler, like so:

```javascript
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            // Keep your existing CORS headers:
            "Access-Control-Allow-Origin": event.headers['origin'],
            // ...

            // And add these:
            "Access-Control-Max-Age": 86400,
            "Cache-Control": "public, max-age=86400",
            "Vary": "origin"
        }
    };

    return response;
};
```

CloudFront specifically includes [separate configuration](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CachedMethods.html) that enables caching for OPTIONS responses, so you should ensure this is enabled if you're using `Cache-Control` here.

If you're using the [Serverless framework](https://www.serverless.com), you can do this automatically in your `serverless.yml` instead, for example:

```yaml
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
          cors:
            origin: '*'
            maxAge: 86400
            cacheControl: 'public, max-age=86400'
```

### Caching CORS in Node.js

If you're using Express, Connect, or a framework based on them, then you're probably using the [cors](https://www.npmjs.com/package/cors) module to handle CORS.

By default this doesn't enable any kind of caching at all, but you can configure `Access-Control-Max-Age` by passing a `maxAge` value.

You can't easily configure `Cache-Control`, so if you're using a CDN you probably want to do something slightly more complicated:

```javascript
app.use(cors({
    // Set the browser cache time for preflight responses
    maxAge: 86400,
    preflightContinue: true // Allow us to manually add to preflights
}));

// Add cache-control to preflight responses in a separate middleware:
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Cache-Control', 'public, max-age=86400');
        // No Vary required: cors sets it already set automatically
        res.end();
    } else {
        next();
    }
});
```

### Caching CORS in Python

Django's [django-cors-headers](https://pypi.org/project/django-cors-headers/) module includes a reasonable default of 86400 as its `Access-Control-Max-Age` value.

Meanwhile Flask's [Flask-Cors](https://pypi.org/project/Flask-Cors/) module enables no caching at all by default, but it can be enabled by passing `max_age=86400` as an option in your existing configuration

With that, you can ensure that browser properly cache these responses. If you want CDN caching too then you'll need to manually configure `Cache-Control`. Unfortunately, as far as I can tell, neither module supports custom configuration or an easy workaround for this, so if CDN caching is important to you then you'll probably need to manually handle preflight requests, or wrap these modules yourself.

### Caching CORS with Java Spring

With Spring, you're probably already using the `@CrossOrigin` annotation to handle CORS requests.

By default Spring will set a 30 minutes `Access-Control-Max-Age` header with this, adding relatively short caching in each individual browser, but won't set a `Cache-Control` header.

I'd suggest you increase the max age to 24 hours (86400 seconds, the maximum used by any browser) by setting the `maxAge` option, and also add the `Cache-Control` header if you're using a CDN. Spring's built-in CORS configuration doesn't have support for doing the latter automatically, but you can easily add the header yourself using a response filter:

```java
@Component
public class AddPreflightCacheControlWebFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        if (CorsUtils.isPreFlightRequest(exchange.getRequest())) {
            exchange.getResponse()
                .getHeaders()
                .add("Cache-Control", "public, max-age=86400");
        }
        return chain.filter(exchange);
    }
}
```

---

I hope this helps improve your CORS performance and reduce your API traffic! Have thoughts or questions? Feel free to in touch on [Twitter](https://twitter.com/pimterry) or [directly](/contact/).

**Debugging APIs and want to inspect, rewrite & mock live traffic? Try out [HTTP Toolkit](https://httptoolkit.com/javascript/) right now. Open-source one-click HTTP(S) interception & debugging for web, Android, servers & more.**