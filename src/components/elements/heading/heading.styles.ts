'use client';

import type { HeadingProps } from './heading.types';

import { styled } from '@/styles';

export const StyledHeading = styled.h1<HeadingProps>`
  font-size: ${({ theme, fontSize }) => theme.fontSizes.heading.mobile[fontSize || 'xl']};
  color: ${({ theme, color }) => theme.colors.text[color || 'lightGrey']};
  font-weight: ${({ theme, fontWeight }) => theme.fontWeight[fontWeight || 'normal']};
  line-height: 110%;

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    font-size: ${({ theme, fontSize }) => theme.fontSizes.heading.desktop[fontSize || 'xl']};
  }
`;
