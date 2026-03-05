import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const StyledHeading = styled.h1`
  font-size: var(--heading-font-size);
  color: var(--heading-color);
  font-weight: var(--heading-font-weight);
  line-height: var(--heading-line-height);
  text-align: var(--heading-text-align, unset);

  &[data-color="textGradient"] {
    background: var(--text-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: ${screens.xl}) {
    font-size: var(--heading-font-size-xl);
  }
`;
