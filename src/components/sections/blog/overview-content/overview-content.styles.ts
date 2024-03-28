'use client';

import { screens, styled } from '@/styles';

export const StyledBlogOverviewSection = styled.section`
  display: flex;
  flex-direction: column-reverse;
  gap: 64px;

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    gap: 64px;
  }
`;

export const StyledSubscriberBox = styled.aside`
  flex: 1;
  max-width: fit-content;
  display: none;
  visibility: hidden;

  @media (min-width: ${screens.lg}) {
    min-width: 387px;
    max-width: 387px;
    display: block;
    visibility: visible;
  }
`;
