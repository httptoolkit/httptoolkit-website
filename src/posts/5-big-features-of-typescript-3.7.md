---
title: 'The 5 Big Features of TypeScript 3.7 and How to Use Them'
date: '2019-09-12T12:00'
cover_image: './code.jpg'
---

The TypeScript 3.7 release is coming soon, and it's going to be a big one.

The target release date is November 5th, and there's some seriously exciting headline features included:

- Assert signatures
- Recursive type aliases
- Top-level await
- Null coalescing
- Optional chaining

Personally, I'm super excited about this, they're going to whisk away all sorts of annoyances that I've been fighting in TypeScript whilst building [HTTP Toolkit](https://httptoolkit.tech).

If you haven't been paying close attention to the TypeScript development process though, it's probably not clear what half of these mean, or why you should care. Let's talk them through.

## Assert Signatures

This is a brand-new & little-known TypeScript feature, which allows you to write functions that act like [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) as a side-effect, rather than explicitly returning their boolean result.

It's easiest to demonstrate this with a JavaScript example:

```javascript
// In JS:

function assertString(input) {
    if (typeof input === 'string') return;
    else throw new Error('Input must be a string!');
}

function doSomething(input) {
    assertString(input);

    // ... Use input, confident that it's a string
}

doSomething('abc'); // All good
doSomething(123); // Throws an error
```

This pattern is neat and useful and you can't use it in TypeScript today.

TypeScript can't know that you've guaranteed the type of `input` after it's run `assertString`. Typically people just make the argument `input: string` to avoid this, and that's good, but that also just pushes the type checking problem somewhere else, and in cases where you just want to fail hard it's useful to have this option available.

Fortunately, soon we will:

```typescript
// With TS 3.7

function assertString(input: any): asserts input is string { // <-- the magic
    if (typeof input === 'string') return;
    else throw new Error('Input must be a string!');
}

function doSomething(input: string | number) {
    assertString(input);

    // input's type is just 'string' here
}
```

Here `assert input is string` means that if this function ever returns, TypeScript can narrow the type of `input` to `string`, just as if it was inside an if block with a type guard.

To make this safe, that means if the assert statement isn't true then your assert function must either throw an error or not return at all (kill the process, infinite loop, you name it).

That's the basics, but this actually lets you pull some really neat tricks:

```typescript
// With TS 3.7

// Asserts that input is truthy, throwing immediately if not:
function assert(input: any): asserts input { // <-- not a typo
    if (!input) throw new Error('Not a truthy value');
}

declare const x: number | string | undefined;
assert(x); // Narrows x to number | string

// Also usable with type guarding expressions!
assert(typeof x === 'string'); // Narrows x to string

// -- Or use assert in your tests: --
const a: Result | Error = doSomethingTestable();

expect(a).is.instanceOf(result); // 'instanceOf' could 'asserts a is Result'
expect(a.resultValue).to.equal(123); // a.resultValue is now legal

// -- Use as a safer ! that throws immediately if you're wrong --
function assertDefined<T>(obj: T): asserts obj is NonNullable<T> {
    if (obj === undefined || obj === null) {
        throw new Error('Must not be a nullable value');
    }
}
declare const x: string | undefined;

// Gives y just 'string' as a type, could throw elsewhere later:
const y = x!;

// Gives y 'string' as a type, or throws immediately if you're wrong:
assertDefined(x);
const z = x;

// -- Or even update types to track a function's side-effects --
type X<T extends string | {}> = { value: T };

// Use asserts to narrow types according to side effects:
function setX<T extends string | {}>(x: X<any>, v: T): asserts x is X<T> {
    x.value = v;
}

declare let x: X<any>; // x is now { value: any };

setX(x, 123);
// x is now { value: number };
```

This is still in flux, so don't take it as the definite result, and keep an eye on the [pull request](https://github.com/microsoft/TypeScript/pull/32695) if you want the final details.

There's even [discussion](https://github.com/microsoft/TypeScript/pull/32695#issuecomment-523733928) there about allowing functions to assert something _and_ return a type, which would let you extend the final example above to track a much wider variety of side effects, but we'll have to wait and see how that plays out.

## Top-level Await

[Async/await](https://basarat.gitbooks.io/typescript/docs/async-await.html) is amazing, and makes promises dramatically cleaner to use.

Unfortunately though, you can't use them at the top level. This might not be something you care about much in a TS library or application, but if you're writing a runnable script or using TypeScript in a [REPL](https://www.npmjs.com/package/ts-node) then this gets super annoying. It's even worse if you're used to frontend development, since `await` has been legal at the top level in Chrome and Firefox for a couple of years now.

Fortunately though, a fix is coming. This is actually a general stage-3 JS [proposal](https://github.com/tc39/proposal-top-level-await), so it'll be everywhere else eventually too, but for TS devs 3.7 is where the magic happens.

This one's simple, but let's have another quick demo anyway:

```javascript
// Today:

// Your only solution right now for a script that does something async:
async function doEverything() {
    ...
    const response = await fetch('http://example.com');
    ...
}
doEverything(); // <- eugh (could use an IIFE instead, but even more eugh)
```

With top-level await:

```typescript
// With TS 3.7:

// Your script:
...
const response = await fetch('http://example.com');
...
```

There's a notable gotcha here: if you're _not_ writing a script, or using a REPL, don't write this at the top level, unless you *really* know what you're doing!

It's totally possible to use this to write modules that do blocking async steps when imported. That can be useful for some niche cases, but people tend to assume that their `import` statement is a synchronous, reliable & fairly quick operation, and you could easily hose your codebase's startup time if you start blocking imports for complex async processes (even worse, processes that can fail).

This is somewhat mitigated by the semantics of imports of async modules: they're imported and run in _parallel_, so the importing module effectively waits for `Promise.all(importedModules)` before being executed. Rich Harris wrote [an excellent piece](https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221) on a previous version of this spec, before that change, when imports ran sequentially and this problem was much worse), which makes for good background reading on the risks here if you're interested.

It's also worth noting that this is only useful for module systems that support asynchronous imports. There isn't yet a formal spec for how TS will handle this, but that likely means that a very recent `target` configuration, and either ES Modules or Webpack v5 (whose alphas have [experimental support](https://github.com/webpack/webpack/pull/9177)) at runtime.

## Recursive Type Aliases

If you're ever tried to define a recursive type in TypeScript, you may have run into StackOverflow questions like this: https://stackoverflow.com/questions/47842266/recursive-types-in-typescript.

Right now, you can't. Interfaces can be recursive, but there are limitations to their expressiveness, and type aliases can't. That means right now, you need to combine the two: define a type alias, and extract the recursive parts of the type into interfaces. It works, but it's messy, and we can do better.

As a concrete example, this is the [suggested](https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540) type definition for JSON data:

```typescript
// Today:

type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }
```

That works, but the extra interfaces are only there because they're required to get around the recursion limitation.

Fixing this requires no new syntax, it just removes that restriction, so the below compiles:

```typescript
// With TS 3.7:

type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;
```

Right now that fails to compile with `Type alias 'JSONValue' circularly references itself`. Soon though, soon...

## Null Coalescing

Aside from being difficult to spell, this one is quite simple & easy. It's based on a JavaScript stage-3 [proposal](https://github.com/tc39/proposal-nullish-coalescing), which means it'll also be coming to your favourite vanilla JavaScript environment too soon, if it hasn't already.

In JavaScript, there's a common pattern for handling default values, and falling back to the first valid result of a defined group. It looks something like this:

```javascript
// Today:

// Use the first of firstResult/secondResult which is truthy:
const result = firstResult || secondResult;

// Use configValue from provided options if truthy, or 'default' if not:
this.configValue = options.configValue || 'default';
```

This is useful in a host of cases, but due to some interesting quirks in JavaScript, it can catch you out. If `firstResult` or `options.configValue` can meaningfully be set to `false`, an empty string or `0`, then this code has a bug. If those values are set, then when considered as booleans they're [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), so the fallback value (`secondResult` / `'default'`) is used anyway.

Null coalescing fixes this. Instead of the above, you'll be able to write:

```typescript
// With TS 3.7:

// Use the first of firstResult/secondResult which is *defined*:
const result = firstResult ?? secondResult;

// Use configSetting from provided options if *defined*, or 'default' if not:
this.configValue = options.configValue ?? 'default';
```

`??` differs from `||` in that it falls through to the next value only if the first argument is null or undefined, not falsy. That fixes our bug. If you pass `false` as `firstResult`, that will be used instead of `secondResult`, because while it's falsy it is still defined, and that's all that's required.

Simple, but super useful, and takes a way a whole class of bugs.

## Optional Chaining

Last but not least, optional chaining is another stage-3 [proposal](https://github.com/tc39/proposal-optional-chaining) which is making its way into TypeScript.

This is designed to solve an issue faced by developers in every language: how do you get data out of a data structure when some or all of it might not be present?

Right now, you might do something like this:

```javascript
// Today:

// To get data.key1.key2, if any level could be null/undefined:
let result = data ? (data.key1 ? data.key1.key2 : undefined) : undefined;

// Another equivalent alternative:
let result = ((data || {}).key1 || {}).key2;
```

Nasty! This gets much much worse if you need to go deeper, and although the 2nd example works at runtime, it won't even compile in TypeScript since the first step could be `{}`, in which case `key1` isn't a valid key at all.

This gets still more complicated if you're trying to get into an array, or there's a function call somewhere in this process.

There's a host of other approaches to this, but they're all noisy, messy & error-prone. With optional chaining, you can do this:

```typescript
// With TS 3.7:

// Returns the value is it's all defined & non-null, or undefined if not.
let result = data?.key1?.key2;

// The same, through an array index or property, if possible:
array?.[0]?.['key'];

// Call a method, but only if it's defined:
obj.method?.();

// Get a property, or return 'default' if any step is not defined:
let result = data?.key1?.key2 ?? 'default';
```

The last case shows how neatly some of these dovetail together: null coalescing + optional chaining is a match made in heaven.

One gotcha: this will return undefined for missing values, even if they were null, e.g. in cases like `(null)?.key` (returns undefined). A small point, but one to watch out for if you have a lot of `null` in your data structures.

---

That's the lot! That should outline all the essentials for these features, but there's lots of smaller improvements, fixes & editor support improvements coming too, so take a look at the [official roadmap](https://github.com/microsoft/TypeScript/issues/33352) if you want to get into the nitty gritty.

Hope that's useful - if you've got any questions let me know on [Twitter](https://twitter.com/pimterry).

_While you're here, if you like JS & want to supercharge your debugging skills, take a look at **[HTTP Toolkit](https://httptoolkit.tech/view/javascript)**. One-click HTTP(S) interception & debugging for any JS page, script, or server (plus lots of other tools too)._