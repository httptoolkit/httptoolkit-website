import { Suspense } from 'react';

import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { RewriteAnything } from '@/components/common-sections/rewrite-anything';
import { DockerLogo } from '@/components/elements/icon';
import { IntegrationHttpTookitFeatures } from '@/components/sections/integration/http-toolkit-features';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { IntegrationSteps } from '@/components/sections/integration/single-page/steps';
import { IntegrationTextImage } from '@/components/sections/integration/single-page/text-image';
import { Testimonials } from '@/components/sections/testimonials';

const dockerIntegrationSteps = [
  [
    'Open a terminal via HTTP Toolkit',
    'Run any command in that terminal to build or create a Docker container',
    'The build or container is automatically intercepted',
    "Instantly inspect, debug & rewrite all your container's HTTP(S) traffic",
  ],
  [
    'Launch a Docker container anywhere',
    "Click 'Attach to Docker' in HTTP Toolkit, and pick your container",
    'HTTP Toolkit recreates & restarts the container with interception injected',
    "Instantly inspect, debug & rewrite all your container's HTTP(S) traffic",
  ],
];

const compatibilityTools = [
  'Docker',
  'Node.js containers',
  'Docker Compose',
  'Docker for Mac',
  'Docker for Windows',
  'Golang containers',
  'Apt-Get, Apk, Npm, and other build tools',
  'PHP+Apache containers',
  'Ruby containers',
  'Curl, Wget, Httpie, and other Bash clients',
  'Java containers',
  'Rust containers',
  'Python containers',
];

const mobileCompatibilityTools = [
  'Docker for Mac',
  'Node.js containers',
  'Docker',
  'Docker for Windows',
  'PHP+Apache containers',
  'Python containers',
  'Rust containers',
  'Docker Compose',
  'Java containers',
  'Golang containers',
  'Ruby containers',
  'Apt-Get, Apk, Npm, and other build tools',
  'Curl, Wget, Httpie, and other Bash clients',
];

export default function DockerIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Http Toolkit and Docker integrated"
        text="Intercept & view all Docker HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors."
        icon={DockerLogo}
        breadcrumbText="docker"
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
      <IntegrationSteps title="Two ways to get started" subtitle="getting started" steps={dockerIntegrationSteps} />
      <IntegrationCompatibility
        title="Supported by Docker"
        subtitle="compatibility"
        tools={compatibilityTools}
        mobileTools={mobileCompatibilityTools}
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
