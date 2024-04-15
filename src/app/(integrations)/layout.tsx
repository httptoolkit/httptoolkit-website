import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
  },
};

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
      <TryItForYourselfCTA isFooterClose variant="cta-fluid" />
      <Suspense>
        <ProductLdData />
      </Suspense>
    </Layout>
  );
}
