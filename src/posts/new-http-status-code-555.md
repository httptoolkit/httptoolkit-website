---
title: 'HTTP 555: User-Defined Resource Error'
date: '2020-03-27T13:30'
cover_image: './ice-cream.jpg'
twitterUrl: https://twitter.com/HttpToolkit/status/1243530782653759490
redditUrl: https://www.reddit.com/r/programming/comments/fpwyjo/http_555_userdefined_resource_error/
hackerNewsUrl: https://news.ycombinator.com/item?id=22702658
devToUrl: https://dev.to/pimterry/http-555-user-defined-resource-error-54ei
---

Does the rise of serverless mean we need a new HTTP status code?

The team at Oracle think so. They've submitted [a draft specification](https://datatracker.ietf.org/doc/draft-divilly-user-defined-resource-error/) to the HTTP Working Group, defining a new HTTP status code (initially suggesting 555) to be used for server-side errors caused by user-supplied resources.

[Note: I'm going to use 555 to refer to the new proposed code everywhere here, but this is _not_ standardized, even if it is standardized in future it will probably use a different code, and you 100% should not start building anything that uses this code for real _anywhere_. Nobody needs another [418 I'm A Teapot](https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol#Save_418_movement) battle.]

Anyway, let's talk about what this means, and whether it's a good idea.

## Status codes: a refresher

First let's recap the background. Status codes are 3 digit codes, included in every response from an HTTP server, which summarize the result of a request.

There's common examples you'll have heard of like 404 (the resource you requested could not be found) or 200 (your request was successful, and this response represents the result). There's then a long list of less common examples, like 302 (the resource you requested is a temporarily stored elsewhere, you should go there instead), 410 (the resource you requested was here, but now it's gone, and there's no new address available), or 100 (yes, please continue sending the rest of the request you're already sending).

And many more. They're categorized into a few classes:

### 1XX: Information

These are provisional responses, which typically don't fit into the simple HTTP request/response flow, and describe unusual behaviors like interim responses or switching the connection to a different protocol. 

### 2XX: Success

The request you asked for was successful in some way. Perhaps you're getting the resource you asked for (200), the server has accepted and started asynchronously processing your operation (202), or your request was successful but the server doesn't have any data about it for you (204).

### 3XX: Redirection

Your request is valid, but the response you requested requires you to take some action elsewhere. Perhaps the resource you want is currently only available elsewhere (301/302/307/308), or your request indicated that your cache is up to date, and already has the data you need (304).

### 4XX: Client error

You, the client sending the request, have done something wrong. Maybe the server can't understand you at all (400), you're not authenticated for the thing you're asking for (401), there was a conflict between your request and the current state of the server (409), or you've made too many requests recently and the server is rate limiting you (429).

### 5XX: Server error

Your request seems valid, but the server receiving your request can't deal with it for some reason. The entire service might be unavailable (503), an upstream server the server wants to pass your request too might have failed (502), or server might have broken in some way it can't explain (500).

These classes are well defined and widely understood nowadays, and very unlikely to change in future. It is however possible and likely that new individual codes within each class will be needed, and there's some details of how that should work [in RFC 7231](https://httpwg.org/specs/rfc7231.html#considerations.for.new.status.codes).

These were designed to be extensible from early on, and any client that receives an unrecognized YXX status is required to treat it a Y00. For example, clients that receive 555 responses and don't understand them are required to treat them as 500 responses. Whether they do in practice of course is a separate question...

## Errors as a service

Back to the proposed status code 555. Why do the Oracle team want it?

Oracle are building a service called [Oracle Rest Data Services](https://www.oracle.com/database/technologies/appdev/rest.html), a developer platform designed to let you quickly create REST APIs for your Oracle databases. You define the endpoints and the SQL, and they generate the API (I'll carefully avoid discussing whether this is a good idea).

They're in good company here - the developer market for cloud-hosted software platforms has exploded in the last couple of years, with a massive range of serverless providers and related tools appearing everywhere, from [AWS Lambda](https://aws.amazon.com/lambda/) to [Firebase Cloud Functions](https://firebase.google.com/docs/functions) to [Cloudflare Workers](https://workers.cloudflare.com/) to [OpenFaaS](https://www.openfaas.com/).

In each case, developer platforms like these hide all server concerns and mechanics from you, and provide you with a clear interface and set of expectations to against which to write code. You provide the core business logic for your API, and they do all the server management & heavy lifting.

Sometimes though, this can go wrong. Your code can fail _completely_: not just fail to run an operation and return an explicit error status, but entirely fail to fulfill the core expectations required by the platform. Perhaps your SQL statement for Oracle RDS is fundamentally broken, or your code crashes before registering the handler that Lambda expects, or calls the callback with gibberish, or your worker totally runs out of memory.

In these cases the platform needs to tell the client sending the request that something has gone wrong. That is definitely some kind of 5xx error. It's not the client's fault, and something has gone wrong on the server end. But which 5xx error?

Here's the list of standardized codes we have to pick from:

* 500 Internal Server Error
* 501 Not Implemented
* 502 Bad Gateway
* 503 Service Unavailable
* 504 Gateway Timeout
* 505 HTTP Version Not Supported
* 506 Variant Also Negotiates
* 507 Insufficient Storage (WebDAV)
* 508 Loop Detected (WebDAV)
* 510 Not Extended
* 511 Network Authentication Required

500, the maximally unspecific option, is the only real candidate.

Unfortunately, the platform can also fail in unexpected ways, and the most appropriate status code for those is _also_ 500.

What Oracle are arguing is that these two cases (the platform failing and the platform customer's logic failing) are generic & widely relevant cases, and that they are semantically different from one another in an important way. They want to differentiate these cases by status code. It's a good idea to standardize a status code to do so if the specific case is often going to affect clients' interpretation of the response, and it's a widely relevant distinction, so there are many other services who hit equivalent cases and would use the status codes to differentiate them.

The [spec itself](https://datatracker.ietf.org/doc/draft-divilly-user-defined-resource-error/?include_text=1) and [the email submitting it](https://lists.w3.org/Archives/Public/ietf-http-wg/2020JanMar/0241.html) have more detail on their reasoning here, and how they propose this works.

So, the big question: do we really need a new status code for this?

## Is this widely relevant?

I think there's a strong argument that these are types of error that are relevant to a huge & growing set of services and clients.

There are many PaaS providers now where this could happen, and they're increasingly popular. As of 2018, Lambda was running [trillions of executions every month](https://aws.amazon.com/blogs/aws/firecracker-lightweight-virtualization-for-serverless-computing/). DataDog did an analysis of their customer's infrastructure in Feb 2020, and [half of their AWS users are using Lambda](https://www.datadoghq.com/state-of-serverless/), an adoption rate that increases to 80+% in large and enterprise environments. At the end of 2019, more than 2 million mobile apps were communicating with the Firebase platform [every month](https://firebase.googleblog.com/2019/09/Whats-new-at-Firebase-Summit-2019.html). Cloudflare launched Workers in 2018, and according to their [S-1 filing](https://www.sec.gov/Archives/edgar/data/1477333/000119312519222176/d735023ds1.htm) by mid-2019, more than 20% of all new Cloudflare customers were using it.

These specific platforms won't last forever, but the running-your-code-within-a-managed-platform model seems likely to be a long-term fixture.

There's a lot of these platforms around, a lot of services running on them, and a lot of HTTP requests communicating with those services. [All](https://status.firebase.google.com/incident/Functions/18018) [of](https://docs.aws.amazon.com/step-functions/latest/dg/bp-lambda-serviceexception.html) [these](https://stackoverflow.com/questions/46183587/google-cloud-functions-not-working) [platforms](https://www.cloudflarestatus.com/incidents/vxjgtxqyncqw) [fail](https://github.com/firebase/firebase-tools/issues/1222) [sometimes](https://forums.aws.amazon.com/thread.jspa?threadID=234129). Errors from the platforms themselves are a real & widespread issue.

While it's tough to get hard numbers, it's also easy to be confident that the code hosted by these platforms often fails too. It's pretty clear that the both the hosted code errors and platform errors are real cases that are widely relevant to a lot of modern HTTP traffic.

## Is this semantically important to differentiate?

This is less clear. Even if these errors do happen widely, do we really need a separate HTTP status code for hosted logic errors and platform errors?

There's definitely an argument that it's a pure implementation detail, and the client doesn't care. The server hit sent an error and something broke. HTTP status codes shouldn't depend on the infrastructure choices used by the service, they should just tell the client details about their request.

At the same time, there are other existing 5xx codes that explicitly tell us about implementation details of the failing service, when it's widely useful to do so. 502 and 504 both declare that the service is internally dependent on another server, and the second server has failed (502) or timed out (504), but the server you're talking to is functioning correctly. Meanwhile 506 tells us that the internal configuration of content negotiation in the server is broken, placing the blame on that specific part of the server's implementation.

The gateway errors are a pretty similar case to these platform errors, but directing blame at the "which server" level, rather than the "which organization" or "which level of the stack" level that we're considering here. It's common that requests go through a CDN or reverse proxy of some sort, and when that fails it's often useful to know whether it's the gateway server that has failed, or the actual service behind it, so we have error codes to distinguish those cases. This would be similar.

In practice though, would this really be useful?

The [AWS Lambda outage thread](https://forums.aws.amazon.com/thread.jspa?threadID=234129) above has a nice quote:

> Same here too! Getting "Service error." when I make requests to my functions..
> Not good aws! I spent a good amount of time thinking it was my mistake since I was working on some of my functions :(

This is the situation we're trying to disambiguate. Is the platform failing somehow, or is the hosted code broken?

This is clearly a meaningful distinction for the developers of the service (i.e. the customers of the platform), like the commenter above. When their service starts serving up errors, their understanding of the response and their next steps are completely different depending on which part is failing. Clearer status codes mean fewer sad emojis.

It's also an extremely important distinction for the platform provider (i.e. AWS/Oracle/Cloudflare/Google/etc). They'd like to be able to monitor the health of their platform. To do so, they're very interested in failures caused by the platform, but largely uninterested in failures caused by the hosted code within. It's easier to set up monitoring tools and automation to report on status codes than it is to parse detailed error information from the response itself. It's also valuable to them because it clarifies the situation to their customers (as in the quote above), and so avoids unnecessary support requests.

Oracle dig into  this in [their submission](https://lists.w3.org/Archives/Public/ietf-http-wg/2020JanMar/0241.html):

> When such a resource raises an error the only appropriate HTTP status code to use is 500 Internal Server Error. This causes confusion as it looks like there is something wrong with ORDS, where in fact there is only something wrong with the user supplied SQL. Despite explanatory text to clarify this, operators and users very often miss this distinction, and file support issues against ORDS. Further, automated tools that monitor the access log only see the 500 status code, and thus cannot differentiate between 'real' 500 errors in ORDS itself that need remediation versus 500 errors in the user supplied REST APIs that probably do not need any remediation.

Still, the developers of a service & the platform hosting the service are not the main clients of a server.

I do think differentiating these two cases is also arguably useful as a client of an API though, uninvolved in the implementation behind it.

This is a debatable point. It is really only relevant to API clients, as a technical audience, rather than browser visitors, but API clients are still important consumers of HTTP responses. For those clients, a platform failing entirely is a meaningfully different case from the service they want to talk to failing. It affects who they should contact to report the issue, how they should categorize it in their own error logs, which status pages to monitor to know when the issue is resolved, and what kind of expectations they can have for the resolution of the issue.

As with gateway errors: when multiple parties are involved in a failing response, it's useful for HTTP clients to be able to tell who's fault it is from the outside.

## Is this the right solution to the problem?

Ok, let's take as a given that this is a widespread case that it's often important to distinguish. Is the 555 status code described the right way to do that?

One alternative would be to distinguish these cases in an HTTP header or response body of a 500 response. That's not quite as easy to integrate into much automation though, and less visible for something that is (Oracle would argue) an important distinction in the failure you're receiving. As a platform, if you want your customers to more clearly understand where errors come from, you want it to be obvious.

Unfortunately, there's one big reason the 555 status code as proposed isn't viable anyway: for most platforms, it doesn't make 500 errors any less ambiguous.

The issue is that for many of these platforms it's possible for hosted code to _explicitly_ return a 500. This is a problem. If 555 is defined to mean "the hosted code crashed", that means that 500 now means either "the hosted code explicitly returned a 500 error" or "the platform crashed". That makes it useless. Users can't spot platform issues by looking for 500 errors, and similarly platforms can't monitor their own status by doing so, which means the differentiation is pointless. This is bad.

It's fixable though. Instead, we can just flip the proposal on its head, and reserve 555 for platform errors, rather than errors in the hosted logic. I.e. if the platform fails in any unknown way, it should return a 555. Platforms just need to watch their monitoring for 555 errors, and developers & API clients can know that 555 errors are always caused by the service's platform, not the service itself, so everything except 555 is semantically related to the service.

I suspect in Oracle's case they missed this simply because it's not relevant to their platform; their hosted code doesn't appear to be able to directly set the status, just the data, so it can never explicitly return a 500. It's definitely relevant for other platforms though, from Lambda to Firebase, so without this the spec is probably unusable.

## Do we really need a new status code?

Even if we flip this proposal to define a 555 "Unknown Platform Error", given all the above: do we _really_ need this?

It's hard to definitively answer. I do think there are legitimate arguments for and against, and I don't think it's 100% clear cut either way.

The real test is whether the rest of the ecosystem displays any interest. If this is a status code that only Oracle care about, then it really doesn't need formal standardization. On the other hand, if AWS or other platforms or API clients do start displaying interest, then maybe it's honestly a widespread and semantically meaningful class of errors. You can debate the theory all you like, but HTTP, like most standards, is intended to be defined by what's important for real use cases in the wild, not just what one company wants to implement today.

We'll have to wait and see.

In the meantime, if you want to keep an eye on this and other HTTP developments, subscribe to the IETF HTTP Working Group [mailing list](https://lists.w3.org/Archives/Public/ietf-http-wg/) for more thrilling specs and debate, or just subscribe to this blog below, and I'll write up the interesting parts.