import { WindowsLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';

export default async function ForWindowsPage() {
  return (
    <>
      <CTA
        $bgVariant="left-top-to-bottom-right"
        icon={WindowsLogo}
        heading="Intercept, debug & mock HTTP(S) on Windows"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Windows computer."
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          withBorderAnimation: true,
          alt: 'Hero',
          priority: true,
        }}
      />
    </>
  );
}
