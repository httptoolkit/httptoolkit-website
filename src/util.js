export const isSSR = typeof window === 'undefined';

export function delay(numberMs) {
    return new Promise((resolve) => setTimeout(resolve, numberMs));
}

// Create a link rel=prefetch (preloading a navigation) for a URL we're likely to
// open very shortly.
export function prefetchPage(url) {
    const linkExists = !!document.head.querySelector(`link[href='${url}'][rel=prerender]`);
    if (linkExists) return;

    const prerenderLink = document.createElement("link");
    prerenderLink.setAttribute("rel", "prefetch");
    prerenderLink.setAttribute("href", url);
    document.head.appendChild(prerenderLink);
}