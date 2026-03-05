'use client';

import type { ReactNode } from 'react';
import { TierCode } from '@httptoolkit/accounts';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';

import { styled } from '@linaria/react';

import { PricingCard } from './components/card';
import { LoginInfo } from './components/login-info';
import { Switch } from './components/switch';
import { intervalOptions, plans } from './data';
import { usePlanCta } from './hooks/get-plan-cta';

import { Container } from '@/components/elements/container';
import { Spinner } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { accountStore, Interval } from '@/lib/store/account-store';
import { LoginModal } from '@/components/modules/login-modal';
import { screens } from '@/styles/tokens';

export interface PricingPlansData {
  plans: PricingPlanData[];
}

export type PlanId = TierCode | 'free';

export interface PricingPlanData {
  id: PlanId;
  title: string;
  price?: number | string | JSX.Element;
  priceDescription: string;
  isPaidYearly?: boolean;
  features: PlanFeatures[];
  status?: string;

  $isHighlighted: boolean;
}

interface PlanFeatures {
  text: string;
  items: string[];
}

export interface StyledPricingPlansProps {
  $hideFree?: boolean;
  downloadButton?: ReactNode;
}

const StyledPricingPlansWrapper = styled(Container)`
  &&& {
    position: relative;
    max-width: ${screens['2xl']} !important;
  }
`;

const StyledPricingPlansSwitchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 96px auto 32px;
  width: fit-content;

  @media (min-width: ${screens.lg}) {
    margin: 48px auto;
  }
`;

const StyledPricingPlansSwitchBadge = styled.div`
  position: absolute;
  left: -34px;
  top: -22px;

  border-radius: 24px;
  padding: 8px 12px;
  transform: rotate(-14deg);
  background: var(--orange-gradient);
  box-shadow:
    0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset,
    0px -0.83px 0.83px 0px rgba(16, 46, 151, 0.1) inset,
    0 0 0 1px var(--button-border) inset;

  & > p {
    text-transform: uppercase;
  }
`;

const StyledPricingPlansCardsWrapper = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;

  @media (min-width: ${screens.lg}) {
    grid-template-columns: repeat(3, 1fr);

    &[data-hide-free="true"] {
      grid-template-columns: repeat(6, 1fr);

      & > [data-pricing-card="true"]:first-child {
        grid-column: 2/4;
      }

      & > [data-pricing-card="true"]:last-child {
        grid-column: 4/6;
      }
    }
  }
`;

const StyledPricingPlansLoginInfoWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    gap: 24px;
  }

  & a {
    font-weight: bold;
    color: var(--electric-blue);
    text-decoration: underline;
  }
`;

const StyledLoadingSpinner = styled.span`
  display: inline-flex;

  @keyframes pricing-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  & svg {
    animation: pricing-rotate 5s linear infinite;
  }
`;

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
  const {
    isLoggedIn,
    user,
    logOut
  } = accountStore;

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
              <Text fontSize="s" fontWeight="bold" color="alwaysLightGrey" $isLabel>
                { getAnnualDiscountText(annualSaving) }
              </Text>
            </StyledPricingPlansSwitchBadge>
          )}
          <Switch options={intervalOptions} onChange={setPlanCycle} defaultValue={planCycle} />
        </StyledPricingPlansSwitchWrapper>
        <StyledPricingPlansCardsWrapper data-hide-free={$hideFree ? 'true' : undefined}>
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
                {getPlanCTA(card.id, accountStore, planCycle)}
              </PricingCard>
            ))}
        </StyledPricingPlansCardsWrapper>
        <StyledPricingPlansLoginInfoWrapper>
          <LoginInfo
            isLoggedIn={isLoggedIn}
            logOut={logOut}
            email={(user as any).email}
          />
        </StyledPricingPlansLoginInfoWrapper>
      </StyledPricingPlansWrapper>
    </>
  );
});
