import { Suspense } from 'react';

import { DownloadButton } from '@/components/modules/download-button';
import { CTA } from '@/components/sections/cta';
import { PricingPlans } from '@/components/sections/pricing/plans';
import { ResponsiveLineBreak } from '@/components/elements/responsive-line-break';

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
          <PricingPlans downloadButton={<DownloadButton />} $hideFree />
        </Suspense>
      </CTA>
    </>
  );
}
