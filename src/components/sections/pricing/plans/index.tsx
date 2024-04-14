'use client';

import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';

import { PricingCard } from './components/card';
import { LoginInfo } from './components/login-info';
import { Switch } from './components/switch';
import { pricingPlans, cards, annualBadge, disclaimer } from './data';
import { usePlanCta } from './hooks/get-plan-cta';
import {
  StyledPricingPlansCardsWrapper,
  StyledPricingPlansDisclaimerWrapper,
  StyledPricingPlansSwitchBadge,
  StyledPricingPlansSwitchWrapper,
  StyledPricingPlansWrapper,
  StyledLoadingSpinner,
} from './plans.styles';
import type { StyledPricingPlansProps } from './plans.types';

import { Spinner } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { AccountStore } from '@/lib/store/account-store';

export const LoadingPrice = () => {
  return (
    <StyledLoadingSpinner>
      <Spinner />
    </StyledLoadingSpinner>
  );
};

export const PricingPlans = observer(({ $hideFree, downloadButton }: StyledPricingPlansProps) => {
  const [account] = useState(() => new AccountStore());
  const [planCycle, setPlanCycle] = useState(pricingPlans[0].id);
  const getPlanCTA = usePlanCta(downloadButton);

  const isAnnual = planCycle === 'annual';
  const filteredCards = $hideFree ? cards.filter(card => card.id !== 'free') : cards;
  const { isLoggedIn, user, waitingForPurchase } = account;

  const getPlanMonthlyPrice = useCallback(
    (tierCode: string) => {
      const sku = account.getSKU(tierCode, planCycle);
      const subscriptionPlans: any = account.subscriptionPlans;
      if (!subscriptionPlans) return <LoadingPrice />;
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
