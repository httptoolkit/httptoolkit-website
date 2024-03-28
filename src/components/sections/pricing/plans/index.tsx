'use client';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';

import { PricingCard } from './components/card';
import { LoginInfo } from './components/login-info';
import { Switch } from './components/switch';
import type { SwitchProps } from './components/switch/switch.types';
import { usePlanCta } from './hooks/get-plan-cta';
import {
  StyledPricingPlansCardsWrapper,
  StyledPricingPlansDisclaimerWrapper,
  StyledPricingPlansSwitchBadge,
  StyledPricingPlansSwitchWrapper,
  StyledPricingPlansWrapper,
} from './plans.styles';
import type { PricingPlansData, StyledPricingPlansProps } from './plans.types';

import { Spinner } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { AccountStore } from '@/lib/store/account-store';

const pricingPlans: SwitchProps['options'] = [
  {
    id: 'annual',
    text: 'Pay yearly ',
  },
  {
    id: 'monthly',
    text: 'Pay monthly',
  },
];

const annualBadge = 'Save 20%';

const { cards, disclaimer }: PricingPlansData = {
  disclaimer: 'Prices do not include local Tax.',
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
      priceDescription: '/ per month',
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
      id: 'team',
      title: 'Team',
      priceDescription: '/ per user / per month',
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

export const PricingPlans = observer(({ $hideFree }: StyledPricingPlansProps) => {
  const [account] = useState(() => new AccountStore());
  const [planCycle, setPlanCycle] = useState(pricingPlans[0].id);
  const getPlanCTA = usePlanCta();

  const isAnnual = planCycle === 'annual';
  const filteredCards = $hideFree ? cards.filter(card => card.id !== 'free') : cards;
  const { isLoggedIn, user, waitingForPurchase } = account;

  const getPlanMonthlyPrice = useCallback(
    (tierCode: string) => {
      const sku = account.getSKU(tierCode, planCycle);
      const subscriptionPlans: any = account.subscriptionPlans;
      if (!subscriptionPlans) return <Spinner />;
      const price: string = subscriptionPlans[sku]?.prices?.monthly || '';
      return price || 0;
    },
    [planCycle],
  );

  const getPlanStatus = useCallback((tierCode: string) => {
    const { paidTier, paidCycle, status } = account.subscription;

    if (paidTier !== tierCode) return;

    const statusDescription =
      {
        active: 'Active',
        trialing: 'Active trial',
        past_due: 'Past due',
        deleted: 'Active but cancelled',
      }[status as string] || 'Unknown';

    return paidCycle === planCycle ? statusDescription : `${statusDescription} (${paidCycle})`;
  }, []);

  return (
    <>
      <StyledPricingPlansWrapper>
        <StyledPricingPlansSwitchWrapper>
          {isAnnual && (
            <StyledPricingPlansSwitchBadge>
              <Text fontSize="s" fontWeight="bold" color="alwayLightGrey" $isLabel>
                {annualBadge}
              </Text>
            </StyledPricingPlansSwitchBadge>
          )}
          <Switch options={pricingPlans} onChange={setPlanCycle} defaultValue={planCycle} />
        </StyledPricingPlansSwitchWrapper>
        <StyledPricingPlansCardsWrapper $hideFree={$hideFree}>
          {Array.isArray(filteredCards) &&
            filteredCards.length > 0 &&
            filteredCards.map(card => (
              <PricingCard
                key={card.id}
                isPaidYearly={isAnnual}
                status={getPlanStatus(card.id)}
                price={getPlanMonthlyPrice(card.id)}
                {...card}
              >
                {getPlanCTA(card.id, account, waitingForPurchase, planCycle)}
              </PricingCard>
            ))}
        </StyledPricingPlansCardsWrapper>
        <StyledPricingPlansDisclaimerWrapper>
          <Text fontSize="m" color="darkGrey" textAlign="center">
            {disclaimer}
          </Text>
          <LoginInfo isLoggedIn={isLoggedIn} email={(user as any).email} />
        </StyledPricingPlansDisclaimerWrapper>
      </StyledPricingPlansWrapper>
    </>
  );
});
