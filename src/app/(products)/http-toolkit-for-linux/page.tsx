import { LinuxLogo } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';

export default async function ForLinuxPage() {
  return (
    <>
      <CTA
        $bgVariant="rigth-bottom-to-top-left"
        icon={LinuxLogo}
        heading="Intercept, debug & mock HTTP(S) on Linux"
        excerpt="HTTP Toolkit lets you easily see and modify HTTP & HTTPS messages from applications, browsers, scripts & more on your Linux computer."
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
