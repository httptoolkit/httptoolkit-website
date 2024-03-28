'use client';

import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { StyledHeadingPlanWrapper } from './heading-plan.styles';
import type { HeadingPlanProps } from './heading-plan.types';
import { usePlanCta } from '../../../plans/hooks/get-plan-cta';

import { Heading } from '@/components/elements/heading';
import { AccountStore } from '@/lib/store/account-store';

export const HeadingPlan = observer(({ id, title }: HeadingPlanProps) => {
  const getPlanCTA = usePlanCta();
  const [account] = useState(() => new AccountStore());

  return (
    <StyledHeadingPlanWrapper>
      <Heading as="h3" fontSize="xs" color="lightGrey" textAlign="center">
        {title}
      </Heading>
      {getPlanCTA(id, account, account.waitingForPurchase, 'monthly')}
    </StyledHeadingPlanWrapper>
  );
});
