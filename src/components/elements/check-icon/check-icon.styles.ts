'use client';

import type { CheckIconProps } from '.';

import { styled } from '@/styles';

export const StyledCheckIcon = styled.div<CheckIconProps>`
  flex-shrink: 0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blue-gradient);
  width: ${({ $small }) => ($small ? '17px' : '20px')};
  height: ${({ $small }) => ($small ? '17px' : '20px')};
  color: var(--text-always-white);
  box-shadow:
    0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset,
    0px -0.83px 0.83px 0px rgba(16, 46, 151, 0.1) inset,
    0 0 0 1px var(--border-always-gradient) inset;
`;