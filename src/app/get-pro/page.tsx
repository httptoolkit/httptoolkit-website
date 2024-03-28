import { Suspense } from 'react';

import { FAQItems, comparisonPlans, planFeatures } from '../pricing/data';

import { Testimonials } from '@/components/common-sections/testimonials';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { CaretRight } from '@/components/elements/icon';
import { Layout } from '@/components/layout';
import { CTA } from '@/components/sections/cta';
import { PricingComparison } from '@/components/sections/pricing/comparison';
import { PricingPlans } from '@/components/sections/pricing/plans';
import { TextWithAccordion } from '@/components/sections/text-with-accordion';

export default function PricingPage() {
  return (
    <Layout>
      <CTA
        variant="pricing-hero"
        heading="Developer tools built for professionals"
        subHeading={{
          text: 'pricing',
        }}
        excerpt="Your time is valuable. HTTP Toolkit gives you instant insight and access into every request & response, with zero hassle. Test clie nts, debug APIs and catch bugs, all at lightning speed."
        withDownload={false}
      >
        <Suspense>
          <PricingPlans $hideFree />
        </Suspense>
      </CTA>
      <PricingComparison
        title="Features"
        text="Choose the perfect plan for your business needs"
        plans={comparisonPlans}
        features={planFeatures}
      />
      <TextWithAccordion
        title="Frequently Asked Questions"
        text="Create rules to match requests and respond with your own content, to quickly prototype against new endpoints or services."
        cta={{
          $small: true,
          $variant: 'secondary',
          children: 'See more FAQs',
          icon: CaretRight,
          as: 'link',
          href: '/',
        }}
        accordionItems={FAQItems}
      />
      <Suspense>
        <Testimonials />
      </Suspense>
      <TryItForYourselfCTA variant="cta-fluid" />
    </Layout>
  );
}
