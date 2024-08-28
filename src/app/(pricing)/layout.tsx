import { Suspense } from 'react';

import { FAQItems, comparisonPlans, planFeatures } from './pricing/data';

import { Testimonials } from '@/components/common-sections/testimonials';
import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { CaretRight } from '@/components/elements/icon';
import { Layout } from '@/components/layout';
import { PricingComparison } from '@/components/sections/pricing/comparison';
import { TextWithAccordion } from '@/components/sections/text-with-accordion';

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Suspense>{children}</Suspense>
      <PricingComparison
        title="Features"
        text="Choose the perfect plan for your business needs"
        plans={comparisonPlans}
        features={planFeatures}
      />
      <TextWithAccordion
        title="Frequently Asked Questions"
        text=""
        cta={{
          $small: true,
          $variant: 'secondary',
          children: 'See more FAQs',
          icon: CaretRight,
          as: 'link',
          href: '/docs/faq/payments',
        }}
        accordionItems={FAQItems}
      />
      <Suspense>
        <Testimonials />
      </Suspense>
      <TryItForYourselfCTA isFooterClose variant="cta-fluid" />
    </Layout>
  );
}
