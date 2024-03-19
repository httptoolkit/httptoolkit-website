import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { JavaLogo } from '@/components/elements/icon';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { IntegrationTextImage } from '@/components/sections/integration/single-page/text-image';
import { Testimonials } from '@/components/sections/testimonials';

export default function JavaIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Http Toolkit and Java integrated"
        text="Intercept & view all Java HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors."
        icon={JavaLogo}
        breadcrumbText="java"
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
      <IntegrationCompatibility
        title="Supported by Java"
        subtitle="compatibility"
        tools={[
          "Java's HttpURLConnection",
          "Java 11's HttpClient",
          'Apache HttpClient',
          'Apache HttpAsyncClient',
          'OkHttp',
          'Retrofit',
          'Ktor-Client',
          'AsyncHttpClient',
          'Reactor-Netty',
          'Spring WebClient',
          'Akka-HTTP',
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
