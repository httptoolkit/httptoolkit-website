import type { SwitchProps } from './components/switch/switch.types';
import type { PricingPlansData } from './plans.types';

export const pricingPlans: SwitchProps['options'] = [
  {
    id: 'annual',
    text: 'Pay yearly ',
  },
  {
    id: 'monthly',
    text: 'Pay monthly',
  },
];

export const { cards }: PricingPlansData = {
  cards: [
    {
      $isHighlighted: false,
      id: 'free',
      title: 'Hobbyist',
      priceDescription: '',
      features: [
        {
          text: 'Includes all the basic features you need to start viewing & rewriting your HTTP traffic:',
          items: [
            'Automatically intercept all supported clients',
            'Inspect and debug raw HTTP data',
            'Filter, delete & pin requests',
            'Manually rewrite HTTP with request & response breakpoints',
          ],
        },
      ],
    },
    {
      $isHighlighted: true,
      id: 'pro',
      title: 'Professional',
      priceDescription: 'per month',
      features: [
        {
          text: 'All Hobbyist features, plus:',
          items: [
            'Automated HTTP mocking & rewriting including traffic redirection, mock responses, and errors & timeouts.',
            'Import/export mock rules, and [HARs](https://en.wikipedia.org/wiki/HAR_(file_format)) or ready-to-use code for 20+ tools, for all sent or intercepted requests.',
            'Advanced HTTP debugging tools including compression & caching analysis, and "resend" functionality.',
            'Validation & API documentation for 2600+ built-in APIs, from AWS to GitHub to Stripe, plus your own custom [OpenAPI](https://swagger.io/docs/specification/about/) specs.',
            'Advanced customization including UI themes, whitelisted & client certificates, ports, and upstream proxies.',
            'Support ongoing development!',
          ],
        },
      ],
    },
    {
      $isHighlighted: false,
      id: 'team',
      title: 'Team',
      priceDescription: 'per user, per month',
      features: [
        {
          text: 'All Hobbyist and Professional features, plus...',
          items: [
            'Centralized billing to simplify payment for your team',
            'Licensed to your team, not permanently linked to individuals',
            'Team workspaces for low-friction collaboration (coming soon)',
          ],
        },
        {
          text: 'Options available on request:',
          items: [
            'Fixed-term bespoke licensing',
            'Private support',
            'Self-hosted infrastructure',
            'Training & consultancy',
            'Bulk discounts',
          ],
        },
      ],
    },
  ],
};
