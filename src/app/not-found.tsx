import { ArrowRight } from '@/components/elements/icon';
import { LandingLayout } from '@/components/layout/landing-layout';
import { CTA } from '@/components/sections/cta';

export default function NotFound() {
  return (
    <LandingLayout>
      <CTA
        textAppearance="small"
        subHeading={{ text: '404 error' }}
        heading="We can't find that page"
        excerpt="Sorry, the page you are looking for doesn't exist or has been moved."
        withDownload={false}
        cta={{
          title: 'Go to the Homepage',
          icon: ArrowRight,
          href: '/',
          $variant: 'primary',
        }}
      />
    </LandingLayout>
  );
}
