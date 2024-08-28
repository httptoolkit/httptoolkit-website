import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { DownloadButton } from '@/components/modules/download-button';
import { CTA } from '@/components/sections/cta';
import { PricingPlans } from '@/components/sections/pricing/plans';
import { buildMetadata } from '@/lib/utils/build-metadata';
import { ResponsiveLineBreak } from '@/components/elements/responsive-line-break';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing | HTTP Toolkit',
  description:
    'Your time is valuable. HTTP Toolkit gives you instant insight and access into every request & response, with zero hassle. Test clients, debug APIs and catch bugs, all at lightning speed.',
});

export default function PricingPage() {
  return (
    <>
      <CTA
        variant="cta-narrow"
        heading={<>
          Developer tools <ResponsiveLineBreak />
          built for professionals
        </>}
        subHeading={{
          text: 'pricing',
        }}
        excerpt={<p>
          <strong>Your time is valuable</strong>.
          HTTP Toolkit gives you instant insight and access into every request & response, with zero hassle. Test clients, debug APIs and catch bugs, all at lightning speed.
        </p>}
        withDownload={false}
      >
        <Suspense>
          <PricingPlans downloadButton={<DownloadButton />} />
        </Suspense>
      </CTA>
    </>
  );
}
