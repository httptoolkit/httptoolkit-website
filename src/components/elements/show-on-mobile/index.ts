'use client';

import { styled, screens } from '@/styles';

export const ShowOnMobileOrDesktop = styled.div<{ $mobile?: boolean }>`
  display: ${({ $mobile }) => ($mobile ? 'block' : 'none')};

  @media (min-width: ${screens.lg}) {
    display: ${({ $mobile }) => (!$mobile ? 'block' : 'none')};
  }
`;