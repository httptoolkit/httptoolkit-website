import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
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
    'HTTP Toolkit includes built-in automatic setup and advanced support for web browsers and backend JS runtimes, so you can debug and modify any HTTP(S) traffic in seconds.',
});

export default function JavascriptIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Intercept, view & edit JavaScript HTTP traffic"
        text="HTTP Toolkit includes built-in automatic setup and advanced support for web browsers and backend JS runtimes, so you can debug and modify any HTTP(S) traffic in seconds."
        adittionalIcons={[NodeLogo, DenoLogo, BunLogo, FirefoxLogo, ChromeLogo]}
        breadcrumbText="javascript"
        isMultipleIcons
      />
      <IntegrationTextAppVideo
        title="HTTP Toolkit is an open-source tool for debugging, testing and building with HTTP on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        video={{ id: 'javascript' }}
      />
      <IntegrationSteps
        title="Getting *started*"
        steps={[
          [
            'Open a terminal or browser via HTTP Toolkit',
            'Start Node.js (or Deno, or Bun) from the terminal, or open a web page in the browser',
            'Instantly see, debug & rewrite all your HTTP traffic',
          ],
        ]}
      />
      <IntegrationCompatibility
        title="Automatic setup & interception for JavaScript"
        subtitle="Fully supported"
        tools={[
          "Node.js's Http & Https modules",
          'Bun',
          'Deno',
          'Fetch & Node-Fetch',
          'XMLHttpRequest',
          'Request',
          'Axios',
          'Superagent',
          'Reqwest',
          'Undici',
          'Got',
          'Needle',
          'Bent',
          'Unirest',
          'Spawned subprocesses'
        ]}
      />
      <Suspense>
        <Testimonials />
      </Suspense>
      <IntegrationHttpTookitFeatures />
      <MockResponseFeatures />
    </>
  );
}
