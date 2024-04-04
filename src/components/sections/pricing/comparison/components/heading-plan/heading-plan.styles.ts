'use client';

import { styled } from '@/styles';

export const StyledHeadingPlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 0 16px 32px;

    & > *,
    & *[data-dropdown],
    & *[data-button] {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
  }

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    padding: 0 48px 32px;
  }

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    & *[data-heading='true'] {
      text-align: left;
    }
  }
`;
