import { Suspense } from 'react';

import { Layout } from '@/components/layout';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout withoutNewsletter>
      <Suspense>{children}</Suspense>
    </Layout>
  );
}
