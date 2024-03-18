'use client';

import { useState } from 'react';

import { PricingCard } from './components/card';
import { Switch } from './components/switch';
import type { SwitchProps } from './components/switch/switch.types';
import {
  StyledPricingPlansCardsWrapper,
  StyledPricingPlansSwitchBadge,
  StyledPricingPlansSwitchWrapper,
  StyledPricingPlansWrapper,
} from './plans.styles';
import type { PricingPlansProps } from './plans.types';

import { PaperPlaneTilt, Sparkle } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';

const pricingPlans: SwitchProps['options'] = [
  {
    id: 'yearly',
    text: 'Pay yearly ',
  },
  {
    id: 'monthly',
    text: 'Pay monthly',
  },
];

const { monthly, yearly, disclaimer }: PricingPlansProps = {
  disclaimer: 'Prices do not include local Tax.',
  monthly: {
    cards: [
      {
        $isHighlighted: false,
        title: 'Hobbyist',
        price: 0,
        priceDescription: '',
        isDownload: true,
        CTA: {
          $variant: 'secondary',
        },
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
        title: 'Professional Monthly',
        price: 7,
        priceDescription: '/ per month',
        isDownload: false,
        CTA: {
          $variant: 'primary',
          children: 'Buy Pro',
          icon: Sparkle,
          as: 'link',
          href: '/',
        },
        features: [
          {
            text: 'All Hobbyist features, plus:',
            items: [
              'Automated HTTP mocking & rewriting including traffic redirection, mock responses, and errors & timeouts.',
              'Import/export mock rules, and code or [HARs](https://example.com) of collected traffic',
              'Advanced HTTP debugging and inspection including compression & caching analysis',
              'Validation & API documentation for 2600+ built-in APIs, from AWS to GitHub to Stripe, plus your own custom [OpenAPI](https://example.com) specs.',
              'Advanced customization including UI themes, whitelisted & client certificates, ports, and upstream proxies.',
              'Support ongoing development!',
            ],
          },
        ],
      },
      {
        $isHighlighted: false,
        title: 'Team',
        price: 11,
        priceDescription: '/ per user / per month',
        isDownload: false,
        CTA: {
          $variant: 'secondary',
          children: 'Get in touch',
          icon: PaperPlaneTilt,
        },
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
  },
  yearly: {
    badge: 'save 20%!',
    cards: [
      {
        $isHighlighted: false,
        title: 'Hobbyist',
        price: 0,
        priceDescription: '',
        isDownload: true,
        CTA: {
          $variant: 'secondary',
        },
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
        title: 'Professional',
        price: 7,
        priceDescription: '/ per month',
        isDownload: false,
        CTA: {
          $variant: 'primary',
          children: 'Buy Pro',
          icon: Sparkle,
          as: 'link',
          href: '/',
        },
        features: [
          {
            text: 'All Hobbyist features, plus:',
            items: [
              'Automated HTTP mocking & rewriting including traffic redirection, mock responses, and errors & timeouts.',
              'Import/export mock rules, and code or [HARs](https://example.com) of collected traffic',
              'Advanced HTTP debugging and inspection including compression & caching analysis',
              'Validation & API documentation for 2600+ built-in APIs, from AWS to GitHub to Stripe, plus your own custom [OpenAPI](https://example.com) specs.',
              'Advanced customization including UI themes, whitelisted & client certificates, ports, and upstream proxies.',
              'Support ongoing development!',
            ],
          },
        ],
      },
      {
        $isHighlighted: false,
        title: 'Team',
        price: 11,
        priceDescription: '/ per user / per month',
        isDownload: false,
        CTA: {
          $variant: 'secondary',
          children: 'Get in touch',
          icon: PaperPlaneTilt,
        },
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
  },
};

export const PricingPlans = () => {
  const [pricingPlan, setPricingPlan] = useState(pricingPlans[0].id);
  const plan = pricingPlan === 'monthly' ? monthly : yearly;
  return (
    <StyledPricingPlansWrapper>
      <StyledPricingPlansSwitchWrapper>
        {plan.badge && (
          <StyledPricingPlansSwitchBadge>
            <Text fontSize="s" fontWeight="bold" color="alwayLightGrey" $isLabel>
              {plan.badge}
            </Text>
          </StyledPricingPlansSwitchBadge>
        )}
        <Switch options={pricingPlans} onChange={setPricingPlan} defaultValue={pricingPlan} />
      </StyledPricingPlansSwitchWrapper>
      <StyledPricingPlansCardsWrapper>
        {Array.isArray(plan.cards) && plan.cards.length > 0 && plan.cards.map(card => <PricingCard {...card} />)}
      </StyledPricingPlansCardsWrapper>
      <Text fontSize="m" color="darkGrey" textAlign="center">
        {disclaimer}
      </Text>
    </StyledPricingPlansWrapper>
  );
};
