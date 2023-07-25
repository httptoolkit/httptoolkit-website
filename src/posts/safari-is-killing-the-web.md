---
title: "Safari isn't protecting the web, it's killing it"
date: '2021-07-28T15:50'
cover_image: './header-images/broken-iphone.jpg'
---

There's been a lot of discussion recently about how "Safari is the new IE" ([1](https://blog.perrysun.com/2021/07/15/for-developers-safari-is-crap-and-outdated/), [2](https://daverupert.com/2021/07/safari-one-offs/), [3](https://www.safari-is-the-new-ie.com/), [4](https://blog.logrocket.com/safari-next-internet-explorer/), [5](https://nolanlawson.com/2015/06/30/safari-is-the-new-ie/)).

I don't want to rehash the basics of that, but I have seen some interesting rebuttals, most commonly: Safari is actually protecting the web, by resisting adding unnecessary and experimental features that create security/privacy/bloat problems.

That is worth further discussion, because it's widespread, and wrong.

More specifically, Safari's approach isn't protecting the web from bloat & evil Google influence, because:

* Most features that Safari hasn't implemented have no hint of security, privacy or performance concerns, and they've been implemented in every other browser already.
* The largest Safari complaint is unrelated to experimental features from the Chrome team: it's the showstopping bugs in implemented features, made worse by Safari's slow release cycle.
* Refusing to engage with the contentious API proposals for real use cases doesn't actually protect the web anyway - it just pushes web developers and users into the arms of Chromium.

We'll dig into each of these points in more detail in a second, and then we'll talk about what Safari could do instead.

There have been other arguments made too, including much speculation about _why_ Safari might be killing the web - is this motivated by protecting Apple's app store profits? I'm going to ignore those suggestions entirely, and stick to concrete problems. Their reasons are their own, outside Apple we can do little more than guess, and the concrete issues can make the point without conjecture.

Before we start, I do want to recognize that the Safari/WebKit team are working hard, and I do desperately want them to succeed! Chromium's domination is bad for everybody, and building a popular browser that's focused on privacy & security, as they appear to be trying to do, is a fantastic goal. That does not mean their current approach deserves our blind support.

I'm sure the Safari team are working on the issues below already, and I think it's likely that the problems fundamentally derive from management decisions about company priorities rather than the team themselves. Unfortunately though, today there are big problems, and the current trajectory is making the web worse, not better.

Of the three points above, I think the final one will be most interesting and contentious, but let's get the first two cleared up first:

## Safari is killing the web by omitting easy safe features

A frequent argument made is that the features which Safari does not implement all either:

* Reduce user privacy, by supporting tracking
* Risk security, by increasing the browser attack surface
* Hurt battery life, by making web pages bloated & inefficient

This isn't true. Here's a quick list of some of the features that every other browser has implemented but Safari has not, with no suggestion of any privacy, security or battery life concerns:

* CSS's `contain` property, which isolates an element's layout from the rest of the DOM, improving browser render performance, and simplifying page layout for developers through isolation. Implemented in Chrome in 2016, and Firefox in 2019.
* CSS's `offset-path` property, which allows elements to be animated declaratively along SVG paths. Implemented by Chrome in 2015 and Firefox in 2020.
* CSS's `overflow-anchor` property, which stops pages jumping around while the user is reading. Implemented in Chrome in 2017 and Firefox in 2019.
* Resolution media queries, which allow content to be styled to match the device pixel density. Implemented in Firefox in 2012 and Chrome in 2013.
* `:focus-visible`, which avoids accessibility/design conflicts by showing focus styling only during keyboard navigation. Implemented in Chrome in 2020 and Firefox in January 2021.
* TouchEvents, supporting multi-touch and touch gestures on the web. Implemented in Chrome in 2012 and Firefox in 2017.
* BroadcastChannel, which allows pages on the same origin to easily communicate, e.g. to log all pages out together. Implemented in Firefox in 2015 and Chrome in 2016.
* `beforeprint` and `afterprint` JavaScript events, allowing pages to dynamically customize print layouts beyond simple media styles. Implemented in IE 6 (!!!) in 2001, Firefox in 2011 and Chrome in 2018.
* Regex lookbehind in JavaScript. Implemented in Chrome in 2017 and Firefox in 2020.
* `scrollIntoView({ behavior: 'smooth' })` to scroll to an item on the page. Implemented in Firefox in 2015 and Chrome in 2017.
* Screen orientation JavaScript APIs, allowing pages to dynamically handle screen orientation changes. Implemented in Chrome in 2014 and Firefox in 2016.
* AV1 video and AVIF images, a new efficient and freely licensed compression format. Implemented in Chrome in 2018 and Firefox in 2019.

Each of these has a published standard and is implemented by multiple browser engines, including Firefox, with no concerns I can see anywhere. There's been no specific public objections from the Safari team on any of these that I can see, only silence.

As far as I'm aware, there's also no signal from the Safari team that any of these are coming any time soon, and I've omitted quite a few more missing features that are implemented, but behind flags (often for years) but which are presumably going live sometime soon.

According to [Can I Use](https://caniuse.com/)'s metrics, Safari is lacking about 10% behind Firefox and 15% behind Chrome in feature support. That's including every basic feature like HTML images, forms and links - so it's a major underestimation of the modern feature set.

Meanwhile the web platform tests dashboard (unaffiliated with any vendor, with contributors from Mozilla, Google, Apple and across the industry) has its own metric for this, a count of browser support for their list of core web features most used by web developers. Safari is [not doing well](https://wpt.fyi/interop-2021?stable):

![Safari trailing far behind Firefox and Chrome is core feature support](./wpt-compat-stats.png)

The "_they're only ignoring bad features_" argument is made weaker by Safari's previous behaviour with such missing features, where many have eventually been implemented without objection, but years behind other browsers. If there was a good argument against these features, they should clearly never have been implemented.

There's no good case for implementing web platform features but just many years after everybody else, such as:

* Date and time input types - released 4 years after Firefox and 9 years after Chrome
* Service Workers, for page request middleware (offline support & caching) - released 2 years after it was supported everywhere else
* AbortController, to abort fetch requests and other async operations - released a year after it was supported everywhere else
* IntersectionObserver, to detect element visibility, e.g. to allow deferred loading - released 2 years after it was supported everywhere else
* Form validation - technically released just ahead of Firefox & Chrome, but so broken as to be unusable for 7 years
* WebP images - released 1.5 years after Firefox and 6 years after Chrome

There are hundreds more examples like this, where features are discussed, implemented and standardized in every other major browser, but not in Safari for years afterwards. This adds delays easy real-world use of otherwise standardized features shipped by every browser for an extra year or two (on top of the existing time for standardization & implementation) if it's ever implemented at all.

Again: these are not contentious features shipping by only Chrome, they're features with wide support and no clear objections, but Safari is still not shipping them until years later. They're also not shiny irrelevant features that "bloat the web" in any sense: each example I've included above primarily improving core webpage UX and performance. Safari is slowing that down progress here.

Ignoring standards like this does not help the web evolve more cautiously - once these features have been stable for years in every other browser they can't be changed anyway. A far better way to improve APIs would be to ship such features early in Safari, behind flags & origin trials, and gather feedback from as wide an audience of developers and browser implementors as possible before they become stable, so that feedback can help every browser include better APIs.

Instead, whenever Safari doesn't support otherwise widely available web features, developers can't depend on them 100%, so some will hold back on using them (especially in mobile use cases) or hack in workarounds, and so clear feedback is reduced, issues are harder to find, and the development of good web APIs is made harder for everyone.

I'll avoid guessing at the reasons for all this, but it is clear that it's a new development. In the past (the early 2010s) Apple was frequently leading the way on new features, as the very first browser to ship major JavaScript APIs like Web Workers, and the browser driving experimental prefixed features like [CSS Canvas backgrounds](https://webkit.org/blog/176/css-canvas-drawing/). It's exceedingly rare now to see a web feature primarily driven by Apple. Something has changed.

## Safari is killing the web through show-stopping bugs

In addition to missing features, Safari has a lot of bugs in its implemented features of various web standards. Many of these bugs have serious effects, where an otherwise working webpage entirely fails or has its layout significantly broken, etc. Here's a sample of the current bugs that exist in the latest stable Safari release:

* IndexedDB APIs hangs indefinitely on initial page load, making it almost completely unusable: https://bugs.webkit.org/show_bug.cgi?id=226547
* LocalStorage is broken when a page is open in more than one tab, in a way likely to cause major data loss in most use cases: https://bugs.webkit.org/show_bug.cgi?id=225344
* Support for `background-attachment: local` has suddenly completely disappeared: https://bugs.webkit.org/show_bug.cgi?id=219324
* Some Fetch requests incorrectly completely skip the service worker: https://bugs.webkit.org/show_bug.cgi?id=187461
* Using `border-image` with `border-style: none` is rendered completely wrong, reported 9 years ago: https://bugs.webkit.org/show_bug.cgi?id=99922
* Focus events for non-input elements behave differently in Safari to every other browser, reported 13 years ago: https://bugs.webkit.org/show_bug.cgi?id=22261
* Safari incorrect blocks `localhost` as mixed content when accessed from an HTTPS page (but allows it from HTTP!), breaking use cases from Spotify to Ethereum: https://bugs.webkit.org/show_bug.cgi?id=171934
* 100vh (100% viewport height) means a different thing in mobile Safari to everywhere else: https://bugs.webkit.org/show_bug.cgi?id=141832
* Fetch request streaming is implemented just enough to pass feature detection, but it doesn't actually work: https://twitter.com/jaffathecake/status/1420306878580547586
* `Mousemove` events fire when modifier keys are pressed, even if the mouse isn't moved: https://twitter.com/jaffathecake/status/1420315350009356293
* Appending an element to the shadow DOM in many cases hard crashes the browser process, making sites including redhat.com completely inaccessible: https://bugs.webkit.org/show_bug.cgi?id=224408

There's many many more. Moving from anecdotes to data: the graph below counts the number of [web platform tests](https://wpt.fyi/about) from the full suite that fail in only one browser. The yellow line is Safari, clearly failing far more tests than Firefox & Chrome, for years:

![A graph, showing Safari failing far more tests than any other browser](./wpt-browser-failures.png)

For every bug above and all the data in that graph, pages that correctly use the standard APIs - those that are fully supported by both Firefox and Chrome (in the localStorage case, supported by IE8!) - are broken for all Safari users.

This is bad. It's made much worse by the incredibly slow pace of Safari releases. Here are the browser release cycles today:

* Chrome: every 6 weeks, planning to move to every 4 weeks in Q3 2021
* Edge: every 6 weeks, planning to move to every 4 weeks in Q3 2021, with an 8-week stable enterprise option
* Vivaldi: every 6 weeks
* Firefox: every 4 weeks
* Brave: every 3 weeks
* Safari: every 6 months

Spot the odd one out.

(That's just for stable bugfix & feature releases - browsers also ship their own nightly/beta/preview releases and urgent patches for critical security issues outside this schedule)

This makes the whole problem _so_ much worse, because even if bugs were quickly recognized and fixed, they're going to be around for at least 6 months, and likely well beyond too (because updates are manual and tied to OS updates, rather than automatic, background & low-hassle).

That means that even in the best case, web devs and JS library authors everywhere have to add permanent workarounds for every Safari issue, and support those workarounds for at least a year, rather than quick fixes to work around Firefox bugs that may only exist for a little over 4 weeks. Dave Rupert wrote [an excellent article](https://daverupert.com/2021/07/safari-one-offs/) this week, listing his specific set of workarounds required to get Safari to behave like every other modern browser. It's hard work.

As an example: the localStorage bug above seriously breaks a core web API, and was very quickly fixed (within 24 hours! Superb) but today nearly _3 months later_ that working fix still hasn't been released to users, and all the Safari team can say is:

> We are aware of how important this bug is.  We have no comment on future releases.
> \- [https://bugs.webkit.org/show_bug.cgi?id=225344](https://bugs.webkit.org/show_bug.cgi?id=225344#c18)

It's hard to overstate how bad this is for the web.

Right now, every single website that wants to store any data in local storage has to simply accept unpredictable unnecessary data loss, and it's likely that this will continue for months to come. It's sort-of possible to work around this by using IndexedDB instead, but that itself is broken too by the other bug above.

This slow release cycle also cuts down on Safari's ability to get feedback, push fixes & test experiments through frequent iterative releases. A key change in software development over the last 10 years has been a move towards smaller and more incremental releases, rather than occasional big-bang deployments. Getting software into the hands of users as quickly as possible, and building a pipeline to take the resulting feedback, make changes and deploy fixes, and get a new release out again quickly is incredibly valuable.

It's a shame to see Safari avoid the benefits iterative releases entirely, and it's making the other problems here much worse.

## Safari is killing the web by ignoring proposed new APIs

We've talked about the uncontentious standard APIs that Safari doesn't support. Let's talk about the contentious experimental ones.

These APIs, often proposed by the Chrome team, give browsers power to use bluetooth, write to local files, and sync content with servers in the background. For each of these, Safari and Firefox have signalled that they intend to ignore the API entirely, never implementing it, due to security, privacy & battery life concerns.

Firstly, I do think that Chromium is overly aggressive in pushing new APIs and publishing them before proper consensus is reached. Building consensus on web standards is extremely important, and it often feels like Google's team can be keener to immediately ship new APIs than take the time to work with other vendors, and ship the _right_ API.

That said, many of the contentious APIs they've proposed - from Web Bluetooth to Filesystem Access - are clearly tapping into genuine use cases and real demand. Read through the replies to https://twitter.com/jensimmons/status/1418920407642656775 (from Apple's Web Dev Evangelist), the comments on Firefox's discussion of the [File System Access API](https://github.com/mozilla/standards-positions/issues/154) or [WebMIDI](https://github.com/mozilla/standards-positions/issues/58), or Safari's issue for [Web Push](https://bugs.webkit.org/show_bug.cgi?id=182566).

Behind the debate, there are floods of passionate developers, excited to build products on top of these technologies, and fighting to get wider support for them.

Given that there is real demand for these features, and Chrome is keen to ship them, this poses a very big problem for Safari, Firefox, and others.

### The problem with popular features

I'm very sympathetic to the argument that there are security & privacy concerns around these features. Unfortunately though, Safari & Firefox live in a world where the leading browser, with far larger marketshare than both of them combined is absolutely going to fulfil the demand and ship these new APIs.

**There is no plausible option where other vendors stop these features coming to the web entirely**. In many cases, they're already there. There's only a world in which they stop them reaching beyond Chrome's 65% market share (~70%, including all Chromium-based browsers, or ~80% for desktop).

[Progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) is an approach often used as a solution to web compatibility concerns like this. Unfortunately, in a situation where the leading browser builds a popular feature that can't be polyfilled, and minority browsers try to ignore it indefinitely, progressive enhancement means:

1. Chromium ships a feature, other browsers don't
1. If it's a valuable feature, web developers will use it when available, but with some fallback behaviour for other browsers
1. Other browsers get a worse experience, and this hurts metrics/engagement/etc
1. Web developers put up a "Works best in Chrome/Edge/Opera" notice, to encourage users towards the best experience
1. Users switch to Chromium and get a good experience
1. Other browsers slowly die, the browser ecosystem collapses, the web dies, sadness

That's not to say that every website will use these shiny new APIs - they're mostly isolated to web _application_ use cases. In some ways that's worse though: your average user isn't going to install a new browser to read a news article, but they might if it offers them reliable notifications from their chat app (background push), makes it easier to work with a webapp they use at work every day (native filesystem), or if it's required to set up a new bluetooth gadget (web bluetooth). Once they switch for one thing, it significantly increases the change they switch for everything.

**You might be thinking "I don't care - I won't switch to Chrome, I don't want webapps that use these APIs"**. That doesn't matter.

The percentage of users who'll never use Chrome out of principle is vanishingly small compared to the group of users who will switch to the best tool for the job. If Chromium is genuinely more functional than other browser engines, users will switch to Chromium, and your experience of the entire web will get worse as your alternative browser's market share shrinks and developers begin to ignore it, no matter what non-Chromium browser you want to use or what web pages you visit.

The health of the browser ecosystem affects everybody.

In Safari's case, the risk of this would be reduced if supporting Safari was easy and they had a well of web developer goodwill from which to draw. Back in the early days of Firefox vs IE, Firefox's tiny initial market share was less problematic because web developers would actively work to ensure their sites worked there, as it was a nice browser to support and use. Unfortunately (see the first two sections of this article) Safari is _not_ easy to support, and decidedly does _not_ have web developer goodwill to rely on.

All this isn't theoretical - **this is visibly happening today**. These features are popular enough that they're in use in real products on the web right now, and the above process is exactly what is happening.

For example, if you buy an [Espruino](https://www.espruino.com/) (a popular programmable IoT gadget) the recommended dev process is their [web-based IDE](https://www.espruino.com/Web+IDE), which uses Web Bluetooth, and requires a Chromium-based browser:

![The Espruino setup instructions](./espruino-bluetooth-setup.png)

Similarly, Excalidraw (a popular online whiteboarding tool) offers [a far better UX](https://blog.excalidraw.com/browser-fs-access/) only to browsers with the filesystem access API (Chromium only), Godot Engine (a open-source game engine) is now building a [web-based editor](https://godotengine.org/article/godot-editor-running-web-browser/) which will require filesystem access API support (Chromium only) for convenient saving & loading, and Noteflight (a popular music composition service) shut down their existing MIDI adapter and [moved their primary workflow](https://notes.noteflight.com/web-midi/) onto Web MIDI (Chromium only).

These APIs are already part of the fabric of the web. These are popular webapps (Noteflight has 6 million users, Excalidraw has 22,000 github stars), many users want to use them, and they have core functionality that only works well in Chromium.

Of course, it's still early days, and the likely reality isn't that the browser ecosystem will actually collapse at the end of this. Despite Firefox & Safari's concerns, if an API really takes off and reaches critical mass, the reality is that they'll have to just implement these APIs as they are, or risk becoming incompatible with the real-world web.

That is a mildly better result - we still have multiple compatible browsers - but only very mildly: at that point, they have unintentionally allowed Google to unilaterally set web standards. We should avoid that.

### The walls are falling down

This paints a bleak picture. The one saving grace today is that Apple blocks use of any non-WebKit engine on iOS, which protects that one environment, and the iOS market (in the US at least) is large enough that this means Safari must be prioritized.

Unfortunately however, Apple is currently tied up in antitrust battles, where allowing alternate browser engines on iOS is a plausible legal imposition, or a plausible concession to avoid accepting alternate app stores. This restriction seems unlikely to last forever.

Even if that restriction does hold, there's nothing to stop the above playing out on desktop alone, where Chromium already has 80% market share. Notable, all the examples above where this is happening today are desktop-focused webapps. And on mobile, while this restriction helps, Chrome is still holding steady at 64% market share (and rising - up 3 points since November 2020), which is easily a large enough audience that some web apps will accept losing non-Chromium users in return for the chance to build a app or game on the web in ways that would be totally impossible in Safari/Firefox.

There are two clear parallels with the past here:

* The slow death of IE: by offering web developers fewer bugs, better tools and more features while IE stagnated, Firefox built enough developer goodwill to dramatically expand its marketshare against the odds, forcing IE (later Edge) to follow its lead.
* WebExtensions: despite every browser previously offering their own add-on APIs, Chrome effectively dominated developer mindshare, provided more powerful & easier to use extension APIs that became far more popular, and both Firefox & Safari have eventually killed their own APIs and accepted Chrome's, unintentionally allowing Google to unilaterally set the web extension standard.

Chrome is following the same path today: offering web developers more powerful tools and a better development experience (better devtools, fewer bugs) than Safari. If nothing changes, the outcome is likely to be similar. This is bad.

### There is a better way

So, outright ignoring popular features will not stop them happening, and risks either giving all market share to Google, or all browsers being forced to follow Google's standards. What the hell do we do instead?

**Safari, Firefox and others need to make _better_ proposals for these use cases.**

If they're concerned that Web Bluetooth (for example) could be abused, they need to work together and with the Chrome team to improve permissions controls and UX, tighten up standards, limit functionality to the minimum for real use cases, give users control over these APIs, and build standards to support these use cases without endangering users.

At the end of the day, it's very hard to sell "We're the browser that doesn't support bluetooth" once users start seeing websites with cool features that require bluetooth. It's much easier to sell "We're the browser that _securely_ supports bluetooth while protecting your privacy".

This is hard, but it's absolutely not impossible.

Some ideas:

* Expose no information/access to web applications without explicit permission from the user (I think this is already the case for these APIs, but let's set a clear baseline).
* Support limited functionality, or extra permissions for dangerous functionality, e.g. Web MIDI without SysEx instructions by default.
* Avoid permissions fatigue, by disallowing sensitive permissions popups or PWA install prompts before significant user engagement (repeated visits, manual PWA install, etc).
* Don't allow permissions prompts for sensitive permissions at all - require the user to actively enable something in the browser UI to activate sensitive features per-domain.
* Build a reputation system linked to domain names, and restrict access to some APIs or show louder warnings on that basis until domains gain reputation.
* Go even further: require these PWAs to register with the app store, tie a personally-identified Apple developer subscription to them, and ban accounts that abuse them.
* Alternatively: Sell more expensive HTTPS certificates that are required to use sensitive APIs on the open web.
* Allow all users who don't want these APIs to easily disable such features from the whole web in their browser settings.

These are not all good ideas. None of them are perfect, there are complex tradeoffs and challenges, and yes these are absolutely hard problems. There are a lot of clever people involved in each of these teams though, Apple have a lot of motivation and money available to work on this, and the alternative is that the Google approach happens regardless, and Safari/Firefox have to either become incompatible with the web or accept Google's standard as-is later on.

It's also important to remember that today any website can already use bluetooth, by getting you to download and run a binary (or install an app with bluetooth permissions). Protections don't have to be perfect - they just have to be significantly harder to defeat than it is to convince a user to run a malicious binary.

This is all a lot of work though, and I am sympathetic to Firefox's own position here: they just don't have to the resources to seriously keep up with Google's engineering efforts. That is not the case for Apple, and by combining forces Apple would help keep Firefox in the game to limit Google's dominance outside of Apple's own platforms. Apple have the oompf to lead web standards, keep up with Google, and push alternative approaches if they choose to. Right now it seems they're choosing not to.

## Let's protect the web

Ok, wrapping up:

* The features Safari has not implemented are generally _not_ dangerous - the clear majority are widely accepted standards.
* The "Safari is the next IE" argument is well supported by Safari's many showstopping bugs and the extra workarounds required for developers - it's not a misunderstanding of Safari's battle to protect privacy & security.
* Safari and others can't simply ignore serious proposals for popular features that Chrome wants to implement. They need to engage and offer alternatives, or the problem will only get worse.

It's not accurate to describe Safari's approach as protecting the web, and right now it looks more likely that it is making the web worse for everybody.

For the new proposed APIs specifically, in the end they'll either have to engage with Chrome's proposals, or become incompatible with the growing part of the web that has, losing large portions of their userbase and their influence on standards along the way. There is no point in winning on principles if there are no users left.

**I want to see a world where Apple, Mozilla, Microsoft and Brave are leading web standards**, driving the web forwards with features that support new use cases and allow for exciting new products, but with care for user privacy, tracking-resistance and security embedded as first-class priorities.

I want a world where Safari, Firefox, Chrome & others all support a consistent set of evolving APIs, working together to avoid showstopping bugs or release fixes for them quickly, and giving web developers a consistent reliable platform to build on.

Right now, that's not happening. I'm scared that Safari's current approach of outright refusal and neglect of the web is going to give us the exact opposite result, and all the evidence suggests that's starting to happen already.

Apple has the resources to do this, and arguably a responsibility to do so if they want to support the privacy and security of their users. If they don't, the web is in big trouble.