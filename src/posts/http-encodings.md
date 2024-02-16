---
title: 'Encoding your HTTP for fun and profit'
date: '2021-06-10T14:00'
cover_image: './header-images/messy-boxes.jpg'
tags: http, performance
---

HTTP content encoding is an incredibly powerful tool that can save you huge amounts of bandwidth and make your web or mobile application faster, basically for free.

Unfortunately, it's poorly understood by most developers. There's a lot of power here, but few people are aware of the options or what "content encoding" really means, so it's mostly left to be handled automatically (for better or worse) by your web server.

In many cases that means no encoding at all. In some helpful cases (typically CDNs or static site PaaS hosts) a useful basic default will be provided, but those defaults are rarely the best choice for every situation.

With just a tiny sprinkle of knowledge, you can enable this and speed up your web application, your API, and all your HTTP requests & responses in no time at all.

## What is content encoding?

Content encoding is the wrapper around the meaningful body of an HTTP request or response.

It is not the type of the content - that's something else entirely. This is a common mistake!

For example, you might have a response that contains JSON data, encoded with gzip. In that case, you'd use HTTP headers like:

```
Content-Encoding: gzip
Content-Type: application/json
```

This tells the HTTP client that it needs to unwrap the content using gzip, and then it's going find some JSON inside. That's the best way to think of it: if you receive a request or response with a `content-encoding` header, then you should undo that content encoding (e.g. un-gzip the body) and then you'll find content that matches the `content-type` header.

The main use for this by a very long way is compression: there's a variety of different compression algorithms you can use to shrink your request and response bodies dramatically. You could also use it to describe a layer of encryption around the content though (for unusual environments where HTTPS isn't sufficient/possible) or to send content encoded in a format that's more easily compatible with other infrastructure (encoding it as base64 rather than raw binary data, for example).

It's important not to confuse this with [transfer-encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding) which is used to describe encodings at a hop-by-hop level (e.g. between a client and a proxy, not the final server). You can mostly ignore this. It's rarely used as far as I can tell except for 'chunked' encoding, which is very widely used to send data without specifying the length in advance. It's effectively independent of compression or other content transformation, and you can forget about it unless you're streaming data back and forth in HTTP.

Lastly, for bonus fun, in some places you'll see a [content-transfer-encoding](https://stackoverflow.com/a/7289434/68051) header. Some people try to use this in HTTP - it was a MIME header for email, made obsolete in 1996, which is designed to describe how content should be encoded in an email-safe format. It's not relevant to HTTP, unless maybe you're delivering HTTP requests and responses via email? Avoid.

## Why should I encode my content?

Content encoding is mostly used to compress request and response data. If you do this, you can shrink all your requests and responses enormously. In practice, you're often looking at reductions on the order of 70% for many typical responses, and up to 95% for very compressible data like JSON API responses. These are huge bandwidth savings!

**Smaller requests means faster data transfer, fewer bandwidth costs for your servers, and lower data costs for clients with limited data plans.**

In most cases, compressing your HTTP requests & responses is an easy win for everybody. It happens automatically in many CDNs but elsewhere it's largely forgotten by many developers, unnecessarily increasing the amount of data they transfer by a huge amount.

As an example, OYO Rooms [reduced their latency by 37%](https://tech.oyorooms.com/how-brotli-compression-gave-us-37-latency-improvement-14d41e50fee4) and Google Play [reduced bandwidth usage by 1.5 petabytes per day](https://students.googleblog.com/2017/02/intern-impact-brotli-compression-for.html) (!) by changing their content encoding configurations.

That said, there are some good reasons not to compress an HTTP message body:

* If the body is very very small it doesn't help much, and below about 150 bytes you risk making the content larger than it was before (although only ever so slightly).
* If the content is a format that itself already includes compression, then more compression doesn't usually help. This applies to many image and video formats and PDF files.
* If bandwidth is much cheaper than processing power, e.g. in some IoT environments with very dumb hardware decompression time can be larger than transfer time.
* If you don't know if it's supported. All modern browsers and HTTP clients will support compressed content in some form though, and you can detect this automatically using the [Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) header in incoming requests.

If you're building a mobile or web app, these conditions don't apply for most of your content, especially for HTML, JavaScript, CSS, your API requests & responses, and any other human-readable or structured data. You probably want to encode basically everything except images & video (in most cases - e.g. SVGs usually compress great).

How would you like to make all your HTTP requests and responses 70% smaller?

## What HTTP content encodings can I use?

The first question before you can start using content encoding is to decide which encoding to use.

The encoding of choice depends on the context, especially the client and server involved, since both have to support the encoding. Helpfully, clients advertise the encodings they support with every request in a [Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) header, so you can use that to detect this automatically.

The official registry of encodings is [here](https://www.iana.org/assignments/http-parameters/http-parameters.xhtml#content-coding). Most encodings there are pretty rarely used or outdated though, so the common and interesting content-encoding values you might care about:

* `identity` - an encoded body, it's just raw content. Valid, but you might as well just omit the header entirely.
* `gzip` - the standard: the content is compressed using [gzip](https://en.wikipedia.org/wiki/Gzip), widely used & supported almost everywhere.
* `br` - the new kid: the content is compressed using [Brotli](https://en.wikipedia.org/wiki/Brotli), a new (well, 2013) compression algorithm originally used in WOFF font files. Supported in [most browsers](https://caniuse.com/brotli) for a couple of years now, and [significantly more powerful](https://tech.oyorooms.com/how-brotli-compression-gave-us-37-latency-improvement-14d41e50fee4) than gzip.
* `zstd` - the very very new kid: the content is compressed using [Zstandard](https://en.wikipedia.org/wiki/Zstandard), a compression algorithm from Facebook designed to compress better than gzip, but also especially focused on allowing much much faster decompression (at least 3.5x faster than Brotli or Gzip, according to their benchmarks). Only standardized in 2018 and not widely supported at all, yet...

**In most cases, you should use Brotli if you can, and gzip when you can't.** Zstd looks very promising, but it's still too early and unsupported for most use cases.

You can also combine these if you want (although it's unusual). For example a content-encoding header like `content-encoding: gzip, brotli` means that the content was gzipped, and then brotlied. This is a weird thing to do, and it's usually a bad idea, but it's an option.

You're not strictly limited to the official list though. It's encouraged, and it's useful to stick with those if you want easy support from existing tools and clients, but if you have your own specific content wrapper format then you can use that instead. Try to use a unique name that's not going to conflict in future, and remember that this is a content _wrapper_ format, it's not the format of your content itself. And if you use a content-encoding that you think might be useful for others, do consider registering it officially!

All of this sounds simple enough once you get the idea, but lots of people did not read this helpful article. You'll see quite a few totally wrong content-encoding values used in the wild, for example:

* `amz-1.0` - only used in some [AWS APIs](https://docs.amazonaws.cn/en_us/AmazonCloudWatch/latest/APIReference/making-api-requests.html). There's no wrapper here, it's just plain JSON, so why is this required?
* `json` - JSON is a content type! It's not a wrapper that you open to get to the real content (how would you 'decode' JSON to get the real data within, without any more information?) A JSON body is content itself.
* `utf-8` - This is a charset, not a content wrapper. If you want to specify it, put it in your content-type, like `content-type: application/json; charset=utf-8`.
* `text` - What? How you unwrap text to get at real content?
* `binary` - Sigh.

All of these are content-encoding values I've seen in real world traffic. All of them are wrong. Don't be that person.

## Where's my profit?

OK, that makes sense, but you want some useful info that's going to make your life better. How should you use this?

### Supporting content-encoding on the server

First, check if your site or API already uses an encoding for responses. The easiest way is to make a request that offers every encoding, and look for a `content-encoding` header in the response to see what's supported.

For example, with cURL:

```
curl -I -H"Accept-Encoding: gzip, br, zstd" https://example.com | grep -i content-encoding
```

(Some poorly behaved servers might not handle multiple values, in which case you can test with a separate request for each one).

If you already support Brotli, that's great! For modern browsers and servers that's generally the right choice. You might want to look into Zstd, if you control both the server & client (e.g. for mobile apps), but that will require more work since most tools don't support it automatically.

If you're using gzip, you should probably investigate Brotli. There's easily available libraries for every server under the sun, so you can normally drop it in and go for substantial improvements with clients that support it (e.g. every modern web browser). This will depend on your data and use case though, so make sure you test the differences here.

If you're not using any compression at all for some of your responses, you should be able to get huge improvements with minimal effort by enabling at least gzip on your server. This is often an standard option or module you just need to enable in your server.

On top of that, you may want to support compressed requests too, not just responses. If you're accepting large compressible uploads (>1KB, not just images/video) then compression can make a big difference. That's rarely supported automatically so you'll need to check how this works in your framework and/or server of choice, and potentially write a small middleware wrapper to check the content-encoding of incoming requests and handle this.

Lastly, if you're caching these responses, don't forget to include `Accept-Encoding` in your `Vary` header. This ensures that you won't cache encoded content in one encoding and return it to clients asking for a different encoding.

### Supporting content-encoding in clients

#### In the browser:

For response content, there's nothing required - browsers will automatically set `Accept-Encoding` and decode content for you in every format they support. You could manually decode unusual encodings, like zstd, but it's rarely worthwhile.

If you want to compress large request bodies (uploads), you'll need to do so manually in JavaScript. You can use [pako](https://www.npmjs.com/package/pako) to do this with gzip in the browser. Brotli is [possible](https://www.npmjs.com/package/brotli-wasm) too but it's complicated and the compression engine is too large to include in most web applications, so it's rarely a good idea unless you're doing a lot of large (>10MB) uploads.

#### On mobile:

First, you'll need to make sure you send an `Accept-Encoding` header, and handle response decompression if the response has a `Content-Encoding` response header.

Most libraries have built-in support for at least gzip, e.g. OkHttp will handle gzip completely automatically and can support Brotli with [a one-line change](https://github.com/square/okhttp/blob/master/okhttp-brotli/README.md), while NSSessionUrl will handle gzip responses completely automatically, and apparently Brotli too on iOS 11+.

That only tends to apply to responses. For requests you'll often need to enable this yourself, e.g. by [registering a custom interceptor](https://github.com/square/okhttp/issues/350#issuecomment-123105641) with OkHttp.

## What next?

Ok, hopefully you're compressing all your non-trivial requests & responses now, for a huge bandwidth boost!

If you're interested in debugging this more closely, check out **[HTTP Toolkit](https://httptoolkit.com)** to easily inspect and debug all your HTTP. It's fully open-source, and free version will show you everything you need here, while Pro even has a performance section that compares the compression ratios for each encoding on each of your responses so you can see the potential benefits directly inline.

Do keep an eye out for more developments in content encodings in future - it's likely that Zstandard will mature in the coming years, and that there will be even more powerful and performant encodings that come out in down the line.

Have questions, or interesting content-encoding facts you'd like to share? Get in touch [on Twitter](https://twitter.com/pimterry).

_Do you work with HTTP all day? **[Download HTTP Toolkit now](https://httptoolkit.com/)** to inspect & mock HTTP from browsers, servers, apps and anywhere else in one click._

