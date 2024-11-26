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
        tooltip: 'Turn intercepted traffic into an equivalent rule in one click, to quickly match & modify the traffic you\'re interested in',
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
    title: 'Advanced Configuration',
    items: [
      {
        title: 'Customize proxy port & HTTP versions',
        tooltip: 'Change the port the proxy listens on, and configure the ALPN settings preferences to select client HTTP versions',
        checked: ['pro', 'team'],
      },
      {
        title: 'Pass through TLS unintercepted',
        tooltip: 'Configure a list of incoming hostnames that should skip interception entirely, to avoid interfering with specific connections',
        checked: ['pro', 'team'],
      },
      {
        title: 'Reconfigure upstream TLS settings',
        tooltip: 'Trust extra CA certificates, configure client certificates, and relax TLS checks completely for certain upstream hostnames',
        checked: ['pro', 'team'],
      },
      {
        title: 'Redirect traffic through upstream proxies',
        tooltip: 'Forward traffic through an upstream proxy, to support enterprise environments or chain multiple proxy tools together',
        checked: ['pro', 'team'],
      },
      {
        title: 'Add your own custom OpenAPI specs',
        tooltip: 'Add your own OpenAPI specs, to validate traffic against your API contract and show dynamic documentation alongside each request',
        checked: ['pro', 'team'],
      },
      {
        title: 'Choose your own custom UI theme',
        tooltip: 'Switch between themes independent of your system settings, or load your own totally custom UI theme to override everything',
        checked: ['pro', 'team']
      }
    ]
  },
  {
    title: 'Billing & Management',
    items: [
      {
        title: 'Account licensed to a single individual',
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
    title: 'How do Pro accounts work?',
    text: 'Pro accounts give you access to all paid product features, from import/export of intercepted traffic & rewriting rules to advanced configuration options.\n\nYour Pro account can be used on as many devices as you like, by logging into each device separately.\n\nThe account is permanently linked to a single individual - the primary user of the registered email address - and must not be shared or transferred. If it\'s clear that an account is being shared between multiple users then your account may be terminated (although we\'ll always get in touch with you about this first).',
  },
  {
    title: 'How do Team accounts work?',
    text: 'Team accounts provide a group of people access to all paid features. They simplify group account management and billing, and allow transfer of licenses between individuals, as users leave and join the team.\n\nWith a Team subscription, rather than every team member signing up individually, managing their own Pro subscriptions and receiving their own invoices, one account owner can subscribe for many team members, and centrally pay and manage the team\'s account.\n\nEach Team subscription includes a total number of licenses for use by individual team members. The subscription is linked to the email addresses of each user who should be included as a team member. Each of those users gets access to all paid features in the HTTP Toolkit app.\n\nWhilst Pro accounts are permanently linked to an individual, Team licenses can be transferred between individuals, to add or remove members from the team. Each license can be transferred once every 48 hours.\n\nEach team member counts towards the total number of licenses available. The account owner by default does not, and cannot access paid features other than subscription management, but can be included in the list of team members too if you\'d like.',
  },
  {
    title: 'How can I manage or cancel my subscription?',
    text: 'From the online account dashboard at [accounts.httptoolkit.tech](https://accounts.httptoolkit.tech/) you can manage every aspect of your subscription, including:\n\n- Cancelling in two clicks\n- Updating your billing details\n- Accessing all historical invoices\n- Adding and removing users from your Team subscription.\n\nIt\'s also possible to do these most common actions (updating billing details, cancelling a subscription, and accessing your last invoice) directly from the \'Settings\' page in the HTTP Toolkit app.',
  },
  {
    title: 'What payment methods are available?',
    text: 'The payment methods available depend on your region.\n\nCredit cards and PayPal are available for all purchases globally, but in specific regions it\'s also possible to pay with iDEAL, Giropay, WebMoney, Boleto Bancario, Alipay, Real-time Bank Transfer, CarteBleue, Sofort, MrCash, EPS, Przelewy24, Multibanco-SIBS, Trustly, MercadoPago, ToditoCash, Finnish Online Banking, DragonPay, AmBank, CIMB Clicks, Hong Leong Bank Transfer, Maybank2U, OP-Pohjola, Nordea, Danske, UnionPay, Konbini, WeChat Pay, ApplePay, Pix, Mach Pay, OXXO, and PagoEfectivo.\n\nThe available methods will be shown automatically during the checkout when you\'ve selected your country. If your preferred payment method is listed above but isn\'t available during the checkout, please [get in touch](/contact/) as it may be possible to process this manually.\n\n On request it\'s also possible to pay by purchase order (PO) and wire transfer, for payments over $2,000, but please note that this may entail delays and additional charges.',
  },
  {
    title: 'Can I get a trial?',
    text: 'There\'s no Pro trial option available, however you can use all the core features for free, and it\'s very easy to subscribe for a single month of Pro access to test it. To do so, simply sign up for a monthly subscription, and then cancel immediately.',
  }
];
