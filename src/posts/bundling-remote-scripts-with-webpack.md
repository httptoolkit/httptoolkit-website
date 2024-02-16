---
title: 'Bundling Remote Scripts with Webpack'
date: '2019-02-07T16:45'
cover_image: './header-images/boxes.jpg'
draft: false
tags: webpack, javascript
---

As a JavaScript developer nowadays, almost everything you use comes from npm. Unfortunately, not absolutely everything: there's still a small subset of scripts that expect to be included from a remote CDN somewhere, and when bundling your application these pose a problem.

You could use these scripts from the CDN, as intended. If you do so you'll lose opportunities for bundling benefits like tree shaking, but more importantly you now have to independently load scripts from one more domain at the same time as your other bundle(s). That means another point of failure, and means you need logic in your main app to wait until the remote script has loaded before using it, and to potentially handle loading failures too.

Instead, you could download the script directly, save it into your codebase ('vendor' it), and treat it like your own source. What if it changes though? Many of these CDN scripts change frequently, so you'll need to repeatedly update this, and every change is extra noise and mess in your codebase & git history.

I hit this recently working on [HTTP Toolkit](https://httptoolkit.com) trying to use the JS SDK for a 3rd party service, which is only available from a CDN, and isn't published on npm. Fortunately, there's another option: webpack can solve this for us.

## Val Loader

Webpack's little-known [val loader](https://github.com/webpack-contrib/val-loader) allows you to easily define your own loading logic that is run at build time. When you load a file with most webpack loaders they read the file, transform the content somehow, and add some content to your bundle, which will later be returned from the initial import/require statement.

When you load a file with val loader however it:

* Executes the file contents as a node module
* Looks for an exported function or promise from the module
* Waits on the promise/calls the function (which may in turn return a promise)
* Takes the `code` property from the final result, and uses this as the content to be bundled and returned by the original import/require

This means you can write a simple node script that dynamically generates content, you can require that script elsewhere, and webpack will pre-generate the content for you at build time, totally automatically. Magic!

## Fetching Remote Scripts

You can probably see where this is going. Putting this together: we need to write a module that fetches our remote script at build time, and returns it to val loader.

In practice, this looks something like this:

* Install val loader: `npm install --save-dev val-loader`
* Create a `fetch-script.js` loader script:

```js
// I'm using fetch here, but any HTTP library will do.
const fetch = require('node-fetch');

const SCRIPT_URL = 'https://cdn.example.com/your-script.js';

module.exports = function () {
    return fetch(SCRIPT_URL)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Could not download ' + SCRIPT_URL);
        }
        return response.text();
    })
    .then((remoteScript) => ({ code: remoteScript }));
}
```
* In the rest of your codebase, require the module like any other, but using val loader:

```js
const scriptExport = import('val-loader!./fetch-script');
```

That's it! No extra config, just a tiny node script.

With that in place, any code that needs the remote script can import our module via val loader, and get the remote script as if it were a normal dependency. It gets properly bundled with the rest of your app, and is always immediately available, like any other bundled script. At the same time, it still keeps up to date automatically: every build, we pull down the latest version from the CDN. You don't need to commit the script into your own repo, or manually check for updates.

One thing to watch out for here: the loader script does _not_ get built by webpack before it's run. That means it needs to be natively runnable by node, so no TypeScript/babel/etc. It's a very simple script though, and this is node not browsers, so you can use modern JS regardless.

## Accepting change

Depending on the script of course, _safely_ pulling in changes is another article in itself. In general most remote scripts like these have some kind of compatibility guarantees (otherwise using them remotely would be impossible), but you may still want some kind of locking mechanism.

If there's versioning available in the remote URL that's trivial, if not though you'll need to check changes manually.

One reasonable approach would be to include & check a hash of the remote file in your loader script, and to fail the build if it changes, or perhaps just send yourself a notification. Failing the build forces you to manually confirm changes when the remote script changes, and then update the hash, which does at least ensure that you won't see unpredictable changes in your application. You'll need to play around, but there's many options here, depending on how flexibly you want to handle new changes.

## Putting it all together

Enjoy! If you'd like to see a working example, take a look at how HTTP Toolkit's UI loads paddle.js. Check out [the paddle.js loading script](https://github.com/httptoolkit/httptoolkit-ui/blob/1aa71b9/src/model/account/paddle.js), and the [code that imports it](https://github.com/httptoolkit/httptoolkit-ui/blob/1aa71b9/src/model/account/subscriptions.ts#L3).

Have any thoughts or ideas about this? Just love/hate webpack? Let me know [on twitter](https://twitter.com/httptoolkit), or join the discussion [on reddit](https://www.reddit.com/r/javascript/comments/ao51z2/bundling_remote_scripts_with_webpack).