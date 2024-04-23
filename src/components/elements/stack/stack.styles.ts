'use client';

import type { StyledStackProps } from './stack.types';

import { screens, styled } from '@/styles';

export const StyledStack = styled.div<StyledStackProps>`
  display: flex;
  flex-direction: ${props => props.$direction || 'column'};
  align-items: ${props => props.$alignItems || 'initial'};
  gap: ${props => props.$gap || '16px'};

  @media (min-width: ${screens.lg}) {
    gap: ${props => props.$gapxl || '16px'};
  }
`;
