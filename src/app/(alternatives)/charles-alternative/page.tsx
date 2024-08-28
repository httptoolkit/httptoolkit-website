import type { Metadata } from 'next/types';

import { Book, CrosshairSimple, DeviceMobile, Flag, Globe, Shuffle } from '@/components/elements/icon';
import { Bento } from '@/components/sections/bento';
import { CTA } from '@/components/sections/cta';
import { IntegrationCTA } from '@/components/sections/integration/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Charles Proxy alternative → HTTP Toolkit',
  description:
    'HTTP Toolkit is a modern powerful alternative to Charles, designed from the ground up for instant targeted debugging and control of any HTTP(S) traffic (with no Java necessary)',
});

export default async function CharlesAlternativePage() {
  return (
    <>
      <CTA
        heading="Looking for a Charles Proxy alternative?"
        excerpt="HTTP Toolkit is a modern powerful alternative to Charles
        designed from the ground up for instant targeted debugging and control of any HTTP(S) traffic (with no Java necessary)"
        video={{id: 'chrome'}}
      />
      <IntegrationCTA
        $variant="cta"
        title="Built-in integration with every tool you use"
        text={["HTTP Toolkit includes one-click automated setup to provide precisely targeted interception of individual mobile apps, browsers, terminal windows, Docker containers & more."]}
        button={{
          $small: true,
          $variant: 'secondary',
          children: 'See all integrations',
          href: '/all-integrations',
        }}
      />
      <Bento
        title="HTTP Toolkit has all the core Charles proxy features you use, plus:"
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
            icon: DeviceMobile,
            title: 'Automated mobile device setup',
            text: "Multiple integration tools for both Android and iOS, allowing isolated interception of individual apps with system-level certificates and automatic SSL unpinning as standard.",
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
