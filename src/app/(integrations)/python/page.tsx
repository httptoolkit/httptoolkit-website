import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { PythonLogo } from '@/components/elements/icon';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { IntegrationSteps } from '@/components/sections/integration/single-page/steps';
import { IntegrationTextImage } from '@/components/sections/integration/single-page/text-image';
import { Testimonials } from '@/components/sections/testimonials';

export default function PythonIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Http Toolkit and Python integrated"
        text="Intercept & view all Python HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors."
        icon={PythonLogo}
        breadcrumbText="python"
      />
      <IntegrationTextImage
        title="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        image={{
          darkSrc: '/images/mockup-image.webp',
          lightSrc: '/images/mockup-image-light.webp',
          alt: 'Mockup image',
        }}
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
