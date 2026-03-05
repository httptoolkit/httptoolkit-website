import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const StyledStack = styled.div`
  display: flex;
  flex-direction: var(--stack-direction, column);
  align-items: var(--stack-align, initial);
  gap: var(--stack-gap, 16px);

  @media (min-width: ${screens.lg}) {
    gap: var(--stack-gapxl, 16px);
  }
`;
