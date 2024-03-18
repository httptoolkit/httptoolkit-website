'use client';

import { Container } from '@/components/elements/container';
import { styled } from '@/styles';

export const StyledPricingComparisonWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 0;
  padding-bottom: 64px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    display: block;
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;

export const StyledPricingComparisonDesktopWrapper = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    display: block;
  }
`;
