'use client';

import { styled } from '@/styles';

export const StyledTextListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: start;

  @media (min-width: ${({ theme }) => theme.screens['2xl']}) {
    text-align: initial;
  }
`;

export const StyledTextListItem = styled.li`
  display: flex;
  gap: 16px;
  align-items: center;
`;
