import { Logo, RocketLaunch } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';

export default async function FiddlerPage() {
  return (
    <>
      <CTA
        heading="Looking for a Fiddler alternative?"
        excerpt="HTTP Toolkit is a modern powerful alternative to Fiddler designed from the ground up for instant targeted debugging and control of any HTTP(S) traffic."
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          withBorderAnimation: true,
          alt: 'Hero',
          priority: true,
        }}
      />

      <CTA
        isHero={false}
        icon={Logo}
        heading="Try it for yourself"
        excerpt="It is completely free! You can also Go Pro and explore the Http Toolkit with additional features."
        cta={{
          title: 'Go Prop!',
          icon: RocketLaunch,
          href: '/pro',
        }}
      />
    </>
  );
}
