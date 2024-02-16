---
title: 'Defining a new HTTP method: HTTP QUERY'
date: '2021-04-12T15:00'
cover_image: './header-images/binoculars.jpg'
tags: http, apis, standards
---

Nothing is ever finished or perfect, and HTTP is no exception.

HTTP QUERY is a new HTTP method, for safe requests that include a request body. It's still early & evolving, but it was recently adopted as an IETF draft standard, and it's going to add some great new tools for HTTP development everywhere.

What does that mean, why do we need a new HTTP method, how would HTTP QUERY work?

_**Update**: This post previously called this method `SEARCH`, but since it was originally published the spec has been updated, and the method is now called `QUERY`. This post has been updated accordingly._

## HTTP methods today

Today, there are 5 main HTTP methods you'll see in modern APIs.

To understand how each one works, it's important to remember that HTTP is defined in terms of resources. A resource might be a document, or a photo, or a specific customer, or the whole list of customers, and it's identified by a URL like `example.com/customers` (all customers of example.com) or `example.com/customers/123` (one specific customer).

### GET

A GET request asks the server for a resource. This is frequently used to request HTML pages, read data from an API, or load images.

These are intended to be 'safe' requests, which purely read data. They shouldn't change the state of the server, they shouldn't have side effects, and so they can be cached in many cases (which means that many client GET responses will come from a cache, and never hit the real server).

GET requests can be parameterized by their URL, which might contain a path and/or query parameters, but they can't have a request body. It's not specifically banned, but it is defined as being completely meaningless, and many existing implementations will ignore the body or reject the request entirely if you try to send one.

They can also use Accept, Accept-Language and Accept-Encoding headers to request a specific content type, language or encoding ('give me customer 123 as XML please'), and use Range headers to request only part of a document ('give me the first 100 bytes of video 24 please').

### POST

A POST request sends data to a resource on the server, and asks the server to process that data. This is a very generic "do something" request, often used to post messages, create new resources (e.g. a new customer) or trigger processing of some input.

Just like GET requests they can be parameterized by URL and various headers, but they can also include a request body: the data that the server should process. To help the server process this, the request can also have a Content-Type header, specifying the type of data in the body (e.g. `application/json`).

Of course, these aren't safe requests. They can change server state (by design) and may have side effects elsewhere too. Because of that, they're not cacheable in almost all cases. In fact they're anti-cacheable: **if a CDN or browser sees an outgoing POST request for a resource, it will invalidate and drop any existing cached data it has for that resource**.

### PUT

A PUT request sends data to a resource on the server, and asks the server to create or replace the resource using that data. This is more specific than POST: while POST is used for arbitrary actions, PUT is only used to create/update state to match the body of the request.

These are generally used in APIs as a way to specifically do create & update actions on data (whilst POST might be used to trigger arbitrary actions against that data instead).

Just like POST, this will include a request body and may affect the server's state (so invalidates caching), but it _can't_ have side effects. Instead, PUT requests must be [idempotent](https://en.wikipedia.org/wiki/Idempotence). That means that if you successfully send the exact same PUT request twice, and nothing else happens, then everything should be in the same state as if you sent the request just once.

You can see the difference if you think about `POST /documents` vs `PUT /documents`. That POST request typically means 'create a new document', and every time you make the same request a new document will be created. The PUT request meanwhile must mean 'create or replace the entire document list with the given data'. Assuming that's something the server allows, sending a request repeatedly will leave the documents in the same state as sending it just once.

### PATCH

A PATCH request sends data to a resource on the server, and asks the server to _partially_ update the resource using that data. This can be used to update a customer's address or to append to a text document.

Like PUT & POST, this will include a request body. They're not safe requests, and they're not idempotent either (appending the same thing to a document twice will change that document both times).

### DELETE

A DELETE request asks the server to delete the resource. This one's pretty self-explanatory I think.

One important note: like GET, DELETE requests cannot include a body. It doesn't make any sense to provide data when deleting data, and servers reserve the right to ignore or reject you completely if you do.

### The also-rans

There are other methods widely used elsewhere, including:

* HEAD: like GET, but skip the body - i.e. response metadata only
* OPTIONS: request information about how to make other requests, mainly used for CORS in browsers
* CONNECT: request a raw tunnel to a different server, used in proxies
* TRACE: request an echo of your request, used to trace requests through proxies & CDNs (very rarely used/supported)

All of these are great, but none of them matter right now, so let's ignore them.

### Summary

So: GET gets data, POST performs arbitrary unsafe operations, PUT performs idempotent full updates, PATCH performs partial updates, and DELETE deletes. GET and DELETE aren't allowed a body, but all the others are.

The differences between these have important implications. Cacheability is critical in many large applications, request safety has important UX implications, and each of these helps communicate to API developers how your API works.

In practice, if you swap all your GET requests for POST requests tomorrow, it'll technically work, but only in the loosest possible sense. Responses will cease to be cacheable, so your CDN will give up entirely and your server will burst into flames as traffic increases 10,000%. Browsers will refuse to go back/forward in your page history or retry failed page loads without huge warnings (because that's unsafe, and might have side effects), and nobody else looking at your code or request will have any idea what the hell you're trying to do.

These semantics help many of the tools and infrastructure we all use to understand what your HTTP requests mean. Using the right methods for the right things matters.

## What's wrong with this picture?

That's all very well, but these options are missing something.

What if you want to do a complicated data retrieval, sending lots of data but not changing the server state?

Right now, you have two main options:

* Use a GET, and squeeze all the parameters you need in the URL or headers somewhere
* Use a POST, and have the request considered as unsafe & uncacheable

Neither of these is a good option.

URLs & headers typically have arbitrary non-standard length limits, and create a terrible UX for large values. You have to encode special characters & newlines, so the URL becomes completely unreadable, and you can't specify a content type for convenient parsing either. Because it's non-standard, few tools will make this easy for you too, so you're back to stringifying and concatenating queries all by yourself. You deserve better.

Meanwhile, caching is a big deal, and POST invalidates that completely. It's also fundamentally the wrong semantics: this request is not going to change any state, it's not going to have any side effects, and requiring all tools to treat it as if it will is problematic.

In addition, the kind of resources to which you might want to send a complex query are also the kind of resources to which you might want to POST data. If `POST /customers` creates a new customer, how do I POST a query for customer data? It is possible, but using POST for multiple operations on the same resource quickly leads you down a long and hacky road to bad software.

Fortunately, HTTP is a living and evolving standard, so we can fix this.

## Enter HTTP QUERY

[HTTP QUERY](https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/?include_text=1) is a proposed new HTTP method that's intended to solve this problem.

A QUERY request is a request that's safe (does not change the target resource) that can include a body.

This helps because with QUERY we can implement the above: we can send complex data queries clearly, without either encoding them in a URL or using a POST request.

**Note that this is still only a draft standard**. The details will probably change, and even the name isn't 100% fixed yet (the draft is officially named "safe method with body", rather than referencing QUERY, to make that easy to change).

Take all this with a grain of salt, but as of March 2021 it's now an officially adopted IETF HTTP _draft_ specification, so it is on an official path towards eventual standardization, if all goes well.

A raw HTTP/1.1 request using QUERY, as specified today, might look something like this:

```
QUERY /customers HTTP/1.1
Host: example.com
Content-Type: application/sql

SELECT username, email
WHERE DATEDIFF(DAY, GETDATE(), signup_date) > 7
```

(No, you shouldn't let remote clients send you arbitrary SQL queries, but you get the idea)

Right now the spec does _not_ define the result of this query as cacheable. It's not completely clear why, but I suspect this is because caches today never take the body into account, and starting to do so would be a major change that needs some careful thought and consultation.

That said, it does avoid the cache invalidation of the equivalent POST requests. The above request as a POST would require every cache en route to drop any cached data it has for `/customers`, forcing all that data to be reloaded. QUERY does not, and that alone will be a big boost to many caching setups.

This has a few benefits:

* The request body is clearly readable and manageable - no special encoding or length limits involved
* The semantics are clear: it's just querying data
* You're now free to have separate semantics for GET, QUERY & POST on the same URL

### Use cases

You can use this to support complex querying in any language you like, from GraphQL to SQL to OData. Of course the server needs to understand whichever query language you're using, and you should indicate the format clearly in the Content-Type header of the request to make that possible.

This is especially interesting for GraphQL. GraphQL currently falls perfectly into the above trap, supporting both GET requests or POST requests, but with awkward caveats in either case. Moving to QUERY for read-only GraphQL requests would improve the UX significantly, and could allow GraphQL to better integrate with built-in HTTP features like caching in future.

Query languages like this are the most obvious use case, but you can go well beyond that too: this supports anything that sends a body to request data from the server without side effects.

RPC-style APIs using HTTP or other APIs that don't really 'query' data as such will get value from this being supported too (although this does stretch the currently defined semantics a bit). For example, an API to which you can send data and have the server encrypt it and return it to you. This doesn't change anything on the server, so POST isn't appropriate, and GET has the same limitations as above.

You could even use this to support things like a dry-run API for POST requests (don't change anything yet, but tell me what would happen if I did POST this data). There's a long list of possibilities!

### Accept-Query

In addition to QUERY, the specification also defines an Accept-Query header. That can be used in responses like so:

```
HTTP/1.1 200 OK
<other headers>
Accept-Query: application/sql, application/graphql

<normal response>
```

This allows a server to advertise that it accepts QUERY requests, and signal the specific format(s) of query that it will accept. This is similar to the existing [Accept-Patch](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Patch) header.

The server could include this in any responses, but it's particularly useful in responses to OPTIONS requests, where the client queries a resource to ask what functionality is supported.

## Caveats

This is the start of a great proposal imo, but there are things you need to be aware of, which create some gotchas and possible improvements in the spec as it stands today.

### SEARCH has a history

_(**Update**: this section is no longer wholly correct, but is kept because it's interesting context. These benefits and conflicts described here disappeared when the method was changed from `SEARCH` to `QUERY`, which has no such history.)_

This standard was originaly based on the [SEARCH method](https://tools.ietf.org/html/rfc5323) from WebDAV (an HTTP extension designed for document authoring & versioning on the web).

This has upsides and downsides.

Because a similar method has existed in the past, it does mean that many existing tools including **[HTTP Toolkit](https://httptoolkit.com)** itself and infrastructure like proxies & CDNs will already support this, and could accept SEARCH requests immediately without any hassle.

On the other hand, adding SEARCH to HTTP itself without breaking WebDAV requires some thought around compatibility. The current workaround for this in the spec is that any request with an `application/xml` or `text/xml` content-type header must follow the specific format rules defined in the WebDAV spec for its query body.

Anything else would not be a valid WebDAV request, so can freely ignore that, but this does create a real problem for SEARCH in XML APIs. It's likely that in future the spec will be relaxed to apply this requirement only to XML within WebDAV's XML namespaces, but that's not yet formally specified.

### Caching is hard

While not invalidating caches is a good start, the results of a QUERY aren't actually cacheable themselves. That doesn't just mean they're not cacheable by default: even with explicit cache headers, they are not cacheable.

This is unfortunate because it's a clear limitation when compared with GET, and caching query results is a super common use case.

There's ongoing work here to specify exactly under what conditions QUERY could become cacheable, which would unlock a lot more benefit from this standard. I think the likely result is that it won't be cacheable by default, but will be cacheable given the appropriate headers, but again that's not yet specified, so let's wait & see.

### Naming is hard

_(**Update**: this section is also no longer relevant, but is kept because it's interesting context too - in the end the name has indeed been changed!)_

SEARCH isn't a great name. Not every query is a search, and there's a wide variety of other uses for "safe method with a body" that go entirely beyond simple querying of a data set, as discussed above.

This has been recognized and it's being debated, and there are other proposals (like QUERY or FETCH). SEARCH does have some compatibility benefits due to its existing usage in WebDAV though, so there's a challenging balance to be made.

Changing the name would slow down adoption in all existing software, but might make the method clearer for developers to understand and use. There's no easy answer here unfortunately.

## What's next?

Personally, I think QUERY would be valuable in itself already, despite these caveats, and there are good options available here to quickly improve the standard further.

If you'd like to dig into the details further, the current specification is available [from the IETF website](https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/?include_text=1), and you can get involved by [joining the IETF HTTP Working Group mailing list](https://lists.w3.org/Archives/Public/ietf-http-wg/) or opening issues/PRs directly via the [http-extensions GitHub repo](https://github.com/httpwg/http-extensions/) (an umbrella repo for this spec plus a few other prospective HTTP additions). Share your thoughts and help shape the HTTP of the future!

If you have any other questions, or is there anything I've missed? Feel free to [get in touch](https://twitter.com/pimterry) on Twitter, I'd love to hear about it.

_Do you work with HTTP? **[Download HTTP Toolkit now](https://httptoolkit.com/)** to inspect & mock HTTP from browsers, servers, apps and anywhere else in one click._