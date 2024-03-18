'use client';

import { screens, styled } from '@/styles';

export const StyledLoadMoreWrapper = styled.div`
  justify-content: center;

  @media (min-width: ${screens.lg}) {
    display: flex;
    justify-content: center;
    margin-top: 26px;
  }
`;

export const StyledHeadingTag = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.heading.mobile.m};
  color: ${({ theme }) => theme.colors.text.lightGrey};
  text-transform: capitalize;
  line-height: 1.5;

  @media (min-width: ${screens.lg}) {
    font-size: ${({ theme }) => theme.fontSizes.heading.desktop.m};
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
