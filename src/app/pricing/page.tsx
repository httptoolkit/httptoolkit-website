import { CaretRight } from '@/components/elements/icon';
import { CTA } from '@/components/sections/cta';
import { TextWithAccordion } from '@/components/sections/text-with-accordion';
import type { TextWithAccordionProps } from '@/components/sections/text-with-accordion/text-with-accordion.types';

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
      <TextWithAccordion
        title="Frequently Asked Questions"
        text="Create rules to match requests and respond with your own content, to quickly prototype against new endpoints or services."
        cta={{
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
