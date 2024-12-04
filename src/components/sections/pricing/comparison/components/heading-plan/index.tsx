'use client';

import { observer } from 'mobx-react-lite';

import { StyledHeadingPlanWrapper } from './heading-plan.styles';
import type { HeadingPlanProps } from './heading-plan.types';
import { usePlanCta } from '../../../plans/hooks/get-plan-cta';

import { Heading } from '@/components/elements/heading';
import { accountStore } from '@/lib/store/account-store';

export const HeadingPlan = observer(({ id, title, downloadButton }: HeadingPlanProps) => {
  const getPlanCTA = usePlanCta(downloadButton);

  return (
    <StyledHeadingPlanWrapper>
      <Heading as="h3" fontSize="xs" color="lightGrey" textAlign="center">
        {title}
      </Heading>
      {getPlanCTA(id, accountStore, 'monthly')}
    </StyledHeadingPlanWrapper>
  );
});
