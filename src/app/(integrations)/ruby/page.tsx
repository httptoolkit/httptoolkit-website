import type { Metadata } from 'next/types';
import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { Testimonials } from '@/components/common-sections/testimonials';
import { RubyLogo } from '@/components/elements/icon';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { IntegrationSteps } from '@/components/sections/integration/single-page/steps';
import { IntegrationTextAppVideo } from '@/components/sections/integration/single-page/text-appvideo';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: "Capture, debug and mock your Ruby app's HTTP traffic",
  description:
    'HTTP Toolkit includes built-in automatic setup and advanced support for Ruby, so you can debug and modify any HTTP(S) traffic in seconds.',
});

export default function RubyIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Intercept, view & edit Ruby HTTP traffic"
        text="HTTP Toolkit includes built-in automatic setup and advanced support for Ruby, so you can debug and modify any HTTP(S) traffic in seconds."
        icon={RubyLogo}
        breadcrumbText="ruby"
      />
      <IntegrationTextAppVideo
        title="HTTP Toolkit is an open-source tool for debugging, testing and building with HTTP on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        video={{ id: 'ruby' }}
      />
      <IntegrationSteps
        title="Getting *started*"
        steps={[
          [
            'Open a terminal via HTTP Toolkit',
            'Run any Ruby script, tool or server from that terminal',
            "Instantly see, debug & rewrite all Ruby's HTTP traffic",
          ],
        ]}
      />
      <IntegrationCompatibility
        title="Automatic setup & interception for Ruby"
        subtitle="Fully supported"
        tools={[
          'net::http',
          'Faraday',
          'REST Client',
          'Mechanize',
          'Bundler',
          'HTTParty',
          'Excon',
          'open-uri',
          'gem install',
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
