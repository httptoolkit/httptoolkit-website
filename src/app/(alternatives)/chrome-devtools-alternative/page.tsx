import { Book, Desktop, Flag, Globe, LinkSimpleBreak, Shuffle } from '@/components/elements/icon';
import { Bento } from '@/components/sections/bento';
import type { BentoProps } from '@/components/sections/bento/bento.types';
import { CTA } from '@/components/sections/cta';
import { IntegrationCTA } from '@/components/sections/integration/cta';

const bentoCards: BentoProps['cards'] = [
  {
    icon: Globe,
    title: 'One-click zero-configuration HTTPS interception',
    text: 'Inspect & rewrite HTTPS immediately with no global CA certificate required.',
  },
  {
    icon: Desktop,
    title: 'Automatically capture traffic from just one browser window',
    text: 'Precisely targeted interception: **automatically capture traffic from just one browser window**, without interfering with (or having to filter though) traffic from the rest of your machine.',
  },
  {
    icon: LinkSimpleBreak,
    title: 'Integrate',
    text: "Interception internals you can integrate into your own code for mocking, testing or building custom proxies, available as an MIT-licensed [open-source library](https://example.com) **(that's $0 vs the $2,999/year price tag to build on FiddlerCore).**",
  },
  {
    icon: Book,
    title: 'Built-in documentation',
    text: 'Ior every standard HTTP header and status code, plus specific endpoint docs & validation for 1400+ popular APIs.',
  },
  {
    icon: Shuffle,
    title: 'Flexible rules',
    text: 'Engine for rewriting traffic so you can combine matchers with mock responses, simulated errors, timeouts, redirection and more.',
  },
  {
    icon: Flag,
    title: '20+ languages',
    text: 'One-click transformation of collected traffic into editable rules to match & mock subsequent requests, or to export collected requests as ready-to-use code for **20+ languages.**',
  },
];

export default async function ChromeDevToolsAlternativePage() {
  return (
    <>
      <CTA
        heading="Want an alternative to Chrome's network tab?"
        excerpt="HTTP Toolkit is a supercharged alternative to Chrome's built-in networking tools, designed for faster debugging and complete control of any HTTP(S) traffic."
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          withBorderAnimation: true,
          alt: 'Hero',
          loading: 'eager',
        }}
      />
      <IntegrationCTA
        $variant="cta"
        title="Integrations"
        text="Explore a vast array of integrations and applications designed to streamline your work, consolidate information, and enhance collaboration effortlessly. "
        button={{
          $small: true,
          $variant: 'secondary',
          children: 'See all integrations',
          href: '/all-integrations',
        }}
      />
      <Bento title="HTTP Toolkit has all the core Fiddler features you use, plus:" cards={bentoCards} />
    </>
  );
}
