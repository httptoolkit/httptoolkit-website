'use client';

import type { StyledContainerProps } from './container.types';

import { styled, screens } from '@/styles';

export const StyledContainer = styled.div<StyledContainerProps>`
  max-width: ${({ theme, $size }) => ($size === 'default' ? theme.screens['2xl'] : theme.screens.content)};
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: ${({ $size }) => ($size === 'default' ? 'border-box' : 'content-box')};

  @media (min-width: ${screens['2xl']}) {
    padding-left: 48px;
    padding-right: 48px;
  }
`;
