import type { Metadata } from 'next/types';

import { HttpToolkitFeatures } from '@/components/common-sections/http-toolkit-features';
import { ModifyFeatures } from '@/components/common-sections/modify-features';
import { LinuxLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';

export const metadata: Metadata = buildMetadata({
  title: 'Intercept, debug & mock HTTP on Linux',
  description:
    'HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Linux computer.',
});

export default async function ForLinuxPage() {
  return (
    <>
      <CTA
        $bgVariant="rigth-bottom-to-top-left"
        icon={LinuxLogo}
        heading="Intercept, debug & mock HTTP on Linux"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Linux computer."
        video={{id: 'chrome'}}
        downloadButtonDefaultOsValue="linux"
      />
      <HttpToolkitFeatures />
      <TryItForYourselfCTA />
      <ModifyFeatures />
    </>
  );
}
