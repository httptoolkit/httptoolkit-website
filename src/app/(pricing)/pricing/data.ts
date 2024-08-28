import type { PricingComparisonProps } from '@/components/sections/pricing/comparison/comparison.types';
import type { TextWithAccordionProps } from '@/components/sections/text-with-accordion/text-with-accordion.types';

export const comparisonPlans: PricingComparisonProps['plans'] = [
  {
    id: 'free',
    title: 'Hobbyist',
  },
  {
    id: 'pro',
    title: 'Professional',
  },
  {
    id: 'team',
    title: 'Team',
  },
];
export const planFeatures: PricingComparisonProps['features'] = [
  {
    title: 'Core Features',
    items: [
      {
        title: 'Intercept all supported clients',
        tooltip: 'Automated one-click setup for all supported clients, from mobile devices to Docker, and usable manually as an HTTP proxy by unsupported clients too',
        checked: ['free', 'pro', 'team'],
      },
      {
        title: 'Inspect any raw HTTP data',
        tooltip: 'Explore the headers, bodies, and more, for every intercepted request, response or WebSocket',
        checked: ['free', 'pro', 'team'],
      },
      {
        title: 'Filter and prune intercepted sessions',
        tooltip: 'Use selections of powerful filters to find traffic, and pin & delete messages to collect the key content you\'re looking for',
        checked: ['free', 'pro', 'team'],
      },
      {
        title: 'Rewrite traffic manually',
        tooltip: 'Precisely set breakpoints on traffic to pause requests or responses and manually edit any part of their content',
        checked: ['free', 'pro', 'team'],
      },
      {
        title: 'Manually send HTTP requests',
        tooltip: 'Use the built-in request editor to send your own custom HTTP requests, with full control over every detail',
        checked: ['free', 'pro', 'team'],
      },
      {
        title: '100% Open Source',
        checked: ['free', 'pro', 'team'],
      },
    ],
  },
  {
    title: 'Automated Rules',
    items: [
      {
        title: 'Configure mock responses',
        tooltip: 'Configured fixed responses for matching requests, even if the endpoint or server doesn\'t exist',
        checked: ['pro', 'team'],
      },
      {
        title: 'Transform messages automatically',
        tooltip: 'Define transformations on requests or responses as they\'re proxied, to automatically redirect them, modify content, or replace message parts entirely',
        checked: ['pro', 'team'],
      },
      {
        title: 'Inject errors & timeouts',
        tooltip: 'Easily simulate failure scenarios with failing status codes, connection resets, and timeouts',
        checked: ['pro', 'team'],
      },
      {
        title: 'Create rules directly from real traffic',
        tooltip: 'Turn intercepted traffic into an equivalent mock rule in one click, to quickly match & modify the traffic you\'re interested in',
        checked: ['pro', 'team'],
      }
    ],
  },
  {
    title: 'Supercharged Debugging Tools',
    items: [
      {
        title: 'Build custom filter aliases',
        tooltip: 'Define your own custom traffic filters, with aliases to instantly hone in on the traffic you care about',
        checked: ['pro', 'team'],
      },
      {
        title: 'Edit & resend intercepted requests',
        tooltip: 'Copy intercepted traffic into the request editor in one click, to edit and resend it yourself',
        checked: ['pro', 'team'],
      },
      {
        title: 'Analyze HTTP compression & caching',
        tooltip: 'Maximize your traffic performance, with intelligent summaries of caching behaviour and comparisons of compression approaches',
        checked: ['pro', 'team'],
      },
      {
        title: 'Get docs & validation for 2600+ APIs',
        tooltip: 'Use 2600+ built-in OpenAPI specs or add your own, to automatically validate traffic and show API-specific documentation inline with each request',
        checked: ['pro', 'team'],
      }
    ],
  },
  {
    title: 'Import & Export',
    items: [
      {
        title: 'Import and export your rules',
        tooltip: 'Share rules with your team, or import rules from others, to quickly get started with new projects or build a library of request mocks',
        checked: ['pro', 'team'],
      },
      {
        title: 'Import and export intercepted traffic',
        tooltip: 'Store and share captured traffic for later, by exporting entire sessions, filtered subsets, or individual messages in interoperable HAR format',
        checked: ['pro', 'team'],
      },
      {
        title: 'Export requests as ready-to-use code',
        tooltip: 'Export intercepted requests as ready-to-use code snippets for more than 20 other tools & languages, to quickly integrate them into your own projects',
        checked: ['pro', 'team'],
      }
    ]
  },
  {
    title: 'Billing & Management',
    items: [
      {
        title: 'Accounts licensed to a single individual',
        tooltip: 'Pro accounts are strictly licensed only for a single fixed individual user (on any number of devices)',
        checked: ['pro'],
      },
      {
        title: 'Transferrable licenses',
        tooltip: 'Team licenses can be transferred between team members, to easily share licenses and reorganize as your team changes',
        checked: ['team'],
      },
      {
        title: 'Centralized payment',
        tooltip: 'Easily manage payment for multiple users, with a single payment method & invoice covering all licenses',
        checked: ['team'],
      },
      {
        title: 'Centralized account management',
        tooltip: 'Manage your team members, invoices, and subscription settings from an online dashboard, with an administrator account that can be separate from the team itself',
        checked: ['team']
      }
    ]
  }
];

export const FAQItems: TextWithAccordionProps['accordionItems'] = [
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
