'use client';

import { styled } from '@/styles';

export const StyledIntegrationGrid = styled.div`
  display: grid;
  gap: 16px;
  padding-top: 64px;
  padding-bottom: 64px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding-top: 48px;
    padding-bottom: 0;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }
`;
