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
import { IntegrationTextImage } from '@/components/sections/integration/single-page/text-image';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: "Capture, debug and mock your Electron app's HTTP traffic",
  description:
    'Intercept & view all Electron HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors.',
});

export default function ElectronIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Http Toolkit and Electron integrated"
        text="Intercept & view all Electron HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors."
        icon={ElectronLogo}
        breadcrumbText="electron"
      />
      <IntegrationTextImage
        title="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          alt: 'Mockup image',
        }}
      />
      <IntegrationSteps
        title="Getting `*started*`"
        steps={[['Open HTTP Toolkit', 'Pick any Electron executable', 'See, debug & rewrite all its HTTP(S) traffic']]}
      />
      <IntegrationCompatibility
        title="Supported by Electron"
        subtitle="compatibility"
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
