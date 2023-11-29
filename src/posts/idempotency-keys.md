---
title: 'Working with Idempotency Keys'
date: '2023-11-23T19:08'
# cover_image: './header-images/notepad.jpg'
draft: true
---

Idempotency is the idea that doing something multiple times should have no different affects as doing it once. When working with APIs this is exceptionally helpful on a slow or unreliable internet connection, or when dealing with particularly sensitive actions such as payments. This is why most payment gateway APIs like [Stripe](https://stripe.com/docs/api/idempotent_requests) and [Adyen](https://docs.adyen.com/development-resources/api-idempotency/) support offer "idempotency keys".

## Idempotency in HTTP

Different HTTP methods have idempotency baked in. GET, HEAD, PUT, DELETE, OPTIONS, and TRACE can all be executed multiple times without any unintended side effects occurring, because `DELETE /users/123` clearly wants to delete that user. If it accidentally happens twice then thats fine, user 123 has been deleted. 

It's a lot more complicated for POST and PATCH do not provide that same level of confidence out of the box, instead both the client and server need to add that intent in by using "Idempotency Keys". 

Whether or not a similar request showing up twice is what the client wants or not is almost impossible to guess. I might build a payment sending client app which has a timeout set to 2 seconds like this:

```
await axios({
    method: 'post',
    url: '/payments',
    timeout: 2000,
});
```

The HTTP client is going to show the request failed, and ask me if I'd like to try again, or maybe it will automatically retry. 

What the client doesn't know is that the the server had successfully completed the payment. It was running a little slow sure, but it got the payment sent and just hadn't quite finished spitting out the JSON yet. The server has no idea the client gave up and told the end-user the didn't work. The server thinks the payment is done, but the client does not.

The server could try to write some logic to detect duplicate payments, but is that something you want to automatically block? 

```
POST /payments 

{
  "amount": 5.00, 
  "to": "julian1342",
  "reason": "cider"
}
```

If this request is sent twice it could just as easily be a retry as it is me owing Julian for a second cider.

Idempotency Key's are how you give everyone some clarity. They let the client specify if it is reattempting a failed request, or doing a whole new thing.

Here's an example of that in the Stripe API using curl and setting an `Idempotency-Key`.

```
curl https://api.stripe.com/v1/charges \
  --user sk_test_4eC39HqLyjWDarjtT1zdp7dc: \
  --header "Idempotency-Key: uWeBuDsZPxxvdhND" \
  --data amount=2000 \
  --data currency=usd \
  --data source=tok_mastercard \
  --data-urlencode description="Creating a charge"
```

Anyone can implement this logic to make life easier for everyone involved, the API developers, the API clients, and the end users. 

## How does it work?

To practice working with idempotency keys we can look at how it works for both the server and client, starting with a basic HTTP API written with using ExpressJS.

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

## PATCH

All the examples here have used POST, but it can help with PATCH too. This is especially useful if you're using [JSON Patch](https://jsonpatch.com/) or something similar, with atomic actions like `incrementBy: 1` which you want to make sure only increments one time. Learn more about making PATCH idempotent [in this article](https://apisyouwonthate.com/blog/idemptoency-keys/).

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

Keys will be reused, so if two different client A and client B both send `Idempotency-Key: same-thing` it might reuse the client A response for client B... 

Idempotency keys should expire so cannot be reused for long, but it's something to think about. This can be mitigated by recommending clients use UUID's for their Idempotency-Key, which would make it pretty unlikely for multiple clients to clash on the same key unless somebody is sniffing traffic.

Thankfully generally your authentication logic should help solve the problem. If you register multiple middlewares you can make sure the auth is happening before the idempotency middleware, and if you run the code yourself in controllers/routes then just run the security checks before you check for idempotency keys. However you go about it, just make sure you can't steal responses by clashing/guessing/stealing a key.

## Source Code

Give this a go for yourself to see if you can get the hang of using Idempotency Keys for real, and save your end-users and support staff the headache of unpicking mistakes. The source code is available [over here](https://github.com/philsturgeon/express-idempotency-key-demo) and you can clone it down to see how it works.

There's many libraries similar to [express-idempotency](https://www.npmjs.com/package/express-idempotency) for other frameworks to make this easy elsewhere too. See what you can find, and if there's nothing for your framework consider knocking up an open-source library to help others out too.

## Further Reading

Simple idempotency key implementations like this can get you a long way very quickly, but if you have complex multi-step processes that mix up database interactions, calls to other APIs, emails, etc, then you might need [a more comprehensive implementation](https://medusajs.com/blog/idempotency-nodejs-express-open-source/) which tracks progress for each key.
