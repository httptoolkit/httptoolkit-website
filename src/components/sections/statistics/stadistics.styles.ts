'use client';

import { styled } from '@/styles';

export const StyledStatisticsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  padding: 96px 48px;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: column;
    padding: 16px 0;

    & > *:first-child {
      margin: 0 auto;
      align-items: center;
    }

    & * {
      text-align: center;
    }
  }
`;
