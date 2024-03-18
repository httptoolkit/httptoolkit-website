import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { RocketLaunch, SealCheck, Wrench, AndroidLogo } from '@/components/elements/icon';
import type { FluidCardProps } from '@/components/modules/fluid-card/fluid-card.types';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationBento } from '@/components/sections/integration/single-page/bento';
import { IntegrationDeviceMedia } from '@/components/sections/integration/single-page/device-media';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { Statistics } from '@/components/sections/statistics';
import { Testimonials } from '@/components/sections/testimonials';

const integrationBentoCards: FluidCardProps[] = [
  {
    $variant: 'default',
    title: 'Get started instantly',
    text: 'No messing around with certificate files and wifi settings. \n\n Click the button, accept permissions, start capturing traffic.',
    icon: RocketLaunch,
  },
  {
    $variant: 'default',
    title: "Debug your Android device's HTTP requests",
    text: 'Scan a QR code on the device to start setup, or remotely connect debuggable devices via ADB. \n\n Reconnect again later in one tap. \n\n Supports Android Lollipop and later (v5 / API level 21+)',
    icon: Wrench,
  },
  {
    $variant: 'default',
    title: 'Capture & inspect encrypted HTTPS',
    text: 'Immediately view HTTPS on any device from apps that trust user-installed certificates, like Chrome.\n\n Enable trust in your own app with one tiny manifest change.\n\n On emulators & rooted devices, easily intercept HTTPS from any app, with automatic injection of a system certificate authority.',
    icon: SealCheck,
  },
  {
    $variant: 'highlighted',
    title: 'Want the full details?',
    text: 'Take a look at the in-depth guide to Android HTTP debugging.',
    buttonText: 'Learn more',
    buttonHref: '/docs/guides/android/',
  },
];

export default function AndroidIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Http Toolkit and Android integrated"
        text="Intercept & view all Android HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors."
        icon={AndroidLogo}
        breadcrumbText="android"
      />
      <IntegrationDeviceMedia
        mobileImage={{
          darkSrc: 'https://picsum.photos/id/1019/1024',
          lightSrc: 'https://picsum.photos/id/1035/1024',
          alt: 'example alt',
        }}
        desktopImage={{
          darkSrc: 'https://picsum.photos/id/1019/1024',
          lightSrc: 'https://picsum.photos/id/1035/1024',
          alt: 'example alt',
        }}
      />
      <IntegrationBento
        title="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        cards={integrationBentoCards}
      />
      <IntegrationHttpTookitFeatures />
      <Suspense>
        <Testimonials />
      </Suspense>
      <MockResponseFeatures />
      <RewriteAnything />
      <Suspense>
        <Statistics title="Why `*HTTP Toolkit*`?" text="Numbers that speak for themselves:" />
      </Suspense>
    </>
  );
}
