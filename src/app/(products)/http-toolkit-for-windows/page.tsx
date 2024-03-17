import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { WindowsLogo } from '@/components/elements/icon';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { CTA } from '@/components/sections/cta';
import { Testimonials } from '@/components/sections/testimonials';

export const metadata: Metadata = {
  title: 'Intercept, debug & mock HTTP(S) on Windows',
  description:
    'HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Windows computer.',
};

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
      />
      <HttpToolkitFeatures />
      <MockResponseFeatures />
      <RewriteAnything />
      <Suspense>
        <Testimonials />
      </Suspense>
      <TryItForYourselfCTA variant="cta-fluid" />
      <Suspense>
        <ProductLdData />
      </Suspense>
    </>
  );
}
