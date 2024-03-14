'use client';

import { styled } from '@/styles';

export const StyledTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    gap: 16px;
  }
`;
