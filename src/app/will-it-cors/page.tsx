import type { Metadata } from 'next/types';

import { Text } from '@/components/elements/text';
import { LandingLayout } from '@/components/layout/landing-layout';
import { CTA } from '@/components/sections/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Will It CORS? - a CORS debugging tool that actually works.',
  description: 'Literally nobody understands CORS, except this one magic web page',
});

export default function WillItCorsPage() {
  return (
    <LandingLayout isNavigationEnabled={false}>
      <CTA
        variant="cta-narrow"
        textAppearance="small"
        heading="Will it CORS?"
        excerpt={
          <>
            <Text fontSize="l">
              <strong>Cross-Origin Resource Sharing (CORS)</strong> is how browsers decide how web applications can
              communicate with other services.
            </Text>
            <Text fontSize="l">
              Restricting this is important for security, but it&apos;s hard to understand how CORS works, which means
              sending HTTP requests to APIs can be difficult & confusing.
            </Text>
            <Text fontSize="l">
              Tell this magic CORS machine what you want, and it&apos;ll tell you exactly what to do!
            </Text>
          </>
        }
        withDownload={false}
        cta={{
          href: '/will-it-cors/source-url/',
          title: 'Get Started!',
          $variant: 'primary',
          $withBorder: true,
        }}
      />
    </LandingLayout>
  );
}
