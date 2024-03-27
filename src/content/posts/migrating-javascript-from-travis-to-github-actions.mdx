---
title: 'Migrating a JS project from Travis to GitHub Actions'
date: '2020-10-27T11:45'
cover_image: 'header-images/factory.jpg'
tags: cli, testing
---

Travis has been the most popular place to build open-source code for a long time, but the world is moving on. GitHub Actions is modern, tightly integrated with the most popular code hosting platform in the world, flexible, fast, and free (for public repos).

Travis has been popular for years though, there's still a lot of projects being built there, including many of [HTTP Toolkit](/)'s own repos.

Last week, I decided to bite the bullet, and start migrating. Travis was having a particularly bad build backlog day, and HTTP Toolkit is entirely open source on GitHub already, so it's super convenient. I've been looking longingly at GitHub Actions builds on other projects for a little while, and I'd already seen lots of useful extensions in the [marketplace](https://github.com/marketplace?type=actions) of drop-in action steps that'd make my life much easier.

Unfortunately, I knew very little about GitHub actions, and I already had some Travis configuration that worked. In this post, I want to share how I converted my JavaScript (well, TypeScript) build from Travis to GitHub, so you can do the same.

## The Goal

I decided to start with the simplest Travis setup I had: the [HTTP Toolkit UI repo](https://github.com/httptoolkit/httptoolkit-ui).

Here's the previous `travis.yml` file:

```yml
dist: xenial
sudo: required
language: node_js
node_js:
    - '14'
install:
    - npm ci
services:
    - xvfb
before_script:
    - sudo chown root /opt/google/chrome/chrome-sandbox
    - sudo chmod 4755 /opt/google/chrome/chrome-sandbox
script:
    - npm test
addons:
    chrome: stable
```

There's a few notable things here:

* I want to build with a specific node version.
* I need Chrome & XVFB installed for testing with Puppeteer & Karma.
* There's some existing workarounds (`before_script`) for Travis.yml in here.
* The build itself is just `npm ci` to install dependencies and then `npm test`.
* Although not shown here, some of the npm dependencies include native node extensions, and need a working native build environment.

One other feature I'd really like, and which I'd strongly recommend for everybody, is the option to **run an equivalent CI environment locally**.

Yes, you can install and run tests on my machine normally, but especially with more complicated builds you'll quickly discover that that isn't a _perfect_ match for the cloud build environment, and you'll occasionally hit remote failures that don't reproduce in your own environment. Slightly different versions of Chrome or Node, leftover git-ignored files and build output, and other environment-specific details can cause havoc.

Being able to quickly reproduce the exact cloud build environment locally makes debugging those issues much less frustrating!

## Getting Started

We'll start with GitHub's [JavaScript action getting started guide](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-nodejs).

That summarizes the options available, and with a little wrangling that quickly gets us to a basic workflow (which I've saved as `.github/workflows/ci.yml`) matching the essential steps of the Travis config:

```yml
name: CI
on: push
jobs:
  build:
    name: Build & test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # Install Node 14
      - uses: actions/setup-node@v1
        with:
          node-version: 14

      # Install & build & test:
      - run: npm ci
      - run: npm test
```

Very clear and easy: every time code is pushed, check it out and use node 14 to install dependencies & run the tests.

Note that I've skipped the Chrome & XVFB steps here entirely - we don't need them. The GitHub base image (`ubuntu-latest`) includes Chrome set up for testing and a enough of a native build environment that you can immediately install native modules and get going. Great! You can see the full standard list of what's available in each image here: https://docs.github.com/en/free-pro-team@latest/actions/reference/specifications-for-github-hosted-runners#supported-software.

You may find there's one small code change required though: you need to pass `no-sandbox` as an option to Chrome, if you're not already using it. This ensures Chrome runs happily in containerized environments like this (I think the `chrome-sandbox` steps in the Travis config were actually old workarounds for this on Travis).

In [my Karma config](https://github.com/httptoolkit/httptoolkit-ui/blob/64b89dec90f5ea86290b4091008974b06639d519/test/unit/karma.conf.js#L30-L36), using headless Chrome, that looks like this:

```javascript{5}
browsers: ['ChromeHeadlessNoSandbox'],
customLaunchers: {
    ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
    }
}
```

For Puppeteer, my [browser launch code](https://github.com/httptoolkit/httptoolkit-ui/blob/64b89dec90f5ea86290b4091008974b06639d519/test/integration/smoke-test.spec.ts#L24-L29) looks like this:

```javascript{3}
puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
}),
```

Very easy. A quick `git push` and you'll see your job start running on GitHub's cloud runners straight away.

But we also wanted reproducible local builds too...

## Build Like a Local

Being able to locally reproduce your CI builds is essential for a healthy CI workflow, and with GitHub Actions it's already very easy.

To run builds locally, we can use [act](https://github.com/nektos/act). GitHub Actions is built on Docker, starting images specified and injecting configuration into containers to run your build. Act does the exact same thing: parsing your workflow and automating Docker on your local machine to build in the exact same way.

To try this out:

* Install [Docker](https://www.docker.com/get-started), if you don't have it already
* Install [act](https://github.com/nektos/act#installation)
* Run `act`

That will automatically find `.github/workflows/*.yml` files in your current directory, and attempt to run them. Unfortunately, in my project that doesn't work so well:

```
| > registry-js@1.12.0 install /github/workspace/node_modules/registry-js
| > prebuild-install || node-gyp rebuild
|
| prebuild-install WARN install No prebuilt binaries found (target=14.14.0 runtime=node arch=x64 libc= platform=linux)
| gyp ERR! find Python
| gyp ERR! find Python Python is not set from command line or npm configuration
| gyp ERR! find Python Python is not set from environment variable PYTHON
| gyp ERR! find Python checking if "python" can be used
| gyp ERR! find Python - "python" is not in PATH or produced an error
| gyp ERR! find Python checking if "python2" can be used
| gyp ERR! find Python - "python2" is not in PATH or produced an error
| gyp ERR! find Python checking if "python3" can be used
| gyp ERR! find Python - "python3" is not in PATH or produced an error
| gyp ERR! find Python
| gyp ERR! find Python **********************************************************
| gyp ERR! find Python You need to install the latest version of Python.
| gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
| gyp ERR! find Python you can try one of the following options:
| gyp ERR! find Python - Use the switch --python="/path/to/pythonexecutable"
| gyp ERR! find Python   (accepted by both node-gyp and npm)
| gyp ERR! find Python - Set the environment variable PYTHON
| gyp ERR! find Python - Set the npm configuration variable python:
| gyp ERR! find Python   npm config set python "/path/to/pythonexecutable"
| gyp ERR! find Python For more information consult the documentation at:
| gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
| gyp ERR! find Python **********************************************************
| gyp ERR! find Python
| gyp ERR! configure error
| gyp ERR! stack Error: Could not find any Python installation to use
| gyp ERR! stack     at PythonFinder.fail (/opt/hostedtoolcache/node/14.14.0/x64/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:307:47)
| gyp ERR! stack     at PythonFinder.runChecks (/opt/hostedtoolcache/node/14.14.0/x64/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:136:21)
| gyp ERR! stack     at PythonFinder.<anonymous> (/opt/hostedtoolcache/node/14.14.0/x64/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:179:16)
| gyp ERR! stack     at PythonFinder.execFileCallback (/opt/hostedtoolcache/node/14.14.0/x64/lib/node_modules/npm/node_modules/node-gyp/lib/find-python.js:271:16)
| gyp ERR! stack     at exithandler (child_process.js:315:5)
| gyp ERR! stack     at ChildProcess.errorhandler (child_process.js:327:5)
| gyp ERR! stack     at ChildProcess.emit (events.js:315:20)
| gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
| gyp ERR! stack     at onErrorNT (internal/child_process.js:465:16)
| gyp ERR! stack     at processTicksAndRejections (internal/process/task_queues.js:80:21)
| gyp ERR! System Linux 4.15.0-121-generic
| gyp ERR! command "/opt/hostedtoolcache/node/14.14.0/x64/bin/node" "/opt/hostedtoolcache/node/14.14.0/x64/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
| gyp ERR! cwd /github/workspace/node_modules/registry-js
| gyp ERR! node -v v14.14.0
| gyp ERR! node-gyp -v v5.1.0
| gyp ERR! not ok
| npm ERR! code ELIFECYCLE
| npm ERR! errno 1
| npm ERR! registry-js@1.12.0 install: `prebuild-install || node-gyp rebuild`
| npm ERR! Exit status 1
```

Whilst `act` runs build steps just like GitHub Actions does, it doesn't use the exact same base image (in part because the same image naively built locally would be [50GB](https://github.com/nektos/act/issues/196#issuecomment-619735743)!). There's a couple of options:

* If you're only using basic features (normal node modules, and running `node` scripts), `act` will work out of the box and you're all good.
* You can use act's own [full-fat image](https://hub.docker.com/r/nektos/act-environments-ubuntu/tags), which includes all the standard GitHub tools in a somewhat smaller image size. This is opt-in, because it's still an up-front 6GB download (and then 18GB locally, once it's uncompressed) but it'll immediately give you everything you need from the GitHub Actions cloud environment.

    To use this, you just need to map `ubuntu-latest` (the GitHub base runner) to the published image, with:

    ```
    act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04
    ```
* If you're familiar with Docker, you can build your own base image including just the extra tools you need. This gives you a convenient matching environment (within the selected subset of tools) with none of the disk space & download hassle.

    This is what I've done for HTTP Toolkit. The [dockerfile](https://github.com/httptoolkit/act-build-base/blob/main/Dockerfile) directly runs the setup scripts from the act base image repo (in turn generated from GitHub's own setup scripts), but only runs the ones I care about: `build-essentials` (for native builds) and Chrome. That shrinks it down to a mere 300MB download, and below 1GB on disk.

    You can do this for yourself, customizing your own image, or if you need the exact same customizations you can use the HTTP Toolkit image with:

    ```
    act -P ubuntu-latest=httptoolkit/act-build-base
    ```

    It is possible with this approach that your base image could diverge in behaviour from the GitHub runner. You're using the same scripts, for the scripts you include, but if you skip running a script that would affect your build then you could see differences here. To _guarantee_ reproducibility, you can fix this by setting `container: httptoolkit/act-build-base` (for the HTTP Toolkit image) in the job in your GitHub workflow, thereby ensuring you use the exact same image in both places.

If you do need one of these non-default base image options, you don't have to specify the `-P` argument every time. You can create an `.actrc` file in the root of your project that sets your default arguments (HTTP Toolkit UI's is [here](https://github.com/httptoolkit/httptoolkit-ui/blob/master/.actrc)).

With that done, we can reproduce remote GitHub Actions builds locally any time with just a quick `act`!

## Going Further

That should give you enough to get most simple JavaScript or Node projects set up with GitHub Actions, locally and remotely. If you need a full example, feel free to take a look at the [HTTP Toolkit UI repo](https://github.com/httptoolkit/httptoolkit-ui). For me, this has dramatically sped up builds & CI feedback, mainly by them starting much faster, but also seeming to knock about 10% off the runtime itself.

Now the real fun begins though, as you can begin to extend this setup. Some more bonus steps you might want to consider:

* Set up caching, to speed up slow `npm install` steps, with [`actions/cache`](https://github.com/marketplace/actions/cache). GitHub even have a [ready-to-use example for npm](https://github.com/actions/cache/blob/main/examples.md#node---npm).
* Store build artifacts, as output attached to the workflow, using [`actions/upload-artifact`](https://github.com/marketplace/actions/upload-a-build-artifact).
* Create GitHub releases from content automatically, with [`actions/create-release`](https://github.com/actions/create-release).
* Deploy generated content to GitHub Pages, with [`peaceiris/actions-gh-pages`](https://github.com/marketplace/actions/github-pages-action).
* Add a badge to your readme, with a sprinkle of markdown:
    ```markdown
    [![Build Status](https://github.com/$USER/$REPO/workflows/$WORKFLOW/badge.svg)](https://github.com/$USER/$REPO/actions)
    ```

Have further questions or suggestions? Get in touch [on Twitter](https://twitter.com/pimterry) or [send me a message](/contact/).

_Struggling to debug your code after failing builds, or want to test complicated HTTP interactions locally? Intercept, inspect & mock HTTP from anything with **[HTTP Toolkit](/)**._