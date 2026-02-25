'use client';

import { styled, screens } from '@/styles';

export const StyledMobileComparisonCardWrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: ${screens.lg}) {
      display: none;
    }
  }
`;