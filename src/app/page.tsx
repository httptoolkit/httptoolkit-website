import { Suspense } from 'react';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { ModifyFeatures } from '@/components/common-sections/modify-features';
import { Statistics } from '@/components/common-sections/statistics';
import { Testimonials } from '@/components/common-sections/testimonials';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { CursorClick } from '@/components/elements/icon';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';
import { CTA } from '@/components/sections/cta';
import { ResponsiveLineBreak } from '@/components/elements/responsive-line-break';
import { HeadingBlock } from '@/components/modules/heading-block';
import { Section } from '@/components/elements/section';

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
      <Section>
        <HeadingBlock
          title="What is *HTTP Toolkit*?"
          text="HTTP Toolkit is an open-source tool for debugging, testing and building with HTTP on Windows, Linux & Mac."
          $align="center"
          $isContentCentered
        />
      </Section>
      <HttpToolkitFeatures />
      <TryItForYourselfCTA />
      <ModifyFeatures />
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
