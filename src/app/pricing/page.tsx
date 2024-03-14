import { CaretRight } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';
import { PricingComparison } from '@/components/sections/pricing/comparison';
import type { PricingComparisonProps } from '@/components/sections/pricing/comparison/comparison.types';
import { TextWithAccordion } from '@/components/sections/text-with-accordion';
import type { TextWithAccordionProps } from '@/components/sections/text-with-accordion/text-with-accordion.types';

const comparisonPlans: PricingComparisonProps['plans'] = [
  {
    id: 'hobbyist',
    title: 'Hobbyist',
    isDownload: true,
    CTA: {
      $variant: 'secondary',
    },
  },
  {
    id: 'professional',
    title: 'Professional',
    isDownload: false,
    CTA: {
      $variant: 'primary',
      as: 'link',
      href: '/',
      children: 'Buy Pro',
    },
  },
  {
    id: 'team',
    title: 'Team',
    isDownload: false,
    CTA: {
      $variant: 'secondary',
      as: 'link',
      href: '/',
      children: 'Get in touch',
    },
  },
];
const planFeatures: PricingComparisonProps['features'] = [
  {
    title: 'Key features',
    items: [
      {
        title: 'Users',
        tooltip: 'Users example',
        checked: ['hobbyist', 'professional', 'team'],
      },
      {
        title: 'Users 1',
        tooltip: 'This is a tooltip',
        checked: ['hobbyist', 'team', 'professional'],
      },
    ],
  },
  {
    title: 'Debugging Tools',
    items: [
      {
        title: 'Multiple Filters',
        tooltip: 'Multiple Filters example',
        checked: ['professional', 'team'],
      },
      {
        title: 'Breakpoint',
        tooltip: 'This is a tooltip',
        checked: ['team', 'professional'],
      },
      {
        title: 'Breakpoint 2',
        tooltip: 'This is a tooltip',
        checked: ['team', 'professional'],
      },
      {
        title: 'Breakpoint 3',
        tooltip: 'This is a tooltip',
        checked: ['team', 'professional'],
      },
    ],
  },
  {
    title: 'Integrations',
    items: [
      {
        title: 'Android',
        tooltip: 'This is a tooltip',
        checked: ['team', 'professional'],
      },
      {
        title: 'Javascript',
        tooltip: 'This is a tooltip',
        checked: ['team', 'professional'],
      },
      {
        title: 'Java',
        tooltip: 'This is a tooltip',
        checked: ['team', 'professional'],
      },
    ],
  },
];

const FAQItems: TextWithAccordionProps['accordionItems'] = [
  {
    title: 'What are the subscription options?',
    text: 'Remember that the goal is to create a user-friendly and informative experience that guides visitors toward making a confident purchase decision. Regularly update product pages with accurate information and monitor user behavior to make continuous improvements.',
  },
  {
    title: 'What payment methods are available?',
    text: 'Remember that the goal is to create a user-friendly and informative experience that guides visitors toward making a confident purchase decision. Regularly update product pages with accurate information and monitor user behavior to make continuous improvements.',
  },
  {
    title: 'How can I manage my subscription?',
    text: 'Remember that the goal is to create a user-friendly and informative experience that guides visitors toward making a confident purchase decision. Regularly update product pages with accurate information and monitor user behavior to make continuous improvements.',
  },
  {
    title: 'How can you make my data secure?',
    text: 'Remember that the goal is to create a user-friendly and informative experience that guides visitors toward making a confident purchase decision. Regularly update product pages with accurate information and monitor user behavior to make continuous improvements.',
  },
  {
    title: 'Can I get a trial?',
    text: 'Remember that the goal is to create a user-friendly and informative experience that guides visitors toward making a confident purchase decision. Regularly update product pages with accurate information and monitor user behavior to make continuous improvements.',
  },
];

export default function PricingPage() {
  return (
    <>
      <CTA
        $variant="pricing-hero"
        heading="Developer tools built for professionals"
        subHeading={{
          text: 'pricing',
        }}
        excerpt="Your time is valuable. HTTP Toolkit gives you instant insight and access into every request & response, with zero hassle. Test clie nts, debug APIs and catch bugs, all at lightning speed."
        withDownload={false}
      ></CTA>
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
    </>
  );
}
