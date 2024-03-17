'use client';

import { screens, styled } from '@/styles';

export const StyledCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${screens['lg']}) {
    flex-direction: row;
  }
`;
