'use client';

import type { HeadingProps } from './heading.types';

import { styled } from '@/styles';

const lineHeightMap = {
  xl: '110%',
  l: '110%',
  m: '110%',
  s: '130%',
  xs: '130%',
};

export const StyledHeading = styled.h1<HeadingProps>`
  font-size: ${({ theme, fontSize }) => theme.fontSizes.heading.mobile[fontSize || 'xl']};
  color: ${({ theme, color }) => theme.colors.text[color || 'lightGrey']};
  font-weight: ${({ theme, fontWeight }) => theme.fontWeight[fontWeight || 'normal']};
  line-height: ${({ fontSize }) => lineHeightMap[fontSize || 'xl']};
  text-align: ${({ textAlign: align }) => align || 'initial'};

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    font-size: ${({ theme, fontSize }) => theme.fontSizes.heading.desktop[fontSize || 'xl'].toString()};
  }
`;
