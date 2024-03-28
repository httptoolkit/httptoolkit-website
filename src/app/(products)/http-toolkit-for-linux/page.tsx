import type { Metadata } from 'next/types';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { LinuxLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Intercept, debug & mock HTTP(S) on Linux',
  description:
    'HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Linux computer.',
});

export default async function ForLinuxPage() {
  return (
    <>
      <CTA
        $bgVariant="rigth-bottom-to-top-left"
        icon={LinuxLogo}
        heading="Intercept, debug & mock HTTP(S) on Linux"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Linux computer."
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          withBorderAnimation: true,
          loading: 'eager',
        }}
      />
      <HttpToolkitFeatures />
      <MockResponseFeatures />
    </>
  );
}
