---
title: 'Free as in Beer'
date: '2020-01-06T18:00'
cover_image: './open.jpg'
---

HTTP Toolkit is a bootstrapped commercial open-source project. It takes work from me, and it needs to make money to survive, but it's also directly powered by the feedback, testing & contributions of its users.

As you might imagine, this is a complicated balancing act. I want to talk a little about how and why this works now, and the next step in this direction.

## Philosophy 101

To make this work, I've taken a few philosophical positions on how HTTP Toolkit should operate. First on the business model, and second on the licensing.

### Freemium
HTTP Toolkit aims to be profitable by charging for features that power & enterprise users need, not by charging everybody. It doesn't hook you then cut you off, it doesn't nag you into submission, and it doesn't integrate itself into your life to force you to upgrade.

Instead I separate features by use cases & audience. The aim is to let free users get on with things unhindered, but ensure advanced users reward the project for the value they get from it.

This is a practical stance, rather than a purely charitable one. As a small development team, if your goal is to build great & popular software, you need a lot of marketing, and a _lot_ of user feedback. Free & widely used software provides more feedback & testers, especially early on. As long as the project is sustainable enough that somebody can actually work on that feedback, this builds better software for everybody. _Good_ free software then lends itself to word of mouth growth, some of the most effective long-term marketing possible for a small team.

All together, this is a automated virtuous cycle. More feedback makes better software makes more growth makes even more feedback.

As a model, bootstrapped freemium lets you pair sustainable businesses with a deep understanding & focus of your users. If more developer tools followed this, rather than gambling on VC for funding or going 100% freeware for growth, we might even trade shiny & transient for reliable & effective. Better tools for everybody.

That's not to say I've invented this by any means. I have a lot of respect for the others out there taking a similar approach, from [Ghost](https://ghost.org/) to [Insomnia](https://insomnia.rest) to [Basecamp](https://basecamp.com/), and many many others. It's a powerful model, especially when paired with open source.

### Open Source

On top of all that, HTTP Toolkit's audience is very technical, which makes open-source uniquely valuable. For many of us technical people software is a changing and collaborative work, not a delivered appliance. We want to be able to fix issues we find, and change the tools we use to fit into our workflow.

Customization & plugins can help with this, but with limitations. Complete freedom to change your software removes those entirely.

Feedback from users of open-source code is often more valuable too, so this pairs nicely with the freemium model above. Users can dig into underlying causes themselves, and even offer feedback in the form of failing test code, bug fixes or feature implementations. This completely closes the traditional feedback loop, collecting feedback, implementations & feedback on the result all in one go.

Unfortunately, commercializing software often involves adding other restrictions (in licensing and implementation), which limit this. HTTP Toolkit aims to avoid that, and be commercial software without restrictions. Of course the benefits are equally valid for the free version and the Pro version, so it's open-source all the way down.

To avoid wholesale copycats, I've licensed HTTP Toolkit with a mixture of AGPL (for the top-level app code) and Apache 2 (for all standalone reusable libraries within). That mix means anybody can use the shared libraries (from the [internal proxy](https://github.com/httptoolkit/mockttp) to the [react infrastructure](https://github.com/httptoolkit/react-reverse-portal) to the [indexed OpenAPI directory](https://github.com/httptoolkit/openapi-directory-js)), and anybody can read & contribute to the main app. At the same time, any separate projects building directly on the core functionality of the tool must go AGPL too though, and share all their code back in turn.

## New Decade Resolutions

So far, this has been going pretty well! I want to take it further though, and for 2020 onwards I want to get the community (you!) more involved. It's time to more directly reward those users who contribute, and involve them in the project itself.

What does that mean? It means that from now on **HTTP Toolkit Pro is free for contributors to the open-source project**.

More specifically, I'm giving out free Pro subscriptions in return for any accepted contributions that help HTTP Toolkit to develop & expand. That means things like:

* Writing articles or blog posts about HTTP Toolkit (guest authors for [this very blog](https://httptoolkit.tech/blog) welcome too!)
* Contributing fixes, features or internal improvements to the core codebases, e.g:
  * The HTTP Toolkit [UI](https://github.com/httptoolkit/httptoolkit-ui)
  * The HTTP Toolkit [server](https://github.com/httptoolkit/httptoolkit-server)
  * The HTTP Toolkit [desktop shell](https://github.com/httptoolkit/httptoolkit-desktop)
  * The HTTP Toolkit [website & docs](https://github.com/httptoolkit/httptoolkit.tech)
  * [Mockttp](https://github.com/httptoolkit/mockttp) (the HTTP Toolkit proxy itself)
  * Or any other repo in the [HTTP Toolkit github organisation](https://github.com/httptoolkit/)
* Reporting new bugs or security issues
* Suggesting new & useful features

This is not an exhaustive list, and it's intentionally not limited to code contributions. Documentation, bug reporting & marketing are some of the most important contributors to any project's successs. **My goal is to reward _anything_ that helps drive HTTP Toolkit development or bring it to new people.** I'd love to involve anybody else who wants to contribute in any way, so if you're not sure, [get in touch](/contact).

Length of Pro subscription for different contributions will vary according to my whims, but as a guideline:

* Big code changes (a new feature or bug fix) get a year's free Pro subscription.
* Small code changes (small text tweaks & typo fixes, useful dependency updates) get 1 month's free Pro subscription.
* Writing an article somewhere with a large audience (a popular blog or developer community) is a year's free Pro subscription.
* Writing an article somewhere with a small audience (a little-known blog) is a month's free Pro subscription.
* Reporting a substantial security issue is a year's free Pro subscription.
* Reporting a bugs & suggesting features varies between a month & a year depending on the details.

To get your subscription set up, just send me an email with the details, from the email account you'd like associated with your new subscription, and I'll make it happen.

If you'd like ideas for contributions, take a look through [the feedback repo](https://github.com/feedback) or the issues attached to the above repos, play around with [the tool itself](/) to find rough edges or missing features, or feel free to [get in touch](/contact) for suggestions.

If you look closely, all this is just an extension of the philosophy above! It's an expansion of the free tier - if you're a contributor to the project, HTTP Toolkit is now 100% FOSS for you - and a use of open source to feed that freemium virtuous cycle, and push the project further & higher.

Make sense? Have any thoughts on this? Get in touch [on Twitter](https://twitter.com/pimterry) or [by email](/contact).