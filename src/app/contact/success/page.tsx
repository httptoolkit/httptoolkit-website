import { LandingLayout } from '@/components/layout/landing-layout';
import { SuccessHero } from '@/components/sections/success-hero';

export default function ContactSuccessPage() {
  return (
    <LandingLayout>
      <SuccessHero heading="Thank you for contacting us!" excerpt="We will get back to you soon." />
    </LandingLayout>
  );
}
