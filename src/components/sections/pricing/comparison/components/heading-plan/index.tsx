'use client';

import type React from 'react';

import { styled } from '@linaria/react';
import { observer } from 'mobx-react-lite';

import type { PricingComparisonProps } from '../..';
import { usePlanCta } from '../../../plans/hooks/get-plan-cta';

import { Heading } from '@/components/elements/heading';
import { accountStore } from '@/lib/store/account-store';
import { screens } from '@/styles/tokens';

type HeadingPlanProps = PricingComparisonProps['plans'][number] & {
  downloadButton?: React.ReactNode;
};

const StyledHeadingPlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    padding: 0 16px 32px;

    & [data-dropdown-wrapper='true'],
    & a[data-dropdown='true'],
    & button[data-button='true'] {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
  }

  @media (min-width: ${screens.xl}) {
    padding: 0 48px 32px;
  }

  @media (max-width: ${screens.lg}) {
    & *[data-heading='true'] {
      text-align: left;
    }
  }
`;

export const HeadingPlan = observer(({ id, title, downloadButton }: HeadingPlanProps) => {
  const getPlanCTA = usePlanCta(downloadButton);

  return (
    <StyledHeadingPlanWrapper>
      <Heading as="h3" fontSize="xs" color="lightGrey" textAlign="center">
        {title}
      </Heading>
      {getPlanCTA(
        id,
        accountStore,
        accountStore.subscription?.paidCycle ?? 'monthly'
      )}
    </StyledHeadingPlanWrapper>
  );
});
