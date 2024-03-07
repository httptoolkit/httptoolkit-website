'use client';

import { styled } from '@/styles';

export const StyledIntegrationGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 48px 0;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }
`;
