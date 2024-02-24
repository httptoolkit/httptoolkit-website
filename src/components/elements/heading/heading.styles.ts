'use client';

import type { HeadingProps } from './heading.types';

import { styled } from '@/styles';

const lineHeightMap = {
  xl: 1.1,
  l: 1.1,
  m: 1.1,
  s: 1.3,
  xs: 1.3,
};

export const StyledHeading = styled.h1<HeadingProps>`
  font-size: ${({ theme, fontSize }) => theme.fontSizes.heading.mobile[fontSize || 'xl']};
  color: ${({ theme, color }) => theme.colors.text[color || 'lightGrey']};
  font-weight: ${({ theme, fontWeight }) => theme.fontWeight[fontWeight || 'normal']};
  line-height: ${({ fontSize }) => lineHeightMap[fontSize || 'xl']};
  text-align: ${({ textAlign: align }) => align || 'initial'};

  ${({ color, theme }) => color === 'textGradient' && theme.colors.text.textGradient}

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    font-size: ${({ theme, fontSize }) => theme.fontSizes.heading.desktop[fontSize || 'xl'].toString()};
  }
`;
