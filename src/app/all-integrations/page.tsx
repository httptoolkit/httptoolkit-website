import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { ProductLdData } from '@/components/elements/product-ld-data';
import { Layout } from '@/components/layout';
import { IntegrationCTA } from '@/components/sections/integration/cta';
import { IntegrationsGrid } from '@/components/sections/integration/grid';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Automated setup and powerful integrations for all your HTTP tools',
  description:
    'With deep integration into a huge range of popular components & tools, HTTP Toolkit lets you intercept mobile apps, bash scripts, Docker containers, web browsers and more, so you can see & modify anything in just one click.',
});

export default function IntegrationsPage() {
  return (
    <Layout>
      <IntegrationCTA
        $variant="hero"
        title="Automated setup and powerful integrations for all your HTTP tools"
        text={[
          "With deep integration into a huge range of popular components & tools, HTTP Toolkit lets you intercept mobile apps, bash scripts, Docker containers, web browsers and more, so you can see & modify anything in just one click.",
          "Use the integrations below to get started with your favourite tools in seconds, or use HTTP Toolkit as a simple HTTP proxy with manual setup, fully compatible with anything that speaks HTTP."
        ]}
      />
      <IntegrationsGrid />
      <TryItForYourselfCTA isFooterClose />
      <Suspense>
        <ProductLdData />
      </Suspense>
    </Layout>
  );
}
