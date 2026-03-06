import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const StyledHideElementOn = styled.div`
  &[data-hide-below="sm"] { display: none; @media (min-width: ${screens.sm}) { display: block; } }
  &[data-hide-below="md"] { display: none; @media (min-width: ${screens.md}) { display: block; } }
  &[data-hide-below="lg"] { display: none; @media (min-width: ${screens.lg}) { display: block; } }
  &[data-hide-below="xl"] { display: none; @media (min-width: ${screens.xl}) { display: block; } }
  &[data-hide-below="2xl"] { display: none; @media (min-width: ${screens['2xl']}) { display: block; } }

  &[data-hide-above="sm"] { @media (min-width: ${screens.sm}) { display: none; } }
  &[data-hide-above="md"] { @media (min-width: ${screens.md}) { display: none; } }
  &[data-hide-above="lg"] { @media (min-width: ${screens.lg}) { display: none; } }
  &[data-hide-above="xl"] { @media (min-width: ${screens.xl}) { display: none; } }
  &[data-hide-above="2xl"] { @media (min-width: ${screens['2xl']}) { display: none; } }
`;
