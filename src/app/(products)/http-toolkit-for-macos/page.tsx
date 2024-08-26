import type { Metadata } from 'next/types';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { MockResponseFeatures } from '@/components/common-sections/mock-response-features';
import { AppleLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Intercept, debug & mock HTTP(S) on macOS',
  description:
    'HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your macOS computer.',
});

export default async function ForMacOsPage() {
  return (
    <>
      <CTA
        $bgVariant="left-bottom-to-top-right"
        icon={AppleLogo}
        heading="Intercept, debug & mock HTTP(S) on macOS"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your macOS computer."
        video={{id: 'chrome'}}
        downloadButtonDefaultOsValue="mac"
      />
      <HttpToolkitFeatures />
      <MockResponseFeatures />
    </>
  );
}
