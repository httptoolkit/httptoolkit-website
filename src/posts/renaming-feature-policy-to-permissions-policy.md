---
title: 'Bye bye Feature-Policy, hello Permissions-Policy'
date: '2020-05-27T13:30'
cover_image: './header-images/wrong-way.jpg'
hackerNewsUrl: https://news.ycombinator.com/item?id=23323044
redditUrl: https://www.reddit.com/r/webdev/comments/grjydl/bye_bye_featurepolicy_hello_permissionspolicy/
devToUrl: https://dev.to/pimterry/bye-bye-feature-policy-hello-permissions-policy-31gd
---

Ever heard of [`Feature-Policy`](https://w3c.github.io/webappsec-feature-policy/)? It's a draft W3C web security standard, defining an HTTP header and iframe attribute that sets limits on the browser features a page can use.

It's useful for any site that's concerned about XSS attacks, embedded content, security risks in dependencies, or major bugs in their own software, by setting guardrails on the browser features a page can use. You can use feature policy to guarantee your page or an embedded iframe cannot access the user's microphone or camera, can't read their location or phone sensors, can't use the Payment Request API, and so on. This is an _extra_ safeguard, in addition to the browser's own permissions system, so it only tightens existing permission restrictions further.

Feature Policy has been around a couple of years now, and got some good early press as a recommended security technique all over, from Google's [web developer guide](https://developers.google.com/web/updates/2018/06/feature-policy) to [Smashing Magazine](https://www.smashingmagazine.com/2018/12/feature-policy/).

Since then browser support has made steady progress, with about 75% of users globally [now supporting](https://caniuse.com/#feat=feature-policy) it (that's all recent browser versions except Safari). More recently that's lead to the start of real production usage: [Rails 6.1](https://github.com/rails/rails/pull/33439) and Node.js's popular [helmet](https://www.npmjs.com/package/helmet) security package recently shipped built-in support, and Scott Helme's [latest analysis](https://scotthelme.co.uk/top-1-million-analysis-march-2020/) of the top 1 million sites shows the Feature-Policy header in use by nearly 5,000 of them.

It is still just a draft though. That means it's subject to change, and it is now changing: **the Feature-Policy standard & header is being renamed to Permissions-Policy**.

There's some discussion of the reasoning in [the spec repo](https://github.com/w3c/webappsec-feature-policy/issues/359). In short:

* Many proposed additions don't mesh with the existing Feature-Policy behaviour, so these (along with some of the existing features) are being defined instead in a new [Document-Policy](https://w3c.github.io/webappsec-feature-policy/document-policy.html) header, with different semantics focused on feature _configuration_, rather than security.
* The remaining features are a strict subset of the [separately defined](https://w3c.github.io/permissions/#permission-registry) set of web permissions.
* Renaming offers an opportunity to change the header value syntax, to align it with the new [Structured Headers](https://datatracker.ietf.org/doc/draft-ietf-httpbis-header-structure/) standard.

Any kind of migration of web standards comes with some risk. In this case, a different risk than normal: removing or renaming this header won't break anything outright, but it does silently remove a security safeguard from existing sites (scary).

The exact migration plan is unclear, but it seems likely that browsers will include support for the existing header & syntax for a while with a warning, to ensure this is as obvious as possible for the existing sites that expect it to work. Seeing this change in the real world is still a couple of browser releases away, so we'll have to wait to find out exactly how each browser decides to handle this.

Consider this an early warning though: if you're currently using Feature-Policy, you're going to want to migrate soon, and as a community we've got a whole bunch of documentation that's going to need updating.

Want to test out Feature/Permissions policy headers right now? Fire up **[HTTP Toolkit](/)**, set some breakpoint rules, intercept some real web traffic, and rewrite the live headers to your heart's content.