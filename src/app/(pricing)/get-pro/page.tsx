import { Suspense } from 'react';

import { DownloadButton } from '@/components/modules/download-button';
import { CTA } from '@/components/sections/cta';
import { PricingPlans } from '@/components/sections/pricing/plans';

export default function PricingPage() {
  return (
    <>
      <CTA
        variant="cta-narrow"
        heading="Developer tools built for professionals"
        subHeading={{
          text: 'pricing',
        }}
        excerpt="Your time is valuable. HTTP Toolkit gives you instant insight and access into every request & response, with zero hassle. Test clie nts, debug APIs and catch bugs, all at lightning speed."
        withDownload={false}
      >
        <Suspense>
          <PricingPlans downloadButton={<DownloadButton />} $hideFree />
        </Suspense>
      </CTA>
    </>
  );
}
