---
title: 'Unblocking Node With Unref()'
date: '2019-09-11T13:30'
cover_image: './header-images/rollercoaster.jpg'
---

Node.js runs on an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). It holds a queue of tasks to run, and runs them, one by one. New tasks appear on the queue while it runs, added by your code (setTimeout) or outside events (a network connection), and the process simply continues until the queue is empty.

That's all great, until it isn't.

Occasionally you want to break out of that model. What happens if you want to run a schedule task on a fixed interval indefinitely? Typically, life gets difficult: you need to include & manage an explicit shutdown process for that interval, and if you ever forget to shut it down then the process will keep running forever, with no explanation. Ouch.

I hit ran into this whilst working on [Mockttp](https://github.com/httptoolkit/mockttp) (the HTTP interception & testing library behind HTTP Toolkit). Mockttp needs to keep track of your current local IP addresses, to help detect and warn about request loops. That data can change occasionally, so it needs to poll it on an interval, but it's very annoying to have to remember to carefully shut that process down in addition to everything else.

Fortunately, it turns out you can fix this easily! Enter unref:

## Timeout.Unref()

Timer functions like `setInterval` and `setTimeout` in Node.js return a [Timeout object](https://nodejs.org/api/timers.html#timers_class_timeout), representing the ongoing timer.

These can be passed to `clearInterval` or `clearTimeout` to shutdown the timer entirely, but they also have a little-used `unref()` method. This does something magical: it keeps running your code, but stops it from keeping the process alive. Like so:

```js
// Update my data every 10 seconds
const interval = setInterval(() => updateMyData(), 10000);
// But don't let that keep the process alive!
interval.unref();

// Log a message if the app is still running 10 seconds from now
const timeout = setTimeout(() => console.log('Still going'), 10000);
// But still shutdown cleanly if it wants to stop before then:
timeout.unref();
```

This functions like a flag you can set on your timers, marking them as tasks that node doesn't need to wait for. They'll run as normal while the process is alive, but if the rest of the event queue is empty then they're ignored, and the process exits anyway.

You can also mark the timer as important again with `timer.ref()` or (in Node 11+ only) check whether it's currently configured to block exit of the process with `timer.hasRef()`.

If you want to see this in action, you can check out the fix for Mockttp over here: https://github.com/httptoolkit/mockttp/blob/master/src/util/socket-util.ts#L58-L71

## Gotchas

There's three last things worth noting here:

* Although this can let you skip complicated cleanup processes, it doesn't make them worthless. Especially if your timer is doing something expensive, it's very often useful to provide an explicit shutdown command instead. This isn't a subsitute for cleaning up after yourself!
* This can come with a small performance cost, as it's actually implemented using a separate scheduled task. Using a few is fine, but if you're creating very large numbers of these you might see a performance impact.
* You shouldn't be using this everywhere. If you use this on a timeout you care about, you'll discover that your app is unexpectedly exiting half way through, way before you're expecting. This is similar to weak maps: it's a tool for specific situations, not an option for every day.

While you're here, if you like Node & want to supercharge your debugging skills, take a look at **[HTTP Toolkit](https://httptoolkit.com/javascript/)**. One-click HTTP(S) interception & debugging for any Node.js script, tool or server (and lots of other tools too).