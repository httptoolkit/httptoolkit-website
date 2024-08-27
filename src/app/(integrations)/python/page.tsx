import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { Testimonials } from '@/components/common-sections/testimonials';
import { PythonLogo } from '@/components/elements/icon';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { IntegrationSteps } from '@/components/sections/integration/single-page/steps';
import { IntegrationTextAppVideo } from '@/components/sections/integration/single-page/text-appvideo';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: "Capture, debug and mock your Python code's HTTP traffic",
  description:
    'HTTP Toolkit includes built-in automatic setup and advanced support for Python, so you can debug and modify any HTTP(S) traffic in seconds.',
});

export default function PythonIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Intercept, view & edit Python HTTP traffic"
        text="HTTP Toolkit includes built-in automatic setup and advanced support for Python, so you can debug and modify any HTTP(S) traffic in seconds."
        icon={PythonLogo}
        breadcrumbText="python"
      />
      <IntegrationTextAppVideo
        title="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        video={{id: "python"}}
      />
      <IntegrationSteps
        title="Getting `*started*`"
        steps={[
          [
            'Open a terminal via HTTP Toolkit',
            'Run any Python script, tool or server from that terminal',
            "Instantly see, debug & rewrite all Python's HTTP traffic",
          ],
        ]}
      />
      <IntegrationCompatibility
        title="Supported by Python"
        subtitle="compatibility"
        tools={[
          'urllib.request',
          'urllib2',
          'Requests',
          'Boto',
          'Urlfetch',
          'Python 2 & 3',
          'httplib2',
          'Pip',
          'httpx',
          'grequests',
          'aiohttp',
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
