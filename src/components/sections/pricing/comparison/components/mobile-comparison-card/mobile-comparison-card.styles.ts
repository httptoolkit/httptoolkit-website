'use client';

import { styled } from '@/styles';

export const StyledMobileComparisonCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    display: none;
  }
`;
