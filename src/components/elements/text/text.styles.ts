'use client';

import type { TextProps } from './text.types';

import { styled } from '@/styles';

export const StyledText = styled.p<TextProps>`
  font-size: ${({ theme, fontSize }) => theme.fontSizes.text[fontSize || 'm']};
  color: ${({ theme, color }) => theme.colors.text[color || 'darkGrey']};
  font-weight: ${({ theme, fontWeight }) => theme.fontWeight[fontWeight || 'normal']};
  text-align: ${({ textAlign }) => textAlign || 'initial'};
  line-height: ${({ as }) => (as === 'span' ? 1.1 : 1.5)};
  letter-spacing: ${({ as }) => (as === 'span' ? '0.06rem' : 'initial')};
`;
