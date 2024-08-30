'use client';

import { styled, screens } from '@/styles';

export const StyledSection = styled.section`
  position: relative;
  padding-top: 32px;
  padding-bottom: 32px;

  @media (min-width: ${screens['2xl']}) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;
