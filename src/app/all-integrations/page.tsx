import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';
import { IntegrationCTA } from '@/components/sections/integration/cta';
import { IntegrationsGrid } from '@/components/sections/integration/grid';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Automatic setup and powerful integration for all your tools',
  description:
    'With deep integrations into a huge range of popular components & tools, HTTP Toolkit lets you intercept mobile apps, whole devices, bash scripts, entire Docker containers and more, so you can see & modify anything in just one click.',
});

export default function IntegrationsPage() {
  return (
    <Layout>
      <IntegrationCTA
        $variant="hero"
        title="Automatic setup and powerful integration for all your tools"
        text="With deep integrations into a huge range of popular components & tools, HTTP Toolkit lets you intercept mobile apps, whole devices, bash scripts, entire Docker containers and more, so you can see & modify anything in just one click."
      />
      <IntegrationsGrid />
      <TryItForYourselfCTA isFooterClose />
      <Suspense>
        <ProductLdData />
      </Suspense>
    </Layout>
  );
}
