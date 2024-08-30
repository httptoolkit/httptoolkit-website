import type { SwitchProps } from './components/switch/switch.types';
import type { PricingPlansData } from './plans.types';

export const intervalOptions: SwitchProps['options'] = [
  {
    id: 'annual',
    text: 'Pay yearly ',
  },
  {
    id: 'monthly',
    text: 'Pay monthly',
  },
];

export const { plans }: PricingPlansData = {
  plans: [
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
            'Manually rewrite intercepted traffic with request & response breakpoints',
            'Send your own requests directly with the built-in HTTP client tools'
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
            'Reusable Modify & Send tools. Persistent by default, plus import/export so you can store, reuse & share your rules & requests',
            'Import/export for all traffic as [HARs](https://en.wikipedia.org/wiki/HAR_(file_format)) or ready-to-use code for 20+ tools.',
            'Advanced HTTP debugging tools including compression & caching analysis, and \'resend\' functionality.',
            'Validation & API documentation for 2600+ built-in APIs, from AWS to GitHub to Stripe, plus your own custom [OpenAPI](https://swagger.io/docs/specification/about/) specs.',
            'Advanced customization including TLS passthrough, proxy ports, whitelisted & client certificates, and upstream proxies.',
            'Support open-source development!',
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
