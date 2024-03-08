'use client';

import { styled } from '@/styles';

export const ShowOnMobileOrDesktop = styled.div<{ $mobile?: boolean }>`
  display: ${({ $mobile }) => ($mobile ? 'block' : 'none')};

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    display: ${({ $mobile }) => (!$mobile ? 'block' : 'none')};
  }
`;
