import type { Metadata } from 'next/types';

import { Book, Desktop, Link, MagnifyingGlass, PencilSimple, Shuffle } from '@/components/elements/icon';
import { Bento } from '@/components/sections/bento';
import { CTA } from '@/components/sections/cta';
import { IntegrationCTA } from '@/components/sections/integration/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Chrome DevTools alternative → HTTP Toolkit',
  description:
    "HTTP Toolkit is a supercharged alternative to Chrome's developer network tab, designed for faster debugging and deeper control of all your HTTP traffic.",
});

export default async function ChromeDevToolsAlternativePage() {
  return (
    <>
    <CTA
        heading="Looking for a better alternative to Chrome's network devtools?"
        excerpt="HTTP Toolkit is a supercharged alternative to Chrome's developer network tab, designed for faster debugging and deeper control of all your HTTP traffic."
        video={{id: 'chrome'}}
      />
      <IntegrationCTA
        $variant="cta"
        title="One-click setup integrations for every tool you use"
        text={["HTTP Toolkit includes one-click automated setup to provide precisely targeted interception of individual browser windows, mobile apps, terminal sessions, Docker containers & more."]}
        button={{
          $small: true,
          $variant: 'secondary',
          children: 'See all integrations',
          href: '/all-integrations',
        }}
      />
      <Bento
        title="HTTP Toolkit has all the browser network debugging features you use today, plus:"
        cards={[
          {
            icon: Desktop,
            title: 'Automatically capture all traffic from anywhere with one tool',
            text: 'Capture traffic from a single tab, an entire Chrome session, mobile browsers, and even your backend server, all in one place.',
          },
          {
            icon: Link,
            title: 'Extensible & automatable',
            text: "100% open-source, with interception internals you can integrate directly into your own code to write automated tests or build custom proxies (available as an Apache-licensed [open-source library](https://github.com/httptoolkit/mockttp)).",
          },
          {
            icon: PencilSimple,
            title: 'Fully featured body editor with advanced format support',
            text: 'Built on the same internals as VS Code, allowing you to explore, search and examine request & response bodies, with live editing, decoding & highlighting for JSON, Base64, Protobuf, CSS, HTML, XML, and more.'
          },
          {
            icon: Book,
            title: 'Built-in documentation',
            text: 'Documentation for every standard HTTP header and status code, plus specific endpoint docs & validation for 2600+ popular APIs, from Stripe to GitHub to AWS.',
          },
          {
            icon: Shuffle,
            title: 'Powerful rules engine for rewriting & mocking HTTP traffic',
            text: 'Define custom rules that precisely match requests to automatically edit their contents, redirect them, simulate network errors, or breakpoint them for manual modification.'
          },
          {
            icon: MagnifyingGlass,
            title: 'Advanced performance tools',
            text: 'Includes automatic caching & compression analysis, to explain how and why responses might (or might not) be cached in future, and automatically highlight errors and improvements from real-world traffic.',
          },
        ]}
      />
    </>
  );
}
