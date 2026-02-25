'use client';

import type { StyledTextProps } from './text.types';

import { styled, textColors, fontSizes, fontWeight } from '@/styles';

export const StyledText = styled.p<StyledTextProps>`
  font-size: ${({ fontSize }) => fontSizes.text[fontSize || 'm']};
  color: ${({ color }) => textColors[(color || 'darkGrey') as keyof typeof textColors]};
  font-weight: ${({ fontWeight: fw }) => fontWeight[fw || 'normal']};
  text-align: ${({ $textAlign }) => $textAlign || 'unset'};
  line-height: ${({ $isLabel }) => ($isLabel ? 1.1 : 1.5)};
  letter-spacing: ${({ $isLabel }) => ($isLabel ? '0.06em' : 'initial')};
  text-transform: ${({ $isLabel }) => ($isLabel ? 'uppercase' : 'initial')};
  font-style: ${({ $fontStyle }) => $fontStyle || 'normal'};
`;