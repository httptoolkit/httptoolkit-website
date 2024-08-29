import type { Metadata } from 'next/types';

import { Book, CrosshairSimple, Flag, Globe, Link, Shuffle } from '@/components/elements/icon';
import { Bento } from '@/components/sections/bento';
import { CTA } from '@/components/sections/cta';
import { IntegrationCTA } from '@/components/sections/integration/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Fiddler alternative → HTTP Toolkit',
  description:
    'HTTP Toolkit is a modern powerful alternative to Fiddler designed from the ground up for instant targeted debugging and control of any HTTP(S) traffic.',
});

export default async function FiddlerPage() {
  return (
    <>
      <CTA
        heading="Looking for a Fiddler alternative?"
        excerpt="HTTP Toolkit is a modern powerful alternative to Fiddler designed from the ground up for instant targeted debugging and control of any HTTP(S) traffic."
        video={{id: 'chrome'}}
      />
      <IntegrationCTA
        $variant="cta"
        title="One-click setup integrations for every tool you use"
        text={["HTTP Toolkit includes one-click automated setup to provide precisely targeted interception of individual mobile apps, browsers, terminal windows, Docker containers & more."]}
        button={{
          $small: true,
          $variant: 'secondary',
          children: 'See all integrations',
          href: '/all-integrations',
        }}
      />
      <Bento
        title="HTTP Toolkit has all the core Fiddler features you use, plus:"
        cards={[
          {
            icon: Globe,
            title: 'One-click zero-configuration HTTPS interception',
            text: 'Inspect & rewrite any HTTPS in seconds, with no global CA certificate required, for mobile apps, browsers, Docker containers, and more.',
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
            icon: CrosshairSimple,
            title: 'Precisely targeted interception',
            text: 'Capture traffic from an individual browser window, terminal session, or mobile app, without interfering with (or having to filter though) traffic from the rest of your machine.',
          },
          {
            icon: Link,
            title: 'Extensible & automatable',
            text: "100% open-source, with interception internals you can integrate directly into your own code to write automated tests or build custom proxies, all available as an Apache-licensed [open-source library](https://github.com/httptoolkit/mockttp) (that's $0 vs the **[$2,999/year price tag](https://www.telerik.com/purchase/fiddlercore)** to build on FiddlerCore).",
          },
          {
            icon: Flag,
            title: 'Export intercepted traffic as ready-to-use code',
            text: 'One-click export of any collected requests as ready-to-use code for **20+ programming languages & tools.**',
          }
        ]}
      />
    </>
  );
}
