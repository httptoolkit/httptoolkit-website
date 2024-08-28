'use client';

import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { Interval } from '@httptoolkit/accounts';

import { PricingCard } from './components/card';
import { LoginInfo } from './components/login-info';
import { Switch } from './components/switch';
import { intervalOptions, plans } from './data';
import { usePlanCta } from './hooks/get-plan-cta';
import {
  StyledPricingPlansCardsWrapper,
  StyledPricingPlansLoginInfoWrapper,
  StyledPricingPlansSwitchBadge,
  StyledPricingPlansSwitchWrapper,
  StyledPricingPlansWrapper,
  StyledLoadingSpinner,
} from './plans.styles';
import type { PlanId, StyledPricingPlansProps } from './plans.types';

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
  const filteredPlans = $hideFree ? plans.filter(plan => plan.id !== 'free') : plans;
  const { isLoggedIn, user, waitingForPurchase } = accountStore;

  const getPlanMonthlyPrice = useCallback(
    (planId: PlanId) => {
      if (planId === 'free') return 0;
      return accountStore.getPlanMonthlyPrice(planId, planCycle)
        ?? <LoadingPrice />;
    },
    [planCycle],
  );

  const getPlanStatus = useCallback((planId: PlanId) => {
    const { paidTier, paidCycle, status } = accountStore.subscription;

    if (paidTier !== planId) return;

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
          <Switch options={intervalOptions} onChange={setPlanCycle} defaultValue={planCycle} />
        </StyledPricingPlansSwitchWrapper>
        <StyledPricingPlansCardsWrapper $hideFree={$hideFree}>
          {Array.isArray(filteredPlans) &&
            filteredPlans.length > 0 &&
            filteredPlans.map(card => (
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
