'use client';

import { StyledButton } from '@/components/elements/button/button.styles';
import { styled } from '@/styles';

export const StyledLoginInfoWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 16px;

  ${StyledButton} {
    margin: 0 auto;
  }
`;
