'use client';

import type { StyledHeadingProps } from './heading.types';

import { styled, screens, textColors, textGradientMixin, fontSizes, fontWeight } from '@/styles';

const lineHeightMap = {
  xl: 1.2,
  l: 1.2,
  m: 1.3,
  s: 1.3,
  xs: 1.3,
};

export const StyledHeading = styled.h1<StyledHeadingProps>`
  font-size: ${({ fontSize }) => fontSizes.heading.mobile[fontSize || 'xl']};
  color: ${({ color }) => textColors[(color || 'lightGrey') as keyof typeof textColors]};
  font-weight: ${({ fontWeight: fw }) => fontWeight[fw || 'normal']};
  line-height: ${({ fontSize }) => lineHeightMap[fontSize || 'xl']};
  text-align: ${({ $textAlign: align }) => align || 'unset'};

  ${({ color }) => color === 'textGradient' && textGradientMixin}

  @media (min-width: ${screens.xl}) {
    font-size: ${({ fontSize }) => fontSizes.heading.desktop[fontSize || 'xl'].toString()};
  }
`;