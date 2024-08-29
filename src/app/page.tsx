import { Suspense } from 'react';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { Statistics } from '@/components/common-sections/statistics';
import { Testimonials } from '@/components/common-sections/testimonials';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { CursorClick } from '@/components/elements/icon';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';
import { CTA } from '@/components/sections/cta';
import { ResponsiveLineBreak } from '@/components/elements/responsive-line-break';

export default async function HomePage() {
  return (
    <Layout>
      <CTA
        subHeading={{
          text: 'With one click',
          icon: CursorClick,
        }}
        heading={<>
          Intercept, view & edit <ResponsiveLineBreak/>
          any HTTP traffic
        </>}
        video={{
          id: 'chrome'
        }}
      />
      <HttpToolkitFeatures />
      <TryItForYourselfCTA />
      <MockResponseFeatures />
      <Suspense>
        <Statistics />
      </Suspense>
      <Suspense>
        <Testimonials />
      </Suspense>
      <TryItForYourselfCTA isFooterClose variant="cta-fluid" />
      <Suspense>
        <ProductLdData />
      </Suspense>
    </Layout>
  );
}
