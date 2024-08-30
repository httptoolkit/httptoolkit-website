import type { Metadata } from 'next/types';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { ModifyFeatures } from '@/components/common-sections/modify-features';
import { WindowsLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';

export const metadata: Metadata = buildMetadata({
  title: 'Intercept, debug & mock HTTP on Windows',
  description:
    'HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Windows computer.',
});

export default async function ForWindowsPage() {
  return (
    <>
      <CTA
        $bgVariant="left-top-to-bottom-right"
        icon={WindowsLogo}
        heading="Intercept, debug & mock HTTP on Windows"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Windows computer."
        video={{id: 'chrome'}}
        downloadButtonDefaultOsValue="windows"
      />
      <HttpToolkitFeatures />
      <TryItForYourselfCTA />
      <ModifyFeatures />
    </>
  );
}
