import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { Testimonials } from '@/components/common-sections/testimonials';
import { NodeLogo, DenoLogo, BunLogo, FirefoxLogo, ChromeLogo } from '@/components/elements/icon';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { IntegrationSteps } from '@/components/sections/integration/single-page/steps';
import { IntegrationTextAppVideo } from '@/components/sections/integration/single-page/text-appvideo';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: "Capture, debug and mock your Node.js and web JS's HTTP traffic",
  description:
    'Intercept & view all Javascript HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors.',
});

export default function JavascriptIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Http Toolkit and Javascript integrated"
        text="Intercept & view all Javascript HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors."
        adittionalIcons={[NodeLogo, DenoLogo, BunLogo, FirefoxLogo, ChromeLogo]}
        breadcrumbText="javascript"
        isMultipleIcons
      />
      <IntegrationTextAppVideo
        title="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        video={{ id: 'javascript' }}
      />
      <IntegrationSteps
        title="Getting `*started*`"
        steps={[
          [
            'Open a terminal or browser via HTTP Toolkit',
            'Start Node.js (or Deno, or Bun) from the terminal, or open a web page in the browser',
            'Instantly see, debug & rewrite all your HTTP traffic',
          ],
        ]}
      />
      <IntegrationCompatibility
        title="Supported by Javascript"
        subtitle="compatibility"
        tools={[
          "Node.js's Http & Https modules",
          'Bun',
          'Deno',
          'Fetch & Node-Fetch',
          'Request',
          'Axios',
          'Superagent',
          'Reqwest',
          'Undici',
          'Got',
          'Needle',
          'Bent',
          'Unirest',
          'Spawned subprocesses',
          'npm',
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
