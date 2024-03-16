'use client';

import { screens, styled } from '@/styles';

export const StyledLoadMoreWrapper = styled.div`
  justify-content: center;

  @media (min-width: ${screens.lg}) {
    display: flex;
    justify-content: flex-start;
    padding-left: 151px;
  }
`;

export const StyledNoResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: self-start;
`;

export const StyledSelectedTag = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  color: ${({ theme }) => theme.colors.text.cinnarbarRed};
  margin: 0 6px;
  text-transform: capitalize;
  display: inline-block;
`;
