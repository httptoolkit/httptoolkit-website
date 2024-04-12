import type { Metadata } from 'next/types';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { WindowsLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Intercept, debug & mock HTTP(S) on Windows',
  description:
    'HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Windows computer.',
});

export default async function ForWindowsPage() {
  return (
    <>
      <CTA
        $bgVariant="left-top-to-bottom-right"
        icon={WindowsLogo}
        heading="Intercept, debug & mock HTTP(S) on Windows"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Windows computer."
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          withBorderAnimation: true,
          loading: 'eager',
        }}
        downloadButtonDefaultOsValue="windows"
      />
      <HttpToolkitFeatures />
      <MockResponseFeatures />
    </>
  );
}
