import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const ShowOnMobileOrDesktop = styled.div`
  display: none;

  &[data-mobile] {
    display: block;
  }

  @media (min-width: ${screens.lg}) {
    display: block;

    &[data-mobile] {
      display: none;
    }
  }
`;
