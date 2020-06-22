---
title: "What's coming in TypeScript 4?"
date: '2020-06-22T16:00'
cover_image: './code.jpg'
redditUrl: https://www.reddit.com/r/typescript/comments/hdvk70/whats_coming_in_typescript_4/
hackerNewsUrl: https://news.ycombinator.com/item?id=23602115
devToUrl: https://dev.to/pimterry/what-s-coming-in-typescript-4-1024
---

TypeScript 4 is coming up fast: a first beta release is planned for this week (June 25th), with the final release aiming for mid-August.

It's important to note that [TypeScript does not follow semver](https://github.com/microsoft/TypeScript/issues/14116#issuecomment-280410804), so 4.0 is not as big a deal as it sounds! There can be (and often are) breaking changes between any minor TypeScript versions, and major version bumps like this happen primarily for marketing reasons, not technical ones.

This bump to 4.0 doesn't suggest that everything is going to break, and this won't be a huge world-changing release, but it does bring some nice additions, particularly on the typing side. For projects like [HTTP Toolkit](/) (written entirely in TypeScript) that means faster development & fewer bugs!

Let's dive into the details:

## Variadic tuple types

Also known as 'variadic [kinds](https://en.wikipedia.org/wiki/Kind_(type_theory))', this is a complex but substantial new feature for TypeScript's type system.

It's not 100% confirmed yet (the [PR](https://github.com/microsoft/TypeScript/pull/39094) remains unmerged), but it's explicitly in the 4.0 roadmap, and Anders Hejlsberg himself has [called it out](https://twitter.com/ahejlsberg/status/1272986860957003788) as planned for the coming release.

Explaining this is complicated if you don't have an strong existing grasp of type theory, but it's easy to demo. Let's try to type a `concat` function with tuple arguments:

```typescript
function concat(
    nums: number[],
    strs: string[]
): (string | number)[] {
    return [...nums, ...strs];
}

let vals = concat([1, 2], ["hi"]);
let val = vals[1]; // infers string | number, but we *know* it's a number (2)

// TS does support accurate types for these values though:
let typedVals = concat([1, 2], ["hi"]) as [number, number, string];
let typedVal = typedVals[1] // => infers number, correctly
```

This is valid TypeScript code today, but it's suboptimal.

Here, `concat` works OK, but we're losing information in the types and we have to manually fix that later if we want to get accurate values elsewhere. Right now it's impossible to fully type such a function to avoid this.

With variadic types though, we can:

```typescript
function concat<N extends number[], S extends string[]>(
    nums: [...N],
    strs: [...S]
): [...N, ...S] {
    return [...nums, ...strs];
}

let vals = concat([1, 2], ["hi"]);
let val = vals[1]; // => infers number
const val2 = vals[1]; // => infers 2, not just any number

// Go even further and accurately concat _anything_:
function concat<T extends unknown[], U extends unknown[]>(
    t: [...T],
    u: [...U]
): [...T, ...U] {
    return [...t, ...u];
}
```

In essence, tuple types can now include `...T` as a generic placeholder for multiple types in the tuple. You can describe an unknown tuple (`[...T]`), or use these to describe partially known tuples (`[string, ...T, boolean, ...U]`).

TypeScript can infer types for these placeholders for you later, so you can describe only the overall shape of the tuple, and write code using that, without depending on the specific details.

This is neat, and applies more generally than just concatenating arrays. By combining this with existing varadic functions, like `f<T extends unknown[]>(...args: [...T])`, you can treat function arguments as arrays, and describe functions with far more flexible argument formats and patterns than in the past.

For example, right now rest/varadic parameters in TypeScript must always be the last param in a function. For example, `f(a: number, ...b: string[], c: boolean)` is invalid.

With this change, by defining the arguments of the function using a variadic tuple type like `f<T extends string[]>(...args: [number, ...T, boolean])` you can do that.

That's all a bit abstract. In practice, this means you'll be able to:

* Destructure array types:<br/>`type head = <H extends unknown, T extends unknown[]>(list: [H, ...T]) => H`
* Do many of the things allowed by [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types), but on arbitrary-length arrays of values, not just on objects.
* Infer full types for functions with variadic arguments: `type f = <T extends unknown[]>(...args: [...T]) => T`
* Infer proper types even for extra complicated partially-known variadic arguments: `type f = <T extends unknown[]>(...args: [string, ...T, boolean]) => T`
* [Fully define types](https://www.typescriptlang.org/play/index.html?ts=4.0.0-pr-39094-7&ssl=26&ssc=21&pln=26&pc=30#code/C4TwDgpgBAkgdgMwgJwILIOYFcC2E7ADOAPACoB8UAvAFBRSlQQAew+AJoVABQB0-UYAC4oAbX68AlohRQASgBoeEgIaZCIlXBABKapS0gAunqoHtUAPzyoIuBABuKGjVCRYM5HIiEsAGyIySiooOgYmVg4uPgFhMQlpJGQGJW5kHxFE2TlTc2NcqEMrGztHZxoELDgAY2BJAHs4KDBkepxJQkkEEGIwgDEqiLY4TmV+NQwNQu1RE31pkBpybgQRAbgdERjeCan4JPRsPAISdfICgAVW9sIIYn2Ub18A06rySgBvMPTgLGQmyo1OqNba7EQPNCYXD4QJnPRfej0H5-Jr2ADuUCubQ6EG4aR89T8TgKCMR9EBtQaTWqKj8fgARipqgBrfHPOIQp7+WFveFhMlIglE3Hpdk6fmIgC+Evou14YCwhAAFtwaXTGSydABuGVQBC8NV+bhwfx+JSqdTismSq1QaXSmjsCDVPxqaAU4FNPz1FTsbhhBCSPwQESEYDIaQYBRhfDVersSOh8OR6P0Q0a5lbUXcpMRuAYAoOeqSdibKBFksuONwMNQb2+rE3aAhFrYzrdbj10suLuNnHcADkvAA9GxWLwcOwB0oB1hgAgALQADgHOl4wCV+DZ81Jw+HUFFUA6UDDeYwAEIaDaXG5oABZHyEFQYHzUKAD+qQOADqAAH3faIRmwP7-gOHAge+KCtMgA6Os6rrpHqVSUo0UAgmEOCEBgIgPoQT4voQqZQOmTKZjwmHYVAHyCOAIZQLh+E+Eo1bDHEp6RnahbFuwNBlhWPE0NWtaNH2txvq2NxdCA3CNOKNAidc-Yfl+q7rpucDbmYVFhEJhIQLw3oYGyBqNKxeh7lAgC8G4AsjtXnJNBAA) for `promisify`.
* Create accurate types for many other higher-order function definitions, like `curry`, `apply`, `compose`, `cons`, ...
* Kill all sorts of [workarounds](https://github.com/microsoft/TypeScript/issues/1773#issuecomment-81514630) where you had to separately define an overload for each possible number of arguments (I've been [guilty](https://github.com/pimterry/typesafe-get/blob/master/index.ts) of this myself).

Even if you're not writing a lot of higher order functions, improved typing here should allow more detailed types to spread far and wide through your code, inferring away many non-specific array types, and improving other types all over the place.

There's a lot more depth and many other use cases for this - take a look at [the full GitHub discussion](https://github.com/microsoft/TypeScript/issues/5453) for more info.

## Labelled Tuples

As a related but drastically simpler feature: TypeScript will allow labelling the elements of your tuples.

What does the below tell you?

```typescript
function getSize(): [number, number];
```

How about now?

```typescript
function getSize(): [min: number, max: number];
```

These labels disappear at runtime and don't do any extra type checking, but they do make usage of tuples like these far clearer.

These also work for rest & optional arguments too:

```typescript
type MyTuple = [a: number, b?: number, ...c: number[]];
```

For more info, checkout the [GitHub issue](https://github.com/Microsoft/TypeScript/issues/28259).

## Property type inference from constructor usage

A nice clear improvement to type inference:

```typescript
class X {

    private a;

    constructor(param: boolean) {
        if (param) {
            this.a = 123;
        } else {
            this.a = false;
        }
    }

}
```

In the above code right now, the type of `a` is `any` (triggering an error if `noImplicitAny` is enabled). Property types are only inferred from direct initialization, so you always need either an initializer or an explicit type definition.

In TypeScript 4.0, the type of `a` will be `number | boolean`: constructor usage is used to infer property types automatically.

If that's not sufficient, you can still explicitly define types for properties, and those will be used in preference when they exist.

## Short-circuit assignment operators

Not interested in typing improvements? TypeScript 4.0 will also implement the stage 3 JS [logical assignment](https://github.com/tc39/proposal-logical-assignment) proposal, supporting the new syntax and compiling it back to make that usable in older environments too.

That looks like this:

```typescript
a ||= b
// equivalent to: a = a || b

a &&= b
// equivalent to: a = a && b

a ??= b
// equivalent to: a = a ?? b
```

Nowadays the last option is probably the most useful here, unless you're exclusively handling booleans. This null-coalescing assignment is perfect for default or fallback values, where `a` might not have a value.

## The also rans

That's a few of the bigger notices, but there's a lot of other good stuff here too:

* `unknown` now supported as a type annotation for catch clauses:<br/>`try { ... } catch (e: unknown) { ... }`
* Support for React's new [JSX internals](https://github.com/microsoft/TypeScript/issues/34547)
* Editor support for `@deprecated` JSDoc annotations
* More performance improvements, following on from the big [improvements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#speed-improvements) in 3.9
* New editor refactorings (e.g. automatically refactoring code to use optional chaining), improved editor refactorings (better auto-import!), and [semantic highlighting](https://github.com/microsoft/TypeScript/issues/38435)

None of these are individually huge, but nonetheless, cumulatively it'll improve life for TypeScript developers, with some great improvements to type safety and developer experience all round.

I should note that none of this is final yet! I've skipped a few discussed-but-not-implemented changes - from [`awaited T`](https://github.com/microsoft/TypeScript/issues/27711) to [placeholder types](https://github.com/microsoft/TypeScript/issues/31894#issuecomment-640942186) - and it's quite possible some of these features could suddenly appear in the next month, or equally that a new problem could cause changes in the implemented features above, so do keep your eyes peeled...

Hope that's useful! Get in touch on [Twitter](https://twitter.com/pimterry) if you've got questions or comments.
