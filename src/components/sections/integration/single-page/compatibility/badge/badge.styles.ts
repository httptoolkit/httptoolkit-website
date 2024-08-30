'use client';

import { styled } from '@/styles';

export const StyledCompatibilityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset,
    0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset,
    0px -0.83px 0.83px 0px rgba(16, 46, 151, 0.1) inset;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 8px 16px;
  }

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    & > p {
      font-weight: ${({ theme }) => theme.fontWeight.normal};
    }
  }
`;
