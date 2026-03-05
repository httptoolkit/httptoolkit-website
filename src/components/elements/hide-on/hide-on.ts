import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const StyledHideElementOn = styled.div`
  &[data-hide-below="sm"] { display: none; visibility: hidden; @media (min-width: ${screens.sm}) { display: block; visibility: visible; } }
  &[data-hide-below="md"] { display: none; visibility: hidden; @media (min-width: ${screens.md}) { display: block; visibility: visible; } }
  &[data-hide-below="lg"] { display: none; visibility: hidden; @media (min-width: ${screens.lg}) { display: block; visibility: visible; } }
  &[data-hide-below="xl"] { display: none; visibility: hidden; @media (min-width: ${screens.xl}) { display: block; visibility: visible; } }
  &[data-hide-below="2xl"] { display: none; visibility: hidden; @media (min-width: ${screens['2xl']}) { display: block; visibility: visible; } }

  &[data-hide-above="sm"] { @media (min-width: ${screens.sm}) { display: none; visibility: hidden; } }
  &[data-hide-above="md"] { @media (min-width: ${screens.md}) { display: none; visibility: hidden; } }
  &[data-hide-above="lg"] { @media (min-width: ${screens.lg}) { display: none; visibility: hidden; } }
  &[data-hide-above="xl"] { @media (min-width: ${screens.xl}) { display: none; visibility: hidden; } }
  &[data-hide-above="2xl"] { @media (min-width: ${screens['2xl']}) { display: none; visibility: hidden; } }
`;
