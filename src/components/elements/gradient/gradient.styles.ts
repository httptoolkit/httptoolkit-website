'use client';

import { styled } from '@/styles';

export const StyledGradient = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  aspect-ratio: 16/11;
  background: radial-gradient(circle at left, ${({ theme }) => theme.colors.circleGradient} 0%, transparent 30%),
    radial-gradient(ellipse 70% 45% at left, ${({ theme }) => theme.colors.ellipseGradient} 0%, transparent 70%);
  background-size: contain;
  opacity: 0.15;
`;
