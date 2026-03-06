import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const StyledContainer = styled.div`
  max-width: ${screens['2xl']};
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;

  &[data-size="content"] {
    max-width: ${screens.content};
    box-sizing: content-box;
  }

  @media (min-width: ${screens['2xl']}) {
    padding-left: 48px;
    padding-right: 48px;
  }
`;
