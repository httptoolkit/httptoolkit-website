'use client';

import { styled } from '@/styles';

export const StyledContactFormWrapper = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border},
    0 0 8px 0 ${({ theme }) => theme.colors.shadowDefault},
    0 0 24px 0px rgba(128, 130, 137, 0.1) inset;
  border-radius: 16px;

  @media (min-width: ${({ theme }) => theme.screens['lg']}) {
    padding: 32px;
    max-width: 624px;
  }
`;
