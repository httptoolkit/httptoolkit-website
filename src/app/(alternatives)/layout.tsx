import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { ModifyFeatures } from '@/components/common-sections/modify-features';
import { Statistics } from '@/components/common-sections/statistics';
import { Testimonials } from '@/components/common-sections/testimonials';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';
import { HttpToolkitFeatures } from '@/components/sections/alternatives/http-toolkit-features';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
  },
};

export default function AlternativesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
      <TryItForYourselfCTA />
      <HttpToolkitFeatures />
      <ModifyFeatures />
      <Suspense>
        <Testimonials />
      </Suspense>
      <Suspense>
        <Statistics />
      </Suspense>
      <TryItForYourselfCTA isFooterClose variant="cta-fluid" />
      <Suspense>
        <ProductLdData />
      </Suspense>
    </Layout>
  );
}
