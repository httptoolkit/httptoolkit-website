import { Suspense } from 'react';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { Statistics } from '@/components/common-sections/statistics';
import { Testimonials } from '@/components/common-sections/testimonials';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { CursorClick } from '@/components/elements/icon';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';
import { CTA } from '@/components/sections/cta';

export default async function HomePage() {
  return (
    <Layout>
      <CTA
        subHeading={{
          text: 'With one click',
          icon: CursorClick,
        }}
        heading="Intercept & view all your HTTP"
        video={{
          id: 'chrome'
        }}
      />
      <HttpToolkitFeatures />
      <TryItForYourselfCTA />
      <MockResponseFeatures />
      <RewriteAnything />
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
