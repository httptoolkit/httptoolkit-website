'use client';

import { screens, styled, fontSizes } from '@/styles';

export const StyledLoadMoreWrapper = styled.div`
  justify-content: center;

  @media (min-width: ${screens.lg}) {
    display: flex;
    justify-content: center;
    margin-top: 26px;
  }
`;

export const StyledHeadingTag = styled.h2`
  font-size: ${fontSizes.heading.mobile.m};
  color: var(--text-light-grey);
  text-transform: capitalize;
  line-height: 1.5;

  @media (min-width: ${screens.lg}) {
    font-size: ${fontSizes.heading.desktop.m};
  }
`;

export const StyledNoResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: self-start;
`;

export const StyledSelectedTag = styled.span`
  font-size: ${fontSizes.text.m};
  color: var(--text-cinnabar-red);
  margin: 0 6px;
  text-transform: capitalize;
  display: inline-block;
`;