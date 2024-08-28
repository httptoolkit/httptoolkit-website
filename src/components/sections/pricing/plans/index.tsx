'use client';

import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { Interval } from '@httptoolkit/accounts';

import { PricingCard } from './components/card';
import { LoginInfo } from './components/login-info';
import { Switch } from './components/switch';
import { pricingPlans, cards } from './data';
import { usePlanCta } from './hooks/get-plan-cta';
import {
  StyledPricingPlansCardsWrapper,
  StyledPricingPlansLoginInfoWrapper,
  StyledPricingPlansSwitchBadge,
  StyledPricingPlansSwitchWrapper,
  StyledPricingPlansWrapper,
  StyledLoadingSpinner,
} from './plans.styles';
import type { StyledPricingPlansProps } from './plans.types';

import { Spinner } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { accountStore } from '@/lib/store/account-store';

const LoadingPrice = () => {
  return (
    <StyledLoadingSpinner>
      <Spinner />
    </StyledLoadingSpinner>
  );
};

const getAnnualDiscountText = (discount: number | null) => {
  return `Save ${discount ? (discount * 100) : '25'}%`;
}

export const PricingPlans = observer(({ $hideFree, downloadButton }: StyledPricingPlansProps) => {
  const [planCycle, setPlanCycle] = useState<Interval>('monthly');
  const getPlanCTA = usePlanCta(downloadButton);

  const isAnnual = planCycle === 'annual';
  const filteredCards = $hideFree ? cards.filter(card => card.id !== 'free') : cards;
  const { isLoggedIn, user, waitingForPurchase } = accountStore;

  const getPlanMonthlyPrice = useCallback(
    (tierCode: string) => {
      if (tierCode === 'free') return 0;
      return accountStore.getPlanMonthlyPrice(tierCode, planCycle)
        ?? <LoadingPrice />;
    },
    [planCycle],
  );

  const getPlanStatus = useCallback((tierCode: string) => {
    const { paidTier, paidCycle, status } = accountStore.subscription;

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

  const annualSaving = accountStore.calculateMaxAnnualSaving();

  return (
    <>
      <StyledPricingPlansWrapper>
        <StyledPricingPlansSwitchWrapper>
          { !isAnnual && (
            <StyledPricingPlansSwitchBadge>
              <Text fontSize="s" fontWeight="bold" color="alwayLightGrey" $isLabel>
                { getAnnualDiscountText(annualSaving) }
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
                {getPlanCTA(card.id, accountStore, waitingForPurchase, planCycle)}
              </PricingCard>
            ))}
        </StyledPricingPlansCardsWrapper>
        <StyledPricingPlansLoginInfoWrapper>
          <LoginInfo isLoggedIn={isLoggedIn} email={(user as any).email} />
        </StyledPricingPlansLoginInfoWrapper>
      </StyledPricingPlansWrapper>
    </>
  );
});
