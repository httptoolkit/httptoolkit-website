import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { Statistics } from '@/components/common-sections/statistics';
import { Testimonials } from '@/components/common-sections/testimonials';
import { RocketLaunch, SealCheck, Wrench, AndroidLogo } from '@/components/elements/icon';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationBento } from '@/components/sections/integration/single-page/bento';
import { IntegrationDeviceMedia } from '@/components/sections/integration/single-page/device-media';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { buildMetadata } from '@/lib/utils/build-metadata';
import { PhoneAppVideoPair } from '@/components/modules/phone-app-video-pair';

export const metadata: Metadata = buildMetadata({
  title: 'Intercept, mock & debug Android HTTP traffic',
  description:
    'Intercept & view all Android HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors.',
});

export default function AndroidIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Http Toolkit and Android integrated"
        text="Intercept & view all Android HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors."
        icon={AndroidLogo}
        breadcrumbText="android"
      />
      <PhoneAppVideoPair
        videoId='android'
      />
      <IntegrationDeviceMedia
        mobileImage={{
          darkSrc: '/images/mobile-placeholder-dark.png',
          lightSrc: '/images/mobile-placeholder-light.png',
          alt: 'example alt',
          width: 1035,
          height: 1024,
        }}
        desktopImage={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          alt: 'example alt',
          width: 1035,
          height: 1024,
        }}
      />
      <IntegrationBento
        title="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        cards={[
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
        ]}
      />
      <Suspense>
        <Testimonials />
      </Suspense>
      <IntegrationHttpTookitFeatures />
      <MockResponseFeatures />
      <RewriteAnything />
      <Suspense>
        <Statistics />
      </Suspense>
    </>
  );
}
