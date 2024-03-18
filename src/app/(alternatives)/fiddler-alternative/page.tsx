import { Book, Desktop, Flag, Globe, LinkSimpleBreak, Logo, RocketLaunch, Shuffle } from '@/components/elements/icon';
import { Layout } from '@/components/layout';
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

export default async function FiddlerPage() {
  return (
    <Layout>
      <CTA
        heading="Looking for a Fiddler alternative?"
        excerpt="HTTP Toolkit is a modern powerful alternative to Fiddler designed from the ground up for instant targeted debugging and control of any HTTP(S) traffic."
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          withBorderAnimation: true,
          alt: 'Hero',
          loading: 'eager',
        }}
      />

      <CTA
        $variant="cta-square"
        icon={Logo}
        textAppearance="small"
        heading="Try it for yourself"
        excerpt="It is completely free! You can also Go Pro and explore the Http Toolkit with additional features."
        cta={{
          title: 'Go Pro!',
          icon: RocketLaunch,
          href: '/pro',
        }}
      />

      <CTA
        $variant="cta-fluid"
        icon={Logo}
        textAppearance="small"
        heading="Try it for yourself"
        excerpt="It is completely free! You can also Go Pro and explore the Http Toolkit with additional features."
        cta={{
          title: 'Go Pro!',
          icon: RocketLaunch,
          href: '/pro',
        }}
      />
      <Bento title="HTTP Toolkit has all the core Fiddler features you use, plus:" cards={bentoCards} />

      <IntegrationCTA
        $variant="cta"
        title="Integrations"
        text="Explore a vast array of integrations and applications designed to streamline your work, consolidate information, and enhance collaboration effortlessly. "
        button={{
          $small: true,
          $variant: 'secondary',
          children: 'See all integrations',
        }}
      />
    </Layout>
  );
}
