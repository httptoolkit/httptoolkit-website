---
title: "Testing libraries for the Decentralized Web"
date: '2022-10-24T17:00'
cover_image: './people-network-graph.jpg'
---

The world of decentralized web applications is an exciting place that has exploded in recent years, with technologies such as IPFS and Ethereum opening up possibilities for a peer-to-peer web - creating applications that live outside the traditional client/server model, where users to interact and control their own data directly.

At the same time, it's still immature, and for software developers it lacks a lot of the affordances & ecosystem of the traditional HTTP-based web app world. There's far fewer tools and libraries for developers working in this space.

I've been working on improving this over the last year (as one part of [a project](https://httptoolkit.com/blog/developer-tools-decentralized-web/) funded by EU Horizon's [Next Generation Internet initiative](https://www.ngi.eu/)), by building network interception libraries for both IPFS & Ethereum: MockIPFS & Mockthereum. These each act as both an immediately useful automated testing library, to support modern integration testing & CI workflows, and a base for building more general network proxy tools for web applications using either (or both) technologies.

**If that sounds cool and you just want to jump straight in and try these for yourself, you can get started at [github.com/httptoolkit/mockipfs/](https://github.com/httptoolkit/mockipfs/) and [github.com/httptoolkit/mockthereum/](https://github.com/httptoolkit/mockthereum/).**

On the other hand, if you want to hear what this can do in practice, and learn a little about how it works under the hood, read on:

## A new way to build web apps

Decentralized web apps often use a mix of many different technologies, at various layers of the stack, such as:

* [IPFS](https://ipfs.tech) - for decentralized static content hosting & data storage
* [Ethereum](https://ethereum.org/) - for decentralized consistent global state, computation on that state, and financial transactions
* [Filecoin](https://filecoin.io/)/[Storj](https://www.storj.io/) - for paid decentralized long-term content storage
* [WebRTC](https://webrtc.org/) - for peer-to-peer raw data transfer, and video/audio connections
* [Service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - a JavaScript API allowing fully offline web apps
* [Handshake (HNS)](https://handshake.org/)/[Ethereum Name System (ENS)](https://ens.domains/) - to map domain names to web applications
* [GunDB](https://gun.eco/) - a decentralized database for the web, with peer-to-peer syncing
* HTTP - for interactions with the existing 'traditional' web, and for communication with nodes that allow access to many of these protocols.

By combining these technologies, it's possible to create a web application that's served from a distributed network, rather than a single server that can go offline or be blocked, and which stores data, communicates with others, and generally provides all the features you'd expect from a traditional SaaS webapp.

Right now, an example architecture for this looks something like:

* Publish a JS-based single-page webapp to IPFS, using service workers to make it run entirely offline and locally
* Use HNS/ENS to map a domain name to the published content hash
* Allow users to communicate peer-to-peer via WebRTC, either sending messages directly or using GunDB over the top to sync a structured data store
* Publish user's persistent content to IPFS (potentially encrypted) which they can either pin locally in their IPFS node, or pay to mirror via Filecoin/Storj
* Modify global state or support paid transactions via Ethereum.

Given such a setup, a user with a compatible browser (Brave, by default, or Chrome/Firefox/etc with the [IPFS companion](https://docs.ipfs.tech/install/ipfs-companion/) & [Metamask](https://metamask.io/) extensions installed) can load the web app, use it on their machine and send & receive data from others, all without a single central server involved, and with all data stored either locally, or on a service under their own control.

Even if the original publisher ceases to exist and all their infrastructure turns off, if well designed around this model, users will be able to keep using the app forever.

That's the theory at least. In practice, there's quite a few rough edges, so this is complicated and challenging, but it's an interesting space with many new technologies appearing and evolving constantly. Even today, the above list is very far from complete! Put together, these technologies hint at an interesting future of decentralized technologies on the web.

How HTTP connects to this is notable though. While each of these protocols is independent of HTTP, for browser connectivity in web apps many of them use HTTP as the last-mile transport. For IPFS, for example, you would typically run an IPFS node on your machine that communicates directly with the IPFS network, then configure your browser to use that node for all IPFS, and then all IPFS interactions would happen by making HTTP requests to the node from your web app. Similarly, for Ethereum, in the vast majority of cases Ethereum interactions on the web involve an HTTP request to a hosted Ethereum API (this isn't the same as a centralized service, since any working node will work equally well, but some hosted node must be used).

## Enter MockIPFS & Mockthereum

If you build a web app like this, you'll quickly discover that testing it is a serious challenge. There's few tools or libraries available, so you're forced to either mock out the APIs, libraries or raw HTTP requests entirely manually (non-trivial and very hard to do accurately) or run a real IPFS/Ethereum node for testing (slow, heavy, limited, and with persistent state - useful, but not what you want for automated testing use cases).

MockIPFS & Mockthereum take a different approach: stateless and fully configurable mocking at the HTTP level, with a built-in interpretation and mocking for HTTP interaction protocols used between client libraries and hosted nodes.

This means you can:

* Mock the results of most common interactions for both protocols in one line of code.
* Directly monitor, log or assert on all Ethereum/IPFS interactions made between a client and the networks.
* Simulate scenarios like connection issues and timeouts.
* Create, reset & destroy mock nodes in milliseconds.
* Run multiple fully isolated mock nodes at the same time on the same machine, with minimal overhead, to easily run tests in parallel.

## Testing a dweb app using IPFS with MockIPFS

There's many ways a decentralized web app might want to interact with IPFS, but the most common is that you'll want to read some IPFS data from a CID, so let's use that as an example.

To do this on the web, you'd typically write code like:

```javascript
import * as IPFS from "ipfs-http-client";
import itAll from 'it-all';
import {
    concat as uint8ArrayConcat,
    toString as uint8ToString
} from 'uint8arrays';

const IPFS_CONTENT_PATH = '/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu';

async function runMyApp(ipfsNodeConfig) {
    const ipfsClient = IPFS.create(ipfsNodeConfig);

    // ...
    // Somewhere in your code, read some content from IPFS:
    const content = await itAll(ipfs.cat(IPFS_CONTENT_PATH));
    const contentText = uint8ToString(uint8ArrayConcat(content));
    // ...
}

runMyApp({ /* Your IPFS node config */ });
```

This uses [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client), the widely used official library for using IPFS on the web, to make an HTTP request to a local IPFS node for an IPFS content id (`Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu`, in this example).

Using MockIPFS to test this code, and mock out the result returned, looks something like this:

```javascript
// Import MockIPFS and create a fake node:
import * as MockIPFS from 'mockipfs';
const mockNode = MockIPFS.getLocal();

describe("Your tests", () => {
    // Start & stop your mock node to reset state between tests
    beforeEach(() => mockNode.start());
    afterEach(() => mockNode.stop());

    it("can mock & query IPFS interactions", async () => {
        // Define a rule to mock out this content:
        const ipfsPath = "/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu";
        const mockedContent = await mockNode.forCat(ipfsPath).thenReturn("Mock content");

        // Run the code that you want to test, configuring the app to use your mock node:
        await runMyApp(mockNode.ipfsOptions); // <-- IPFS cat() here will read 'Mock content'

        // Afterwards, assert that we saw the requests we expected:
        const catRequests = await mockNode.getQueriedContent();
        expect(catRequests).to.deep.equal([
            { path: ipfsPath }
        ]);
    });
});
```

In this case MockIPFS handles the request, parses the API call to match the specific CID used, and then returns the content correctly encoded and formatted just like a real IPFS node, fully integration testing the entire client-side code of your app, but with none of the overhead, complexity or unpredictability of a real IPFS node.

Mocking `ipfs.cat` like this is the simplest case, but MockIPFS can go much further:

* Test content pinning & unpinning, e.g. throwing errors for invalid/duplicate pins, with calls like `mockNode.forPinAdd(cid)...`.
* Inject timeouts for IPNS queries, with `mockNode.forNameResolve(name).thenTimeout()`.
* Mock content publishing results, with `mockNode.forAdd().thenAcceptPublishAs(hash)`.

To get started, take a look at [the README](https://github.com/httptoolkit/mockipfs) for more details and the full API docs, or take a look through the [test suite](https://github.com/httptoolkit/mockipfs/tree/main/test/integration) for a selection of complete working examples covering each of the main areas of the IPFS API.

## Testing a dweb app using Ethereum with Mockthereum

When building a web app on Ethereum, one common interaction is to call a contract - i.e. to query data on the blockchain, without actually creating a transaction.

The code to do so, using the popular Ethereum web client [Web3.js](https://www.npmjs.com/package/web3), might look like:

```javascript
import Web3 from 'web3';

// Parameters for some real Web3 contract:
const CONTRACT_ADDRESS = "0x...";
const JSON_CONTRACT_ABI = { /* ... */ };

async function runMyApp(ethNodeAddress) {
    const web3 = new Web3(ethNodeAddress);

    // ...
    // Somewhere in your code, call a method on the Ethereum contract:
    const contract = new web3.eth.Contract(JSON_CONTRACT_ABI, CONTRACT_ADDRESS);
    const contractResult = await contract.methods.getText("test").call();
    // ...
}

runMyApp(/* Your Ethereum node API address */);
```

Much as with IPFS above, we can easily define a mock node which can intercept this request, returning whatever value or simulating whatever other behaviour you'd like:

```javascript
// Import Mockthere and create a fake node:
import * as Mockthereum from 'mockthereum';
const mockNode = Mockthereum.getLocal();

describe("Your tests", () => {
    // Start & stop your mock node to reset state between tests
    beforeEach(() => mockNode.start());
    afterEach(() => mockNode.stop());

    it("can mock & query Ethereum interactions", async () => {
        // Define a rule to mock out the specific contract method that's called:
        const mockedFunction = await mockNode.forCall(CONTRACT_ADDRESS) // Match any contract address
            // Optionally, match specific functions and parameters:
            .forFunction('function getText(string key) returns (string)')
            .withParams(["test"])
            // Mock contract results:
            .thenReturn('Mock result');

        // Run the code that you want to test, configuring the app to use your mock node:
        await runMyApp(mockNode.url); // <-- Contract call here will read 'Mock result'

        // Afterwards, assert that we saw the contrat calls we expected:
        const mockedCalls = await mockedFunction.getRequests();
        expect(mockedCalls.length).to.equal(1);

        expect(mockedCalls[0]).to.deep.include({
            // Examine full interaction data, included decoded parameters etc:
            to: CONTRACT_ADDRESS,
            params: ["test"]
        });
    });
});
```

To get started and see the many other Ethereum behaviours that can be mocked, take a look at [the README](https://github.com/httptoolkit/mockthereum), or take a look through the [test suite](https://github.com/httptoolkit/mockthereum/tree/main/test/integration) for a selection of complete working examples covering a wide range of typical Ethereum interactions.

## Beyond testing

In the quick examples above, we've seen simple demos of how MockIPFS & Mockthereum can handle specific common interactions, by configuring a client with the mock node's address instead of the real node, so that the mock node handle all traffic independently from the wider network.

When used like this, all unmatched requests will receive default responses, e.g. all IPFS add requests will appear to succeed (whilst not really publishing anything) and all Ethereum wallet balances will be zero.

Both libraries can go beyond this though. Each can be configured to forward unmatched requests elsewhere, so that some or all traffic is passed through the mock node to a real IPFS/Ethereum node. This makes it possible to log traffic for debugging, or to mock only a subset of interactions while all other requests behave as normal.

To configure this, pass an `unmatchedRequests` option to the `getLocal` call when creating the mock node, like so:

```javascript
const ipfsMockNode = MockIPFS.getLocal({
  unmatchedRequests: { proxyTo: "http://localhost:5001" }
});
const ethMockNode = Mockthereum.getLocal({
    unmatchedRequests: { proxyTo: "http://localhost:30303" }
});
```

With this configuration, you can use these nodes as your normal node address in your browser (by configuring the address in IPFS companion/Metamask/etc) for advanced proxying use cases. By default they'll behave just like the real node they proxy to, but you can additionally add logging of received interactions, to monitor the client-side Ethereum/IPFS interactions as you browse the web, or you can mock out or even disable certain types of interactions by adding rules to match those requests.

## Getting started for yourself

It's difficult to squeeze everything that's possible with these tools in here while keeping this article short! But if this has piqued your interest already, take a look at the libraries themselves on GitHub for in-depth getting started guides and explanations, along with detailed API documentation covering their full functionality: [MockIPFS](https://github.com/httptoolkit/mockipfs), [Mockthereum](https://github.com/httptoolkit/mockthereum).

Have questions, issues or suggestions? These tools are still in an early stage, and feedback is _very_ welcome! Please file an issue on one of those repos, or get in touch directly [on Twitter](https://twitter.com/pimterry/) or [by email](/contact).

---

_This‌ ‌project‌ ‌has‌ ‌received‌ ‌funding‌ ‌from‌ ‌the‌ ‌European‌ ‌Union’s‌ ‌Horizon‌ ‌2020‌‌ research‌ ‌and‌ ‌innovation‌ ‌programme‌ ‌within‌ ‌the‌ ‌framework‌ ‌of‌ ‌the‌ ‌NGI-POINTER‌‌ Project‌ ‌funded‌ ‌under‌ ‌grant‌ ‌agreement‌ ‌No‌ 871528._

![The NGI logo and EU flag](../images/ngi-eu-footer.png)