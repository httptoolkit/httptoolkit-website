'use client';

import { styled, screens } from '@/styles';

export const StyledTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: ${screens.lg}) {
    gap: 16px;
  }
`;