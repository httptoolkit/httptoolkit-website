---
title: 'How to Debug Node.js Segmentation Faults'
date: '2020-08-12T11:20'
cover_image: 'header-images/wrecked-car.jpg'
draft: false
tags: cors, node.js
---

Oh no, your JavaScript code isn't just throwing an exception or crashing: it's _segfaulting_. What does that mean, and how can you fix it?

You'll know this happens because node will hard crash, exiting silently without any kind of real stack trace, perhaps printing just `segmentation fault (core dumped)`.

(If you do get a normal JavaScript stack trace on the other hand, then you're dealing with a normal JS error, not a segfault. Lucky you! You might be more interested in the guide on [How to Debug Anything](/blog/how-to-debug-anything/))

## What is a Segmentation Fault?

> A segmentation fault occurs when a program attempts to access a memory location that it is not allowed to access, or attempts to access a memory location in a way that is not allowed (for example, attempting to write to a read-only location, or to overwrite part of the operating system).
> \- [wikipedia.org/wiki/Segmentation_fault](https://en.wikipedia.org/wiki/Segmentation_fault)

In practice, a segfault occurs when your program breaks some fundamental rule set by the operating system. In that case, the operating system sends your process a signal (SIGSEGV on Mac & Linux, STATUS\_ACCESS\_VIOLATION on Windows), and typically the process shuts down immediately.

The rules that you can break to cause this include things like reading or writing to an invalid memory address (e.g. native code somewhere trying to use a null pointer as a memory address), causing a stack or buffer overflow, or reading or writing from memory that's not yours (maybe it was yours but it's now been released, maybe it's unused, or maybe it's owned by another process or the operating system).

All of these cases involve low-level concerns, like pointers & memory management. You shouldn't normally have to worry about this when writing JavaScript! The language runtime normally manages your memory, doesn't expose the kinds of APIs that could cause these issues, and enforces its own rules on the APIs that are available, to guarantee that your code behaves correctly.

That all ensures that the underlying operating system's rules are never broken, and ensures that any time you do accidentally try to take any invalid actions, you get a clear error that appears straight away, rather than random failures later.

Unfortunately, there are a few cases where you can still hit segfaults in Node:

* When you use [native addons](https://nodejs.org/api/addons.html) (either directly, or because one of your dependencies uses them), so you're effectively running your own native code as part of your application. If that native code is either buggy or just incompatible with your version of Node, you'll often get segfaults.
* If you manipulate parts of the internal private state of Node objects. This can break Node's assumptions, so that Node's built-in native code does the wrong thing, resulting in segfaults.
* When Node.js itself has a bug somewhere, and segfaults all by itself.

## How can I fix it?

### Find the culprit

First, you need to work out which of the 3 cases above you have.

Native addons are always the most likely cause here. There's a couple of things to try straight away:

* Rebuild all your native node modules with `npm rebuild`. This will recompile native code with your current version of node, and should resolve any issues where your native modules are compiled for the wrong node version.
* Find all the native modules you have installed, by searching your node_modules folder for `.node` files. On Linux/Mac you can list them with:

  ```bash
  find node_modules -iname "*.node"
  ```

  If you have no native modules installed, you can rule that case out entirely. If you do have modules installed there that seem related to the crash you're seeing, then that's probably a good place to start looking.

You can also try to get more detail on the segmentation fault itself.

To do this, you can use the [Segfault-Handler](https://www.npmjs.com/package/segfault-handler) module. Just run `npm install segfault-handler`, and then add the below right at the start of your application code:

```javascript
const SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler('crash.log');
```

That module listens for any SIGSEGV signal, and reports the detailed stack trace that caused it before the process shuts down. When you next hit your segmentation fault, you'll get something like this:

```javascript
PID 30818 received SIGSEGV for address: 0x20
[...]/node_modules/segfault-handler/build/Release/segfault-handler.node(+0x3127)[0x7fdb5a5fb127]
/lib/x86_64-linux-gnu/libpthread.so.0(+0x128a0)[0x7fdb735f58a0]
node(_ZN4node7TLSWrap6EncOutEv+0x170)[0xa09010]
node(_ZN4node7TLSWrap7DoWriteEPNS_9WriteWrapEP8uv_buf_tmP11uv_stream_s+0x2c7)[0xa0a6c7]
node(_ZN4node5http212Http2Session15SendPendingDataEv+0x4ce)[0x93b5ae]
node(_ZN4node5http212Http2Session5CloseEjb+0xda)[0x93c4fa]
node[0xb62a3f]
node(_ZN2v88internal21Builtin_HandleApiCallEiPPNS0_6ObjectEPNS0_7IsolateE+0xb9)[0xb635a9]
[0xcec6c2dbe1d]
[1]    30818 segmentation fault (core dumped)  node ./bin/run start
```

That's the output from a segmentation fault I was hitting recently, where the new HTTP/2 debugging support in [HTTP Toolkit](/) occasionally crashed the Node process, after certain patterns of connections & disconnections.

A trace like this doesn't give you enough to fix the issue, but it does give a clear clue where the problem lies.

In my case, the `SendPendingData` method of an `HTTP2Session` is trying to write to a TLS stream as the session closes down, and that's then crashing the process. That gave me some clear info: it's an issue with HTTP/2 requests, and it's happening in node itself, not a native addon. From there, a [quick search](https://github.com/nodejs/node/issues?q=http2+segmentation+fault+is%3Aopen) of the Node issue tracker led me to a [reported bug](https://github.com/nodejs/node/issues/29902), and eventually to a workaround.

### Find a fix

From here, you should have some pointer towards the code that's buggy. If there's a suspicious native addon module involved then that's almost certainly the culprit, and you should start there.

Otherwise, if the trace is clearly pointing to Node internals (as above) and you're not messing around with those yourself, or using any relevant native addons, then you've probably found a bug in Node. Congratulations! Node should never segfault if you're writing normal JavaScript code, so something very wrong is going on.

From here, there's a few good next steps:

* Update to the latest version of Node/the node module in question, and make sure the same bug still appears there.

  In many cases just a quick update of the right thing will solve your issue, and if not then maintainers will be much happier to help you investigate if they know it's definitely a current issue.

* Double-check your code is using the failing code as intended.

  Check the documentation of the related properties and methods you're accessing, and make sure that they are indeed documented (i.e. you're not unexpectedly messing with internal state) and that you're following the instructions in that documentation correctly. It's often useful to look through the native module's test code too, to see some examples of how it's supposed to be accessed.

* Report the issue to the addon maintainers/Node team.

  GitHub is your friend here: use the details you've found to **do a quick search on the relevant repo's issue tracker first**. The Node issue tracker is available at [github.com/nodejs/node/issues](https://github.com/nodejs/node/issues).

  If you're lucky, you'll find an issue with more information, and maybe even an existing workaround. You can then add any extra details you have and an upvote there to help the maintainers. Of course, if not, it's time to file a bug for yourself.

  Either way the best way to ensure these bugs actually get fixed is to provide a reliable way for other developers to reproduce the issue. The more information on how to do so, and the simpler the steps required, the better.

* Use your segfault trace to find the relevant code, add detailed logging or use debugging tools, and very carefully walk through the code that's failing to try and find something that's not quite right.

  If you're not familiar with the code in question, and you haven't written native addons for Node.js before this can be intimidating and difficult. It's worth a go though, and you don't need to understand the code perfectly to do this. In many cases you'll quickly spot a comment or clue for why this crash could occur, that'll lead you back to a nice clean fix in your own JavaScript.

  Especially in native addons, you'll often find that they make certain assumptions (this method will never be called twice, this parameter will never be undefined) that aren't always checked everywhere. Any of these can easily mean that a minor bug in your code results in the addon's native code doing completely the wrong thing, and crashing the whole process.

* Find a workaround: change how you're using the module in question, use a different module entirely for now, delete the broken feature from your product entirely, or quit your job and go live in the forest.

Hopefully that's enough to show where the issue is, and get the information to fix or workaround it so you can get your code back on track.

Have any other suggestions or advice for others in the same place? Send me [a message](/contact/) or let me know on [Twitter](https://twitter.com/pimterry).