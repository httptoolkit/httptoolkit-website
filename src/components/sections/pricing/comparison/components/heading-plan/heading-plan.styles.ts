'use client';

import { styled, screens } from '@/styles';

export const StyledHeadingPlanWrapper = styled.div`
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