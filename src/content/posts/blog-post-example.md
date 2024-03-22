---
title: 'Example with the new Idempotency Keys RFC'
date: '2024-03-22T15:00'
cover_image: 'header-images/vpn-active.jpg'
author: Bejamas
authorUrl: https://philsturgeon.com/
tags: http, standards, apis
---

<HighlightedParagraphs>
Idempotency is when doing an operation multiple times is guaranteed to have the same effect as doing it just once.

When working with APIs this is exceptionally helpful on slow or unreliable internet connections, or when dealing with particularly sensitive actions such as payments, because it makes retrying operations safe and reliable. This is why most payment gateways like [Stripe](https://stripe.com/docs/api/idempotent_requests) and [Adyen](https://docs.adyen.com/development-resources/api-idempotency/) support 'idempotency keys' as a key feature of their APIs.

Recently, the IETF have gone further, and created [a draft RFC standard](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/) for this useful common pattern, as part of the 'Building Blocks for HTTP APIs' working group. This is technically still a draft and the details could change, but it's fairly mature now and increasingly widely used, so it's a good time to take a closer look, and start using & implementing it for yourself.

</HighlightedParagraphs>

## Idempotency in HTTP APIs

Many HTTP methods are defined as idempotent in all cases. In theory, any GET, HEAD, PUT, DELETE, OPTIONS, or TRACE operation can be executed multiple times without any unintended side effects (though for badly behaved APIs your mileage may vary).

The idea is that an HTTP request like `DELETE /users/123` clearly wants to delete that user, and if that accidentally happens twice then that's just fine. User 123 ends up deleted just the same.

It's a lot more complicated for POST and PATCH requests, which do not provide that same level of confidence out of the box. These are designed to allow non-idempotent operations, like adding a new user, sending a payment, or appending to existing data. Those are important use cases too - sometimes you really do want to send the same thing twice, and have it happen twice - but this can cause problems when things go wrong.

<CTABox
title="A brief introduction to OpenAPI"
subtitle="see also"
buttonHref="/example"
buttonText="Learn more"
buttonIcon={props => <CaretRight {...props} />}
/>

## How can non-idempotency go wrong?

Without idempotency keys, whether or not a client wants a repeated request to be executed twice or not is usually impossible to guess. For example, you might build a payment-sending client app, which has a timeout set to 2 seconds like this:

```js
await axios.post('/payments', { to: 'user@example', value: 2000 }, { timeout: 2000 });
```

If that doesn't complete within 2 seconds, the HTTP client is typically going to show the request as failed, and ask you if you'd like to try again.

Unfortunately though, in this scenario the client doesn't actually know whether the server has successfully completed the payment. It was running a little slow, sure, but maybe it sent the payment and just hadn't quite finished spitting out the JSON yet. Meanwhile, the server has no idea the client gave up and told the end-user the payment failed. The server thinks the payment is done, but the client does not. This creates a problem.

The server could try to write some logic to detect duplicate payments, but is that something you always want to automatically block?

```js
POST /payments

{
  "amount": 5.00,
  "to": "julian1342",
  "reason": "cider"
}
```

If the server receives this request twice, it could be a failed retry, or it could just as easily be somebody paying Julian for a second cider.

### Idempotency keys to the rescue

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

### How can you get started with idempotency keys?

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
