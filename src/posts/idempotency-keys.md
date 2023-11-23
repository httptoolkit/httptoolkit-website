---
title: 'Working with Idempotecy Keys'
date: '2023-11-23T19:08'
# cover_image: './header-images/notepad.jpg'
draft: true
---

Idempotency is the idea that doing something multiple times should have no different affects as doing it once. This is exceptionally helpful on a slow or unreliable internet connection, or when dealing with particularly sensitive actions such as making payments. This is why most payment gateway APIs like [Stripe](https://stripe.com/docs/api/idempotent_requests) and [Adyen](https://docs.adyen.com/development-resources/api-idempotency/) support offer "idempotency keys".

## Idempotency in HTTP

Different HTTP methods have idempotency baked in. GET, HEAD, PUT, DELETE, OPTIONS, and TRACE can all be executed multiple times without any unintended side effects occurring, but for POST and PATCH do not provide that same level of confidence out of the box because it might not actually not wanted. It depends on what is being done.

Sending a series of POST requests might be a client quite genuinely trying to create multiple similar or identical things, and the business logic could legitimately want all of those multiple things created. Where it gets tricky is if a connection fails, or a client-side HTTP timeout kicks in. They might then retry the request, and then you're into unexpected territory where the server might have created the thing even if the client thinks the request failed... 

Idempotency Key's are how you give them a choice, letting them have certainty the if they try again then they don't need to worry about the thing being done twice.

Here's an example of that in the Stripe API using curl and setting an `Idempotency-Key`.

```
curl https://api.stripe.com/v1/charges \
  -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: \
  -H "Idempotency-Key: uWeBuDsZPxxvdhND" \
  -d amount=2000 \
  -d currency=usd \
  -d source=tok_mastercard \
  --data-urlencode description="Creating a charge"
```

Anyone can implement this in their API to make lives easier for API clients, so let's have a look at how that works.

## Sample Code

To practice working with Idempotency Keys we can look at how it works for both the server and client, starting with a basic HTTP API written with using ExpressJS.

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

For now it's just creating a random number, so we can see what is happening.

Sending three requests here means we get three different responses as you would expect.

```
$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 88.81742408158198"}

$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 53.13198035021438"}

$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 99.87427689891224"}
```

Now to add some logic to our API, and thankfully ExpressJS, like most good web application frameworks, has Middleware. 

Middleware lets us wrap our logic, inspecting requests and changing responses, adding all sorts of handy functionality like caching, rate limiting, and authentication, without having to clog up our routes with all that logic.

Instead of needing to write out of middleware, we can use [express-idempotency](https://www.npmjs.com/package/express-idempotency).

Let's update our API to use this.

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

This code registers a middleware on all POST endpoints, then inside the route we're checking to see if the key is a hit, and returning early to avoid rerunning the logic if this is a repeat request.

Let's give it a whirl:

```
$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 43.41405619983338"}

$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 42.39378310046617"}

$ curl -XPOST http://localhost:3001/things
{"message":"New random number: 22.522332987290937"}
```

Looks like the API is still doing different things every time, because we forgot to set an Idempotency Key. The API is doing the right thing and treating every requests as as intended to be a new transaction, which is pretty handy if you're adding Idempotency Keys to an existing API and do not want to break things for existing clients.

To get this working we need to pass an `Idempotency-Key` field, and set that to _anything_ to let the API know it should reuse the response.

```
$ curl -XPOST http://localhost:3001/things -H 'Idempotency-Key: chicken-monkey-cheesecake'
{"message":"New random number: 53.12434895091507"}

$ curl -XPOST http://localhost:3001/things -H 'Idempotency-Key: chicken-monkey-cheesecake'
{"message":"New random number: 53.12434895091507"}

$ curl -XPOST http://localhost:3001/things -H 'Idempotency-Key: chicken-monkey-cheesecake'
{"message":"New random number: 53.12434895091507"}
```

Success! The API is noticing that we intended for this transaction to be the same thing, so it's skipping all the business logic and just sending the same thing over.

A real client application would set an idempotency key with a truly unique value, and it would do this based on the users actions. When a user loads up a form in the interface, a new key should be set, and this is how you avoid a genuine "user tried to do a thing twice" getting confused with a retry.

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

## Data Adapter

The idempotency keys here are stored and checked in memory, which is fine for the demo but not so good in production as you might have multiple servers behind a load balancer with different memory.

In production you would be better off using a data store like Redis. Check if the idempotency implementation you are using with has a pre-built data adapter before you go building it yourself. In this instance, the [express-idempotency-redis-adapter](https://www.npmjs.com/package/express-idempotency-redis-adapter) is going to fix this for us.

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

## Security Considerations

Keys will be reused so if two random people send "foo" it might reuse it. Idempotency keys should expire so cannot be reused for long, but it's something to think about.

Firstly, if everyone is using UUIDv4 for Idempotency-Key's then it should be fairly hard to match somebody elses' key unless you're sniffing traffic, but it's something to think about. 

You can get your auth middleware doing the job, or run security checks in the route before you check for idempotency keys, but however you go about it just make sure you can't steal responses by guessing a key.

## Source Code

If you'd like to play with the example code, the source code is available [over here](https://github.com/philsturgeon/express-idempotency-key-demo). 
