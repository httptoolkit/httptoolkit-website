'use client';

// Polyfill for older browsers (more common here than we'd expect, due to testing
// on old Android emulators etc):
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (
        this: string,
        search: string | RegExp,
        replacement: string | ((substring: string, ...args: unknown[]) => string),
    ) {
        if (search instanceof RegExp) {
            if (!search.global) {
                throw new TypeError('String.prototype.replaceAll called with a non-global RegExp argument');
            }
            return this.replace(search, replacement as string);
        }
        return this.split(search).join(replacement as string);
    } as typeof String.prototype.replaceAll;
}

export function Polyfills() {
    return null;
}
