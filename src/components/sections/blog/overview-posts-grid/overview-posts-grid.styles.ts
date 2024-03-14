'use client';

import { screens, styled } from '@/styles';

export const StyledLoadMoreWrapper = styled.div`
  justify-content: center;

  @media (min-width: ${screens.lg}) {
    display: flex;
    justify-content: flex-start;
    padding-left: 151px;
  }
`;
