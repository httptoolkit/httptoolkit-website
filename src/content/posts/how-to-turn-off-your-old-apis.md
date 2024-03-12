---
title: "The right way to turn off your old APIs"
date: '2021-01-21T10:30'
cover_image: 'header-images/goodbye.jpg'
tags: apis, standards
---

All things come to an end, even HTTP APIs. However great your API may be today, one day you'll want to release a completely new version, an improved but incompatible endpoint, a new parameter that solves the same problem better, or to shut down your API entirely. Your current API will not be live forever.

Inconveniently though, your API has clients. If you shut down endpoints, parameters, or entire APIs without properly warning them then they're going to be very unhappy.

How do you shut down your APIs safely, making it at easy as possible for your users?

There are right ways to do this, including two new draft headers being standardized by the exciting new IETF "Building Blocks for HTTP APIs" working group, designed to help with this exact process. Let's take a look.

## Make a plan

First up: check if the API in question actually has any clients.

Hopefully you have some API metrics or at least logging somewhere. If you don't, add some! If you do, and you can tell for sure that nobody is using this API anymore, then you win. Turn it off right now, delete the code, skip this article and have a well-deserved nap.

The next question, if you're not napping, is to ask yourself whether there's an alternative to shutting down this API. Everything you turn off will break somebody's code and take their time to fix it. It's good for the health of your client ecosystem and the web as a whole if APIs keep working.

In many cases, old APIs can be translated internally, to transparently transform requests into calls to a new API instead, without maintaining two completely independent versions. This is a fundamental part of [the API versioning approach at Stripe](https://stripe.com/blog/api-versioning#versioning-under-the-hood) who include transformations with all API changes to ensure that requests for incompatible old versions continue to work as before, automatically translating the requests and responses to use the newer code as required.

Translation like this isn't always possible, and doing so _forever_ can entail significant extra complexity, but if you can do it, this can provide a valuable stability for your users, and avoid a lot the work required for deprecation or old version maintenance.

However, if this service/endpoint/parameter is in use in production, and it's not practical to keep supporting it, it's got to go.

To do that, you need a plan. There's three key questions to ask first:

* What do you expect clients using this to do? Common answers include:
    * Update to a newer still-supported version of the same thing.
    * Use some other substitute endpoint/parameter/service instead.
    * Use a different service, they're on their own, you don't care.
* When should they start migrating away from this API? Is your proposed replacement ready to use today?
* What's the deadline? I.e. when will this API stop working completely? (If you're not totally sure yet, you can delay this answer for a little bit).

Once you've got a plan, it's time to tell people about it.

## Communicate

First up: tell the humans.

Email your mailing list, post it on Twitter, update your API specification if you have them (e.g. OpenAPI has a `deprecated` field on [operations](https://swagger.io/specification/#operation-object) and [parameters](https://swagger.io/specification/#parameter-object)), and highlight this loudly in the relevant documentation online.

You should include all the info above: what they should do instead, when you recommend they start migrating, and the deadline when they _must_ migrate (if you have one).

Once you've told the humans, it's time to tell the computers. This is where the new IETF headers come in.

### The Deprecation Header

The [Deprecation header](https://datatracker.ietf.org/doc/draft-ietf-httpapi-deprecation-header/?include_text=1) tells clients that the requested resource still works as before, but is no longer recommended. You can state that very simply with a single HTTP header:

```
Deprecation: true
```

Alternatively, you can provide a date. This date tells users when they should start migrating elsewhere. This can be in the past (if they should start migrating immediately) or the future (usually meaning that the thing they should migrate to isn't ready yet). Like so:

```
Deprecation: Thu, 21 Jan 2021 23:59:59 GMT
```

If you're deprecating the whole endpoint or service, you can just return this with every response. If you're deprecating a specific feature, perhaps a parameter, request method, or a certain field in the request body, then you want to just return this in requests when that feature is used.

To give the client more information, you can use `Link` HTTP response headers to link to endpoints or human-readable documentation elsewhere. You can include more than one of these in combination in the same `Link` header, by just comma-separating them (we'll see a full example later). The spec defines 4 links related to deprecation:

#### Deprecation links

You can link to a human-readable description of the deprecation like so:

```
Link: <https://developer.example.com/deprecation>; rel="deprecation"; type="text/html"
```

This is the main way to tell your users what's going on, and what they should do about it. You almost always want to use this! If you don't have the full details and a final shutdown date yet, then even a placeholder saying that will be helpful. In that case, don't forget to let users subscribe for updates, with a mailing list or RSS or similar, so they can hear about the full plan once it's ready.

#### Latest-Version links

If you want clients to move to the latest version of the same endpoint of your API, use this to point them there, like so:

```
Link: <https://api.example.com/v10/customers>; rel="latest-version"
```

#### Successor-Version links

If you have multiple versions of your API available, it's usually nicer to migrate one version forwards at a time, rather than jumping straight from the oldest now-deprecated version to the latest. To help with this, you can link to the _next_ version of the deprecated endpoint, not just the latest, like so:

```
Link: <https://api.example.com/v2/customers>; rel="successor-version"
```

#### Alternate links

If there's no new equivalent version of this API, and users should migrate to a totally different resource that might be a good substitute, you can use alternate links to indicate that:

```
Link: <https://api.example.com/v2/users/123/clients>; rel="alternate"
```

### The Sunset Header

Once you know when the API is going to shutdown entirely, you should add a [Sunset header](https://datatracker.ietf.org/doc/rfc8594/?include_text=1).

The Sunset header tells clients when this will stop working. It's a hard deadline: API clients _must_ move elsewhere before this date, and you promise not to break anything until then.

You must provide a date here, and it _should_ be in the future. If it's in the past, that's OK though: at that point you're effectively saying "this could turn off at any moment you need to stop using it immediately". It looks like this:

```
Sunset: Tue, 20 Jul 2021 23:59:59 GMT
```

This is super simple, and can be used for more than just API shutdowns: you can use it to signal HTTP redirects that will come in the future for URL migrations, or to indicate limited lifetimes of certain URLs (for content that's temporary by nature, or for regulatory reasons like data retention policies on certain resources). All it says is "this endpoint may stop doing what you expect after this date, be ready".

#### Sunset links

This spec also provides a sunset link relationship. This is designed to link to more information about your plan for shutting down this specific endpoint (probably the same documentation as your deprecation link, if you have one) or about the general sunset policy for your service. Like so:

```
Link: <http://developer.example.com/our-sunset-policy>;rel="sunset";type="text/html"
```

This is a good place to point out that a general sunset policy is a very useful thing! A sunset policy tells clients when you shut down endpoints (e.g. 1 year after a replacement goes live) how users should ensure they hear about this (mailing lists, status pages, HTTP headers, you name it), what they should usually do about it (update, check the docs, follow `Link` headers).

Adding one doesn't help much with doing a deprecation right now, but if you'd published one a year ago, your clients would be ready already. The second best time to publish a sunset/deprecation policy is now. Might be worth considering if you're writing deprecation docs anyway.

### All together

These parts are designed to work nicely together. For example, to indicate that an API was deprecated recently, will be turned off in 6 months, link to the documentation, and provide a direct link to the next version, you should include headers like this in the response:

```
Deprecation: Thu, 21 Jan 2021 23:59:59 GMT
Sunset: Tue, 20 Jul 2021 23:59:59 GMT
Link: <https://api.example.com/v2/customers>; rel="successor-version",
    <https://developer.example.com/shutting-down-customers-v1>; rel="deprecation"
```

## Progressive shutdowns

Once all that's in place, and your sunset deadline has passed, you're good to go.

That doesn't mean you need to immediately kill the API completely though. Progressive shutdowns can help ensure that any clients still using this API get a last-chance warning before it disappears completely. GitHub [did this](https://github.blog/2018-02-01-crypto-removal-notice/) when removing some crypto support in 2018: first they disabled it for one hour, then reenabled it, then they disabled it permanently two weeks later.

There's other tricks too: Android [added increasing delays to deprecated native APIs](https://twitter.com/jbaruch/status/930476565065953280) in 2015, eventually going up to a full 16 second wait, before finally turning off the API entirely. These progressive shutdowns provide a little flexibility for clients who miss your deadline, and may help clients who haven't noticed the deprecation spot and deal with the issue before the API turns off completely.

## Flip the switch

Either way, once you've done the best you can to communicate the shutdown, it's time to turn off the endpoint/feature/entire service, delete the code, and finally go take that nap.

Doing deprecations and shutdowns carefully like this makes it as clear as possible to your clients how they can depend on your API, when they need to take action, and what they need to do. These kind of changes can be a big deal, and this information is important!

These new draft headers allow us to communicate not only to humans, but also to expose this information to automated systems. As these headers become widespread, I'm really excited to start seeing more tooling building on top of them. Generic HTTP clients can log useful warnings automatically based on this data, API generators themselves can handle more and more of this for you based on API specifications, and HTTP debuggers like **[HTTP Toolkit](/)** can highlight usages of deprecated endpoints for you in intercepted live traffic. It's an exciting time to start turning things off!

**It is important to note that these headers are _draft_ HTTP specifications**. It's possible they may change before they're finalized. That said, they've been through a few rounds of revisions already, it's fairly unlikely they'll change dramatically from here, and it's time to start testing them in the wild.

This does mean there's still time for feedback though! If you have thoughts on how this works and how it could work better, get in touch with the "Building Blocks for HTTP APIs" working group. You can email the mailing list at [httpapi@ietf.org](mailto:httpapi@ietf.org), or scroll the previous mailing list discussions [here](https://mailarchive.ietf.org/arch/browse/httpapi/).

_Debugging, integrating or building HTTP APIs? Intercept, inspect & mock HTTP from anything in one click with **[HTTP Toolkit](/)**._