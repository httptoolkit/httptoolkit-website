'use client';

import { styled, screens } from '@/styles';

export const StyledContainer = styled.div`
  max-width: ${({ theme }) => theme.screens['2xl']};
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  @media (min-width: ${screens['2xl']}) {
    padding-left: 48px;
    padding-right: 48px;
  }
`;
