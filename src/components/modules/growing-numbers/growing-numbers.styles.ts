'use client';

import { styled, screens, fontSizes } from '@/styles';

export const StyledGrowingNumbersStatsWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    grid-template-columns: repeat(2, 248px);
    grid-template-rows: repeat(2, 1fr);
    gap: 80px 96px;
  }

  @media (min-width: ${screens['2xl']}) {
    padding-right: 28px;
  }
`;

export const StyledGrowingNumbersStat = styled.div``;

export const StyledGrowingNumberStatNumber = styled.p`
  font-size: ${fontSizes.heading.mobile.xl};
  color: var(--text-light-grey);
  line-height: 1.1;
  margin-bottom: 8px;

  @media (min-width: ${screens.lg}) {
    font-size: ${fontSizes.heading.desktop.xl};
  }
`;