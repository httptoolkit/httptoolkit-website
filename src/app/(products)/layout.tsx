import { Suspense } from 'react';

import { Testimonials } from '@/components/common-sections/testimonials';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';
import { Statistics } from '@/components/common-sections/statistics';

/**
 * For more info check out {@link https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts Next page & layouts docs}.
 */
export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
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
