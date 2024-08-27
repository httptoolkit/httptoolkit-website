import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { Testimonials } from '@/components/common-sections/testimonials';
import { ElectronLogo } from '@/components/elements/icon';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { IntegrationSteps } from '@/components/sections/integration/single-page/steps';
import { IntegrationTextAppVideo } from '@/components/sections/integration/single-page/text-appvideo';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: "Capture, debug and mock your Electron app's HTTP traffic",
  description:
    'HTTP Toolkit includes built-in automatic setup and advanced support for Electron apps, so you can debug and modify any HTTP(S) traffic in seconds.',
});

export default function ElectronIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Intercept, view & edit Electron HTTP traffic"
        text="HTTP Toolkit includes built-in automatic setup and advanced support for Electron apps, so you can debug and modify any HTTP(S) traffic in seconds."
        icon={ElectronLogo}
        breadcrumbText="electron"
      />
      <IntegrationTextAppVideo
        title="HTTP Toolkit is an open-source tool for debugging, testing and building with HTTP on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        video={{ id: 'chrome' }}
      />
      <IntegrationSteps
        title="Getting *started*"
        steps={[['Open HTTP Toolkit', 'Pick any Electron executable', 'See, debug & rewrite all its HTTP(S) traffic']]}
      />
      <IntegrationCompatibility
        title="Automatic setup & interception for Electron"
        subtitle="Fully supported"
        tools={[
          'Renderer requests',
          'Main process requests',
          'Request',
          'Axios',
          'Fetch & Node-Fetch',
          'Http & Https built-in modules',
          'Superagent',
          'Reqwest',
          'Got',
          'Needle',
          'Unirest',
          'Spawned subprocesses',
        ]}
      />
      <Suspense>
        <Testimonials />
      </Suspense>
      <IntegrationHttpTookitFeatures />
      <MockResponseFeatures />
      <RewriteAnything />
    </>
  );
}
