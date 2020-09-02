---
title: "GraphQL the Simple Way, or: Don't Use Apollo"
date: '2020-09-02T12:00'
cover_image: './network.jpg'
hackerNewsUrl: https://news.ycombinator.com/item?id=24352433
redditUrl: https://www.reddit.com/r/programming/comments/il5lvb/graphql_the_simple_way_or_dont_use_apollo/
twitterUrl: https://twitter.com/HttpToolkit/status/1301131264569872384
---

The fundamentals of GraphQL are remarkably simple. Nonetheless, a busy hype train & rocket-speed ecosystem means that building a GraphQL API in the real world can be a tricky balancing act of piling complex interacting components a mile high, none of which anybody fully understands.

About 90% of this pile is built & heavily promoted by a VC-funded company called [Apollo](https://www.apollographql.com/). Apollo describe themselves as a "data graph platform" who've built the self-described "industry-standard GraphQL implementation".

Unfortunately, while I'm sure their platform is great, **if you're setting up a fresh GraphQL API you should not start with Apollo**. It certainly might be useful later, but on day 1 it's a trap, and you'll make your life simpler and easier if you avoid it entirely.

Let's talk about why that is, what can go wrong, and what you should do instead.

## The Problem with Apollo

In practice, "industry-standard GraphQL implementation" means [169 separate npm packages](https://www.npmjs.com/~apollo-bot), including:

* 44 different server packages and `apollo-server-*` subpackages.
* 7 different GraphQL 'transport layers', plus a long list of link layer extensions that build on top of this.
* 8 code generation packages
* 5 different `create-*` project setup packages
* 3 different GraphQL Babel plugins (plus a Relay un-Babel plugin, so you can avoid using Babel for some specific cases).
* Much much more...

The Apollo packages required to install the base `apollo-server` package suggested in their [Getting Started guide](https://www.apollographql.com/docs/apollo-server/) include the "Apollo Studio" (née Apollo Graph Manager, néeée Apollo Engine) [reporting engine](https://www.npmjs.com/package/apollo-engine-reporting), which integrates your server with their cloud service, plus [extra protobuf definitions](https://www.npmjs.com/package/apollo-engine-reporting-protobuf) on top of that to reporting to the cloud service with Protobuf. It includes [request tracing](https://www.npmjs.com/package/apollo-tracing) for their own custom tracing format, [multiple](https://www.npmjs.com/package/apollo-server-caching) [different](https://www.npmjs.com/package/apollo-cache-control) custom caching packages, an [abstraction layer](https://www.npmjs.com/package/apollo-link) that powers the many available transport link layers, an [abstraction layer](https://www.npmjs.com/package/apollo-datasource) for connecting external data sources...

In total, installing `apollo-server` installs actually installs 33 direct dependencies, and 179 packages in total, pulling in about 35MB of JavaScript.

Once all put together, by itself this package creates web servers that can't do anything.

If however you also use the (official, non-Apollo) `graphql` package too, then you can now just about answer complex queries like:

```graphql
{
  books {
    title
    author
  }
}
```

To be clear, that `graphql` package is the official GraphQL JS implementation, which takes a schema, a query, and a resolver (in effect, a data set object), and gives you a result. I.e. it does _all_ the GraphQL heavy lifting required to process a query like this, except the HTTP.

I know I'm treating Apollo very harshly here, and that's not wholly fair. Most of their published packages do have cases where they're genuinely useful, many of the packages I'm counting are deprecated or duplicates (though published and often still well used), and as far as I'm aware everything they've released works perfectly effectively. I certainly don't think that _nobody_ should use Apollo!

I do 100% think that Apollo shouldn't be anybody's GraphQL starting point though, and that nonetheless it's marketed as such.

They clearly want to be the entrance to the ecosystem, and of course they do! Ensuring a nascent fast-growing ecosystem depends on your free tools is a great startup play. They're the first result for "how to set up a graphql server", and either they or GraphQL-Yoga (another package on top of Apollo Server) are the suggested beginner option in most other articles on that page, from [Digital Ocean's docs](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-graphql-server-in-node-js-with-apollo-server-and-sequelize) to [howtographql.com](https://www.howtographql.com/graphql-js/1-getting-started/). This isn't healthy.

**If you're setting up a GraphQL API, you don't need all this.** Pluggable transport layers and data sources, request tracing, cool GraphQL extensions like `@defer` and multi-layered caching strategies all have their place, but you don't want that complexity to start with, and they're not a requirement to make your simple API 'production ready'.

It is great that Apollo makes these available to you, but they're features you can add in later, even if you don't start off using Apollo at all. A GraphQL schema is pretty standard, and entirely portable from the standard tools to Apollo (but not always back, if you start using Apollo's own extensions...).

If I seem personally annoyed by this, it's because I am! I was burned by this myself.

[HTTP Toolkit](/)'s internal APIs (e.g. [for defining HTTP mocking rules and querying traffic](https://github.com/httptoolkit/mockttp/blob/master/src/standalone/schema.gql)) use GraphQL throughout. Those APIs started off built on Apollo, because that's the very widely recommended & documented option. The overly complex setup required to do so caused a long stream of serious pain:

* Apollo's packages like to move fast and break things, and each often requires specific conflicting `graphql` peer dependencies, making updates remarkably [painful](https://github.com/httptoolkit/mockttp/issues/29) all round.
* The base packages include a lot of features and subdependencies, as above, which in turn means a _lot_ of vulnerability reports. Even if vulnerabilities aren't relevant or exploitable, downstream users of my packages very reasonably [don't want security warnings](https://github.com/httptoolkit/mockttp/pull/37#issuecomment-661937314), making keeping everything up to date obligatory.
* Some Apollo packages are effectively quietly unmaintained, meaning that conflicting dependencies there can block you from upgrading entirely, unless you fork the whole package yourself.
* Once you start having multiple interacting packages in your system that use Apollo this gets even worse, as dependent packages need updating in lockstep, or your peer dependency interactions explode, scattering debris for miles.
* The packages involved are _huge_: `apollo-server` alone installs 35MB of JS, before you even start doing anything (that's v2, which is 2.3x the size of the last Apollo Server v1 release, but hey the upgrade is unavoidable anyway, so who's counting?).
* These problems are getting worse. [`apollo-server` v3](https://github.com/apollographql/apollo-server/issues/2360) is coming soon, with built-in support for GraphQL federation, non-Node backend platforms, and a new plugin API. Don't get me wrong, these features are very cool, but you don't need them all included by default in your starter project!

It's not fun. However there is an alternative:

## How to Build a Simple GraphQL Server (without Apollo)

To build a GraphQL API server, you really need just 3 things:

1. A web server
2. An executable GraphQL schema (i.e. a schema and a resolver) which can together can answer GraphQL queries
3. A request handler that can accept GraphQL requests, hand them to the schema, and return the results or errors

I'm assuming you already have a preferred web server (if not, [Express](https://www.npmjs.com/package/express) is an easy, convenient & reliable choice). The official [`graphql`](https://www.npmjs.com/package/graphql) package can turn a string schema and a resolver object into an executable schema for you.

That leaves the final step, which is easily handled with [`express-graphql`](https://github.com/graphql/express-graphql): a simple Express middleware, with just 4 dependencies that handle content negotiation & body parsing. That works for Express or Connect, and there's similar tiny packages available for most other servers.

To set up your GraphQL server, install those packages:

```bash
npm install express graphql express-graphql
```

And then set up a server that uses them:

```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Create a server:
const app = express();

// Create a schema and a root resolver:
const schema = buildSchema(`
    type Book {
        title: String!
        author: String!
    }

    type Query {
        books: [Book]
    }
`);

const rootValue = {
    books: [
        {
            title: "The Name of the Wind",
            author: "Patrick Rothfuss",
        },
        {
            title: "The Wise Man's Fear",
            author: "Patrick Rothfuss",
        }
    ]
};

// Use those to handle incoming requests:
app.use(graphqlHTTP({
    schema,
    rootValue
}));

// Start the server:
app.listen(8080, () => console.log("Server started on port 8080"));
```

Run that and you're done. This is solid, reliable, fast, and good enough for most initial use cases. It's also short, clear, and comparatively tiny: `node_modules` here is just over 15% of the size of the Apollo equivalent. **Running 80% less code is a very good thing.**

In addition, you can still add in extra features incrementally later on, to add complexity & power only where you need it.

For example, in my case, I want subscriptions. [Mockttp](https://github.com/httptoolkit/mockttp) (the internals of HTTP Toolkit's proxy) accepts GraphQL queries over websockets, so it can stream intercepted request details to clients as they come in, with [a GraphQL schema](https://github.com/httptoolkit/mockttp/blob/52d4f6062c352add81571ea2e498620a3bd06322/src/standalone/schema.gql#L14-L21) like this:

```graphql
type Subscription {
    requestInitiated: InitiatedRequest!
    requestReceived: Request!
    responseCompleted: Response!
    requestAborted: Request!
    failedTlsRequest: TlsRequest!
    failedClientRequest: ClientError!
}
```

To add this, I can just expand the basic setup above. To do so, I do actually use a couple of small Apollo modules! Most can be picked and configured independently. For this case, [`graphql-subscriptions`](https://github.com/apollographql/graphql-subscriptions) provides a little bit of pubsub logic that works within resolvers, and [`subscriptions-transport-ws`](https://www.npmjs.com/package/subscriptions-transport-ws) integrates that into Express to handle the websockets themselves. Super helpful

Here's a full example:

```javascript{5-7,23-25,28,40,52-69}
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, execute, subscribe } = require('graphql');

// Pull in some specific Apollo packages:
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');

// Create a server:
const app = express();

// Create a schema and a root resolver:
const schema = buildSchema(`
    type Book {
        title: String!
        author: String!
    }

    type Query {
        books: [Book]
    }

    type Subscription { # New: subscribe to all the latest books!
        newBooks: Book!
    }
`);

const pubsub = new PubSub();
const rootValue = {
    books: [
        {
            title: "The Name of the Wind",
            author: "Patrick Rothfuss",
        },
        {
            title: "The Wise Man's Fear",
            author: "Patrick Rothfuss",
        }
    ],
    newBooks: () => pubsub.asyncIterator("BOOKS_TOPIC")
};

// Handle incoming HTTP requests as before:
app.use(graphqlHTTP({
    schema,
    rootValue
}));

// Start the server:
const server = app.listen(8080, () => console.log("Server started on port 8080"));

// Handle incoming websocket subscriptions too:
SubscriptionServer.create({ schema, rootValue, execute, subscribe }, {
    server // Listens for 'upgrade' websocket events on the raw server
});

// ...some time later, push updates to subscribers:
pubsub.publish("BOOKS_TOPIC", {
    title: 'The Doors of Stone',
    author: 'Patrick Rothfuss',
});
```

My point isn't that you need subscriptions in your app, or that everybody should use all these extra packages (quite the opposite).

This does demonstrate how you can extend your setup to progressively use these kinds of features though. Moving from request/response model to also supporting subscriptions is not a trivial change, but even in this case, adding in Apollo extensions is a few simple lines on top of the existing logic here that fits nicely into a standard setup.

You can also extend with non-Apollo tools too. Here we're building primarily around the vanilla GraphQL packages and Express directly, composing Apollo components in separately, rather than basing everything on top of them. That means you could still drop in any other Express middleware or GraphQL tools you like, to add any kind of authentication, caching, logging or other cross-cutting features just using standard non-GraphQL solutions & examples, with no lock-in from the Apollo ecosystem.

Apollo do have a wide selection of interesting & useful packages, and they should be lauded for the effort and contributions they've made to the ecosystem. At the same time though, they're not a neutral actor. Don't assume that the Next Big Thing is the right choice for your project, especially if it calls itself "industry-standard".

Instead, start simple: build a system that you can fully understand & manage, avoid unnecessary complexity, and keep your project lean & flexible for as long as you can.