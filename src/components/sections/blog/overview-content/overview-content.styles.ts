import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

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

  @media (min-width: ${screens.lg}) {
    min-width: 387px;
    max-width: 387px;
    display: block;
    position: sticky;
    top: 10px;
    align-self: self-start;
  }
`;
