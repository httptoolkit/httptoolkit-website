---
title: 'Working with the new Idempotency Keys RFC'
date: '2023-12-12T15:00'
cover_image: './header-images/repeated-network-failures.jpg'
author: Phil Sturgeon
authorUrl: https://philsturgeon.com/
tags: http, standards, apis
---

Idempotency is when doing an operation multiple times is guaranteed to have the same effect as doing it just once.

When working with APIs this is exceptionally helpful on slow or unreliable internet connections, or when dealing with particularly sensitive actions such as payments, because it makes retrying operations safe and reliable. This is why most payment gateways like [Stripe](https://stripe.com/docs/api/idempotent_requests) and [Adyen](https://docs.adyen.com/development-resources/api-idempotency/) support 'idempotency keys' as a key feature of their APIs.

Recently, the IETF have gone further, and created [a draft RFC standard](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/) for this useful common pattern, as part of the 'Building Blocks for HTTP APIs' working group. This is technically still a draft and the details could change, but it's fairly mature now and increasingly widely used, so it's a good time to take a closer look, and start using & implementing it for yourself.

## Idempotency in HTTP APIs

Many HTTP methods are defined as idempotent in all cases. In theory, any GET, HEAD, PUT, DELETE, OPTIONS, or TRACE operation can be executed multiple times without any unintended side effects (though for badly behaved APIs your mileage may vary).

The idea is that an HTTP request like `DELETE /users/123` clearly wants to delete that user, and if that accidentally happens twice then that's just fine. User 123 ends up deleted just the same.

It's a lot more complicated for POST and PATCH requests, which do not provide that same level of confidence out of the box. These are designed to allow non-idempotent operations, like adding a new user, sending a payment, or appending to existing data. Those are important use cases too - sometimes you really do want to send the same thing twice, and have it happen twice - but this can cause problems when things go wrong.

When sending POST and PATCH requests to modify server state, if you want to support retries then both the client and server need to explicitly handle this - which is exactly what idempotency keys are designed to allow you to do.

## How can non-idempotency go wrong?

Without idempotency keys, whether or not a client wants a repeated request to be executed twice or not is usually impossible to guess. For example, you might build a payment-sending client app, which has a timeout set to 2 seconds like this:

```js
await axios.post(
  '/payments',
  { to: 'user@example', value: 2000 },
  { timeout: 2000 }
);
```

If that doesn't complete within 2 seconds, the HTTP client is typically going to show the request as failed, and ask you if you'd like to try again.

Unfortunately though, in this scenario the client doesn't actually know whether the server has successfully completed the payment. It was running a little slow, sure, but maybe it sent the payment and just hadn't quite finished spitting out the JSON yet. Meanwhile, the server has no idea the client gave up and told the end-user the payment failed. The server thinks the payment is done, but the client does not. This creates a problem.

The server could try to write some logic to detect duplicate payments, but is that something you always want to automatically block?

```
POST /payments

{
  "amount": 5.00,
  "to": "julian1342",
  "reason": "cider"
}
```

If the server receives this request twice, it could be a failed retry, or it could just as easily be somebody paying Julian for a second cider.

## Idempotency keys to the rescue

Idempotency keys are how you give everyone some clarity here. They let the client specify explicitly whether they are reattempting a failed request, or doing a whole new operation.

Here's an example of that in the Stripe API, using curl and setting an `Idempotency-Key` header:

```bash
curl https://api.stripe.com/v1/charges \
  --user sk_test_4eC39HqLyjWDarjtT1zdp7dc: \
  --header "Idempotency-Key: uWeBuDsZPxxvdhND" \
  --data amount=2000 \
  --data currency=usd \
  --data source=tok_mastercard \
  --data-urlencode description="Creating a charge"
```

After this request is completed, any future requests with the same idempotency key will _not_ create a new charge - they'll return the saved response from the previous request instead. Because of this, if a client isn't sure whether the server received their request, they can always safely retry it.

This is a standard pattern, but it's just a header and it's entirely implementation agnostic, so anyone can implement this logic to make life easier for everyone involved - the API developers, the API clients, and the end users.

## How can you get started with idempotency keys?

To practice working with idempotency keys here, we'll build a small example showing how this works for both the server and client.

Let's start with a basic HTTP API written using [Express](https://expressjs.com/), with a single POST endpoint that doesn't yet implement idempotency at all:

```js
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.post("/things", (req, res) =>
  res.json({
    message: `Created a new thing: ${Math.random() * 100}`,
  })
);

app.listen(port, () => console.log(`Listening on port ${port}`)
```

Every time a client calls `POST /things` it's going to create a brand new thing, and we can pretend this is being saved in the database then returned like a real API might do.

For now it's just creating a random number, so we can spot each unique operation that's executing.

Sending three requests here means we get three different responses as you would expect.

```bash
$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 88.81742408158198"}

$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 53.13198035021438"}

$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 99.87427689891224"}
```

Every request does a new operation, and it's impossible for a client to safely retry operations that may have failed.

Now to add some idempotency logic to our API. Thankfully Express, like most good web application frameworks, supports middleware.

Middleware lets us wrap our logic, inspecting requests and changing responses, adding all sorts of handy functionality like caching, rate limiting, and authentication, without having to clog up our routes with all that logic.

Instead of needing to write our own middleware, we can use [express-idempotency](https://www.npmjs.com/package/express-idempotency) for this (similar packages exist for most other web frameworks and languages).

Let's update our API to use that:

```js
// Load up the middleware
const idempotency = require("express-idempotency");

// Register idempotency middleware
app.use(idempotency.idempotency());

// Updated route
app.post("/things", (req, res) => {
  // Check if there was a hit!
  const idempotencyService = idempotency.getSharedIdempotencyService();
  if (idempotencyService.isHit(req)) {
    return;
  }

  res.json({
    message: `New random number: ${Math.random() * 100}`,
  });
});
```

This code registers a middleware on all POST endpoints, then inside the route we're checking to see if the key is a hit, and returning early if so, to avoid rerunning the logic if this is indeed a repeated request.

Let's give it a whirl, first with a series of intentionally repeated (non-idempotent) operations:

```bash
$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 43.41405619983338"}

$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 42.39378310046617"}

$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 22.522332987290937"}
```

Here as expected, the API still does a new operation every time, because we haven't set an Idempotency Key. The API is doing the right thing and treating every request as a new transaction, which is exactly what you want if you're adding idempotency keys to an existing API and don't want to break things for existing clients.

To use our new feature though, we need to pass an `Idempotency-Key` field, and set that to _anything_ to let the API know it should reuse the response.

```bash
$ curl -XPOST http://localhost:3001/things -H 'Idempotency-Key: cheesecake'
{"message":"New random number: 53.12434895091507"}

$ curl -XPOST http://localhost:3001/things -H 'Idempotency-Key: cheesecake'
{"message":"New random number: 53.12434895091507"}

$ curl -XPOST http://localhost:3001/things -H 'Idempotency-Key: cheesecake'
{"message":"New random number: 53.12434895091507"}
```

Success! The API is noticing that we intended for this transaction to be the same thing, so it's skipping all the business logic and just sending the same thing over.

A real client application would set an idempotency key with a truly unique value, and it would do this based on the user's actions. When a user loads up a form in the interface, a new key should be set, and this is how you avoid a genuine "user tried to do a thing twice" getting confused with a retry.

If the client also happens to be written in JavaScript, it might look a bit like this:

```js
const { v5: uuidv5 } = require('uuid');

// Where a form loads up
const idempotencyKey = uuidv5();

// Elsewhere in the application
fetch("https://example.org/api/things", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Idempotency-Key": idempotencyKey,
  },
  body: JSON.stringify(req.body),
})
.then((response) => response.json())
```

Exactly when the key changes depends on your UX. Do you have a persistent form where the user expects a new operation every time they submit the form? In that case, you'll want to reset the key after each successful submit. Or is the user trying to do a single operation, and only ever resubmitting to retry it? In this case, you'll need to preserve the same key throughout.

Which case applies for you should be fairly clear from your existing UX, but either case is valid, so do think carefully about how these keys need to be managed in your case.

## Making PATCH idempotent

All the examples here have used POST, but idempotency keys can help with PATCH as well. This is often less important (many uses of PATCH requests are idempotent by design) but because that's not strictly required by the HTTP specificiation, you do need to think about this when using PATCH.

Idempotency keys are especially relevant if you're using [JSON Patch](https://jsonpatch.com/) or something similar, which defines atomic actions like `incrementBy: 1` that you can use to atomically increment some data on the server with a PATCH request. That's an alternative to reading existing data with a GET request, incrementing it client side, and sending the update value with a new POST request, which creates a risk of race conditions if somebody else modifies the data between the requests. This is useful, but are notably _not_ idempotent - sending the request twice will clearly increment your value twice!

Idempotency keys work just as well for this case too though. Just remember that the same caveats apply, and you'll need to think similarly about when your idempotency keys change, and when they're preserved. If you're intentionally sending repeated requests to increment a value, and you accidentally repeat the same idempotency key, all your many increments will silently collapse into a single operation, which won't be what you expect.

## Distributed idempotency with data adapters

The idempotency keys in the examples above are stored and checked in memory, which is fine for a demo, but not so good in production as you might have multiple servers behind a load balancer, each with independent local state (so that a request with an idempotency key already seen by one server won't be recognized as a repeat if the same request is received by the other server).

Similar issues apply during deployments, even with just one server, as all idempotency keys held in memory will be lost.

In these production scenarios, you would be better off using a data store like Redis, which can provide a shared temporary storage that's available from all servers, and independent of your server deployments.

The first step to doing this is to check whether the idempotency implementation you are using has a pre-built data adapter to support this, before you go building one yourself. In this instance, the [express-idempotency-redis-adapter](https://www.npmjs.com/package/express-idempotency-redis-adapter) is exactly what we need, so that will fix this for us nicely:

```js
const idempotency = require("express-idempotency");
const RedisAdapter = require("express-idempotency-redis-adapter").default;

// New Redis Adapter that will be used by the idempotency middleware
const adapter = new RedisAdapter({
  connectionConfig: { url: "redis://localhost:6379" },
});

adapter.connect().catch((error) => {
  throw error;
});

// Add the idempotency middleware by specifying the use of the redis adapter
app.use(
  idempotency.idempotency({
    dataAdapter: adapter,
  })
);
```

This tells express-idempotency to cache all idempotency keys and responses into Redis. If we run multiple servers using this code, and even if we restart these servers, the idempotency keys and their cached responses will still be persisted, and duplicate operations will be avoided.

## Security considerations of idempotency keys

It's important to realise that there are risks here! Reused keys will reuse responses, regardless of the source, so if two different client A and client B both send `Idempotency-Key: same-thing` it might reuse the client A's response for client B.

This could expose sensitive data in the response. Even if it doesn't, it's easy for this to expose the existence of a previous operation that should be secret (has Alice ever paid Bob $1000?)

Fortunately, there's a few ways to avoid this.

The first step is to ensure clients use sufficiently random values (such as UUIDs) for their idempotency keys. Using large enough unguessable values makes it effectively impossible for multiple clients to clash on the same key. In addition, idempotency keys should expire after a fairly short time (hours or days, not years) so they cannot be reused indefinitely. This also helps avoid memory issues with cached response data.

Lastly, when you see a matching idempotency key, before trusting it you should also compare the contents of the new request with the previous request, before reusing the response. This makes it impossible to reuse a known key without already knowing the full request too. Express-idempotency will do this for you automatically, and you can also do it efficiently yourself elsewhere by hashing requests alongside the key.

Your authentication & rate limiting logic should also help to make brute forcing this even harder. If you register multiple middlewares you can make sure those run happening before the idempotency middleware, or if you run the code yourself in controllers/routes then you can run the security checks before you check for idempotency keys, making it impossible to anonymously brute force these values.

However you go about it, just be aware that you'll need to protect against this.

On the client side, it's also important to remember that idempotency keys are intended as a best-efforts feature, but not a 100% guarantee. Most servers don't suppor this yet, for starters, and even for servers that do explicitly support idempotency keys, you can't safely assume that a request retried days later won't duplicate a previous operation just because you saved the idempotency key. Quick retries should be safe, but it's good to have a fallback plan for other cases where it doesn't work out, such as explicitly checking whether an operation already occurred before retrying if a notable amount of time has passed.

Extremely sensitive operations that cannot be undone should probably not use idempotency keys as their only safety mechanism, unless you are very confident the server can provide hard guarantees around this.

## Further reading

If this is interesting, take a look at the source code for the examples above (available [over here](https://github.com/philsturgeon/express-idempotency-key-demo)) and give this a go for yourself to get the hang of using idempotency keys for real, and save your end-users and support staff the headache of unpicking mistakes.

There's many libraries similar to [express-idempotency](https://www.npmjs.com/package/express-idempotency) for other frameworks to make this easy elsewhere too. See what you can find, and if there's nothing for your framework consider knocking up an open-source library to help others out too.

Simple idempotency key implementations like this can get you a long way very quickly, but if you have complex multi-step processes that mix up database interactions, calls to other APIs, emails, etc, then you might want [a more comprehensive implementation](https://medusajs.com/blog/idempotency-nodejs-express-open-source/) which tracks progress for each key.

As noted above, this now an official standard (so in theory every server using `Idempotency-Key` headers should behave in the same way) but this is still a draft. If you have feedback or suggestions on how to make this better, you can share them on GitHub [here](https://github.com/ietf-wg-httpapi/idempotency).

**Debugging APIs or HTTP clients, and want to inspect, rewrite & mock live traffic? Try out [HTTP Toolkit](https://httptoolkit.com/) right now to see all this data for yourself. Open-source one-click HTTP(S) interception & debugging for web, Android, servers & more.**