import type { Metadata } from 'next/types';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { ModifyFeatures } from '@/components/common-sections/modify-features';
import { AppleLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';

export const metadata: Metadata = buildMetadata({
  title: 'Intercept, debug & mock HTTP on Mac',
  description:
    'HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Mac.',
});

export default async function ForMacOsPage() {
  return (
    <>
      <CTA
        $bgVariant="left-bottom-to-top-right"
        icon={AppleLogo}
        heading="Intercept, debug & mock HTTP on macOS"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Mac."
        video={{id: 'chrome'}}
        downloadButtonDefaultOsValue="mac"
      />
      <HttpToolkitFeatures />
      <TryItForYourselfCTA />
      <ModifyFeatures />
    </>
  );
}
