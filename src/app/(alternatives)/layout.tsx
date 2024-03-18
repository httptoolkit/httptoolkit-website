import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { Layout } from '@/components/layout';
import { HttpToolkitFeatures } from '@/components/sections/alternatives/http-toolkit-features';
import { Statistics } from '@/components/sections/statistics';
import { Testimonials } from '@/components/sections/testimonials';

export default function AlternativesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
      <TryItForYourselfCTA />
      <HttpToolkitFeatures />
      <MockResponseFeatures />
      <RewriteAnything />
      <Suspense>
        <Testimonials />
      </Suspense>
      <Suspense>
        <Statistics title="Why `*HTTP Toolkit*`?" text="Numbers that speak for themselves:" />
      </Suspense>
      <TryItForYourselfCTA variant="cta-fluid" />
    </Layout>
  );
}
