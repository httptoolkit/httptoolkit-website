'use client';

import { StyledHeading } from '@/components/elements/heading/heading.styles';
import { styled } from '@/styles';

export const StyledHeadingPlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 0 16px 32px;

    & > * {
      width: 100%;
    }

    & button,
    & a {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
  }

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    padding: 0 48px 32px;
  }

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    & ${StyledHeading} {
      text-align: left;
    }
  }
`;
