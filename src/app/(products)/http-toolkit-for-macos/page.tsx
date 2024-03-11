import { AppleLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';

export default async function ForMacOsPage() {
  return (
    <>
      <CTA
        $bgVariant="left-bottom-to-top-right"
        icon={AppleLogo}
        heading="Intercept, debug & mock HTTP(S) on macOS"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your macOS computer."
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          withBorderAnimation: true,
          alt: 'Hero',
          loading: 'eager',
        }}
      />
    </>
  );
}
