'use client';

import type { StyledGradientProps } from './gradient.types';

import { css, styled } from '@/styles';

export const StyledGradient = styled.div<StyledGradientProps>`
  width: 100%;
  height: 100%;
  position: relative;
  aspect-ratio: 16/11;
  z-index: -1;
  pointer-events: none;
  user-select: none;

  ${({ $shape }) => {
    switch ($shape) {
      case 'full':
        return css`
          background: radial-gradient(circle, ${({ theme }) => theme.colors.circleGradient} 0%, transparent 30%),
            radial-gradient(ellipse 50% 45%, ${({ theme }) => theme.colors.ellipseGradient} 0%, transparent 70%);
          background-size: contain;
          opacity: 0.15;
        `;

      case 'side':
        return css`
          background: radial-gradient(circle at left, ${({ theme }) => theme.colors.circleGradient} 0%, transparent 30%),
            radial-gradient(ellipse 70% 45% at left, ${({ theme }) => theme.colors.ellipseGradient} 0%, transparent 70%);
          background-size: contain;
          opacity: 0.15;
        `;
    }
  }}
`;
