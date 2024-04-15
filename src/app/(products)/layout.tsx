import { Suspense } from 'react';

import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { Testimonials } from '@/components/common-sections/testimonials';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
      <RewriteAnything />
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
