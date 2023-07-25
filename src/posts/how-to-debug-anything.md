---
title: 'How to Debug Anything'
date: '2019-12-02T15:00'
cover_image: './header-images/code.jpg'
twitterUrl: https://twitter.com/pimterry/status/1201517994729447425
redditUrl: https://www.reddit.com/r/programming/comments/e5096w/how_to_debug_anything/
hackerNewsUrl: https://news.ycombinator.com/item?id=21682919
devToUrl: https://dev.to/pimterry/how-to-debug-anything-11o3
---

Debugging is an important skill for any developer. Arguably the most important skill, if you consider debugging in the general sense: exploring a system, explaining its behaviour, and working out how to change it.

Nonetheless, most of us are bad at it. We don't methodically work through a process. Instead, we guess wildly, sprinkle logging at random and change things blindly, until the problem disappears.

Fortunately, we can improve! I've been talking to a whole range of brilliant developers about their top debugging advice to put together a superguide to debugging, drawn from all their years of expertise, and my own software development experiences.

So, without further ado: how do I debug?

## Narrow down your problem

In most debugging situations, you start with a mismatch between what you expect and reality.

* The user clicked a link to our website. I expected it to load for them, but it never did.
* Server A sent a request to server B. I expected it to receive a result within 100ms, but server B took 20 seconds.
* The customer entered their credit card details correctly. I expected them to be charged, but they never were.

To be able to fix a problem, we need to understand it sufficiently that there's a clear & acceptable fix available. Note that 'sufficient' is contextual: sometimes "server B is broken, we can just reset it" is fine, sometimes "server B has disk corruption caused by our pattern of IO usage" is just the beginning.

Let's look at how to isolate the location of the problem first, and we'll explore how to explain it (and fix it) later.

> Narrow down the area where things can be going wrong: it's not working here, so is everything correct at x earlier point? Yes? How about y point between here and x? - [Nicole Williams](https://twitter.com/elielicole)

Your first step is to focus your debugging down to a sufficiently small area that you can start thinking about fixes.

In effect, you're running tests to separate the parts of your system that are working correctly from the parts that aren't, repeatedly. This is an incremental process, and I'd highly recomend taking careful notes as you go, to keep track.

Sometimes the separating lines are clear. If you have a single function, which gets the correct inputs but produces the wrong outputs, your next step is to examine the values at points within that function, and work out at which point they go wrong.

Sometimes, it's less clear. Some tips:

### If the system is in a broken state

* Which state exactly is 'broken'?
    * If your data store breaks due to inconsistent data, which of the inconsistent parts is incorrect?
    * If your server runs but stops responding: do all endpoints stop responding, or just a few?
* When was it last in a good state?
* Exactly what event changes it from a good to a bad state?
* Which part of its state breaks _first_?
    * For non-trivial state, it's useful to untangle the dependencies within, to understand how they affect one another.
    * This is useful to work out whether variable A & B were both set wrong, or variable A was set wrong and variable B was set correctly, but based on that wrong data.
    * Applies to low-level state like variables but also high-level state like 'is the server responding'. If server A & B sometimes both go down, do they both crash for the same reason, or does one crashing kill the other?

### If the system is made up of communicating parts

* Which one makes the first mistake?
* For example, if your app fails to load data from the server:
    * Is it requesting the right data from the server?
    * Is the server returning the right data?
* [HTTP Toolkit](https://httptoolkit.com) is perfect for doing this, if you're using HTTP!
* If you can answer those questions, you immediately know whether the server or the app is at fault (assuming only one is broken...)

### If the issue is intermittent

* Do anything you can to narrow it down to a specific & consistently reproducible error.
* Are there any common factors between the times it appears?
    * The user's operating system/browser, the time of day, size of your data and system load are all good candidates.
* Try to decide if it's caused by race conditions, or specific rare inputs.
    * If you can take a set of safe & reliable operations, run a lot of them rapidly, and they then consistently fail, it's _probably_ a race condition.
    * If there's any common factors in when it appears that aren't just correlated with system load, it's _probably_ something else.
* Once you have a clear race condition, you can remove and shrink the parallel operations until you can find what's racing.
* Once you have specific inputs that cause a failure, you can reproduce the issue and investigate why.

You don't just have to search the code for the cause!

Sometimes you can search within your set of servers or users, to narrow down where the bug appears to a specific machine that's doing the wrong thing, which can provide a wealth of clues.

Sometimes it can also be useful to narrow down the problem in time, to find the moment this behaviour changed (if you're confident it worked in the past) so you can see which parts of the system were changed at a similar time, and investigate those more closely.

> Isolate as many variables as you can and test each one by itself until you figure out the issue - [Stacy Caprio](https://stacycaprio.com/) from [Accelerated Growth Marketing](http://acceleratedgrowthmarketing.com/)

> If something is null/missing, where was it meant to be coming from? Follow the flow back, don't just look at the place where the error is - [Nicole Williams](https://twitter.com/elielicole)

In many of these cases, there's multiple dimensions: where the problem occurs, and what input causes it.

Once you've found the point that things go wrong, it's these inputs that become important. You need to work through the same kind of process to narrow down which part of your input causes the problem.

'Input' here is very general: it might be an HTTP request you receive, a database record that you're processing, a function parameter, the current time of day, or your network latency. It's any variable that affects your application.

The process here is much the same, but for complex inputs this is one place where a good diff can be very valuable. Find a working input, find a bad input, and compare them. Somewhere in that set of differences is your problem! You can replace parts of the bad input with the good input (or vice versa) until it fails, to pin down the minimal bad data required to trigger the issue.

For simple inputs it's easier, but there's still some comparison required. For example, if your UI throws an error when trying to display some prices: for which prices does that happen? Is it an issue with too large inputs, unexpected negative inputs, or certain inputs that cause calculation errors later on?

> Binary search all the things; if you can rule out half the possibilities in one step then do it - [Tom Hudson](https://twitter.com/TomNomNom)

Once you have a range of possibilities for what could cause your problem, in some sense, test in the middle of the two. Your intuition for where the problem lies is probably wrong. Given that, the middle is going to get you to the right answer faster and more reliably than anything else.

This is solid advice for everything from debugging a single broken function (examine the state of your values in the middle) to an entire codebase (where it's well worth learning [how to `git bisect`](https://flaviocopes.com/git-bisect/)).

## Get visibility

High-level processes are all very well, but sometimes you can't clearly see inside a broken part of your system, and you're unable to dig any deeper.

Production servers are a classic example, along with issues that only hit certain customer's devices but never yours, or intermittent issues that you can't reliably reproduce. You need to get information on what that the system is doing at each step, so that you can narrow down the problem.

The first & best option is to somehow reproduce the issue in an environment that you do have visibility into (e.g. locally). Collect whatever you can, and try to reproduce it. If you can do this everything is great! You win. This should definitely be your first port of call.

Often you can't though, either because it's hard to reproduce in other environments, or because can't see the details even in your environment of choice. Fortunately, there's a lot of tools to help you get that visibility:

### Logging & observability tools

> If I've got the offending function at hand, I have a good logger like Chrome DevTools, and my build doesn't take long, logging variable contents is my quick-and-dirty first step.
> \- Aaron Yoshitake from [Pick a Kit](https://pickakit.com/)

> Error logging is the first thing I google when playing with a new programming language.<br/>
> While comprehensive debugging and benchmarking toolkits exist for most platforms out there, simple error logging can do miracles both during local testing and in production environments.<br/>
> Depending on the application, logs can be generated in a file, passed to a third party, or even stored in the database. Navigating through the user flow can be facilitated with a simple logging framework that every language out there supports out of the box.
> \- [Mario Peshev](https://mariopeshev.com/)

There are built in logging tools for every language & tool out there. They're easily accessible, simple & flexible, and can quickly help you narrow down the issue enough to understand it, or at least get closer to reproducing it.

Logging can be a blunt instrument though: difficult to do usefully at scale, or to get deep context into what's going, and often not in place in the one spot where you need it.

As a first step beyond these, it can be worth looking at automated logging tools. Error monitoring services like [Sentry](https://sentry.io) for example will record errors automatically, along with the stacktrace & context of the system, and the details of interesting events shortly before the error, from HTTP requests to console messages.

Meanwhile, tools like [LogRocket](https://logrocket.com) let you replay user sessions to see what they saw, and understand issues you can't reproduce accurately yourself. This is powerful, but recording user sessions can also come with privacy concerns.

Finally, there's also more heavy-duty observability tools available, such as [Honeycomb](https://www.honeycomb.io/) and [New Relic](https://newrelic.com/).

These tools like take substantially more setup, but can offer you far more data, and more power to explore it: from checking all SQL queries triggered by a given incoming HTTP request to exploring the exact distribution of latency between each of your servers on Tuesdays. They'll collect some data automatically, but also require you to log data points at relevant points in your application, so there's some effort involved. If you're running a large system though, and frequently debugging issues in production, then it's well worth the investment.

For all kinds of tools like this, it's best if you've set them up beforehand! There's often still value in setting them up as you're investigating an issue though, so don't discount them if you haven't.

### Debuggers

Your language will have proper debugging tools, which allow you to walk through your system, line by line. That's mostly relevant in local environments, but tricks like sending your customer a debug build of the app to reproduce the issue can help in other cases too.

Either way, debuggers are most useful once you're reasonable sure _where_ the problem is, and you want to examine it up close to work out the exact details.

Being very familiar with the standard debugging tools for your environment is extremely valuable. Don't just learn the basics; many will go beyond just adding breakpoints and examining variables, and include more powerful features that you can use to more quickly & effectively find your issue:

* Conditional breakpoints, which pause execution at a point in the code only when some condition is met.
* The ability to manipulate state or even the code itself while it's running, to reproduce issues & test fixes.
* [Time travel](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/time-travel-debugging-overview), allowing you to fully explore the execution flow of your process.

Don't shy away from debugging into your platform itself too. Even if the bug is caused by your code, sometimes stepping through the built-in functions that you're using can show you how you're using them wrong.

### Interaction inspectors

Often, issues will appear in the interactions between systems, and being able to see and interact directly with the communications powering these interactions can quickly solve them.

[HTTP Toolkit](https://httptoolkit.com) fits in perfectly here. HTTP Toolkit makes it easy to intercept & view HTTP or HTTPS traffic from clients, between backend servers, or sent to APIs, and to then edit that traffic live too, so you can test edge cases and narrow down which part of your inputs is causing you trouble.

Alternatively, if you're working with a different protocol, or you need to inspect at the raw TCP level, [Wireshark](https://www.wireshark.org/) can be a godsend. Wireshark lets you capture & view raw packet data, and provides tools to interpret & filter packets with an understanding of a variety of protocols, although that can mean it has a steep learning curve.

Interactions often happen between networked systems of course, but there are other interactions you can inspect too. [Strace](https://strace.io/) or [DTruss](http://www.brendangregg.com/DTrace/dtruss) allow you to inspect & modify the interactions between a process and the kernel, for example. They trace system calls, including each individual file & socket operation, and many others. This can help you to understand low-level OS issues, to see exactly which files or sockets a program is trying to use, or to explore very complex performance or deadlock problems.

### Interactive code exploration

For debugging knotty algorithmic code, exploration of the data and its processing can be very effective.

Tools exist to let you do this interactively, turning code into something conceptually more like a spreadsheet: where you can see each of the intermediate values as all at once, and change one value or calculation to see how it affects everything else.

[Quokka.js](https://quokkajs.com/) does this for JavaScript & TypeScript, as a plugin to a variety of different editors. [Light Table](http://lighttable.com/) meanwhile is a fully fledged IDE designed for exactly this workflow, originally designed for clojure, but now with plugins available for other languages too.

## Explain the problem

Hopefully at this point, after using your visibility into your system to incrementally narrow down your problem, you have a good idea where & how things are going wrong.

The next step is to work out why.

In many cases, once you narrow down the specific part of your system or state that's incorrect, the mistake will be obvious. You're adding instead of multiplying a value for example, or you've forgotten to validate clearly bad input data before using it. In other cases it's not though, and explaining the issue so you can fix it can be a big challenge in itself.

### Check your assumptions

> Validate all assumptions. Does that function *really* return what you think it does?
> Read documentation *carefully*.
> Check spelling, casing, punctuation.
> Actually read the error message instead of glancing at it.
> \- [Tom Hudson](https://twitter.com/TomNomNom)

As humans, we make assumptions and build abstractions around how things work, to avoiding constantly thinking about every possible detail.

Sometimes these are wrong.

It's very easy for this to end up causing major bugs that are hard to unpick, even for the most simple assumptions. If a problem seems inexplicable, as if the computer is just doing the 'wrong' thing, you've almost certainly run into this, and you're making the wrong assumption somewhere.

* Check the right function is being called, or the right server is being talked to.
* Check you're running the version of the code you think you are.
* Check that a value you checked elsewhere hasn't been mutated later.
* Check you actually return your values, and properly wait on asynchronous events.
* Check the error in the logs that you're trying to explain is the _first_ unexpected error, not just a symptom of a previous issue.

### Search for answers

Searching the internet for explanations of confusing behaviour is a time worn debugger tradition.

Often you'll struggle though, and it's not as easy at it sounds for complex issues. If just searching from your description of the problem doesn't work, there's a few things you can try:

* Search for potential answers to your problem, not just the question. Rather than "fetch request to X fails", try "X doesn't support gzipped requests" or "fetch can't send JSON".
* Search for snippets of any error messages you can see, or any other related logging, even if it's not the problem itself.
* Search StackOverflow directly, filtering questions by tags to hone your results.
* Search the issue tracker for the tools involved, to find bug reports related to your issue.
* Search for examples of working projects that might include similar code, compare your approach to theirs, and look very closely at the places where they differ.

### Check on the usual suspects

[Tom Hudson](https://twitter.com/TomNomNom) has a good list of common things to watch out for:

> Common reasons for weird behaviour:
> \* No disk space (or no free inodes!)
> \* Network issues (especially DNS)
> \* System time set wrong (that one's caused some really weird issues for me)
> \* Antivirus interfering
> \* Filename casing (e.g. case sensitive on linux, but not mac or windows)

Any of these can cause strange errors elsewhere, that are seemingly unrelated, and extremely hard to trace down!

It's useful to collect your own list of these kind of issues. Some common problems will be very general, like these, but there'll also be common culprits unique to your own platform or system. Keep a list somewhere, note down the cause of each problem you have to debug, and you'll quickly build a library of things to watch out for in future.

### Talk about it

> Explain the issue to someone else.
> \- [Veronika Milic](https://twitter.com/_kifki/)

Still stuck? If all else fails, sometimes [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging) is often the best solution. Talk to a colleague, ask a question on Stack Overflow, or post on Twitter. Asking for help is important, and there's a surprising number of people who'd love to explore your problem.

Try to explain everything you understand about what's currently happening, and what the inexplicable part is. Half the time you'll end up solving it yourself along the way, and the other half of the time at least you have somebody else who'll try to help!

## Fix it

Hopefully, you can now explain which part of your system is broken, and why that's happened. The last step is up to you I'm afraid: fix it. Fortunately, if you understand where the code is broken and why it's wrong, that's normally a fairly clear process (though not necessarily a quick one).

Once you do fix your issue though, do yourself a favour and remember to:

* Thoroughly retest the fix after writing it, rather than assuming it works based on your understanding of the problem. Failing to do this is very painful, wastes a load of your time, and is yet remarkably common.
* Write some notes on how you debugged the issue, and your best understanding of the underlying issue & how it happened. At the very least this will help you debug similar issues in future, and in some important cases this highlights that your fix doesn't actually make any sense given your explanation, so one of the two is wrong.

Good luck!

_Still stuck? Have questions or comments on this article? Have any great debugging tips of your own? Get in touch [on Twitter](https://twitter.com)._