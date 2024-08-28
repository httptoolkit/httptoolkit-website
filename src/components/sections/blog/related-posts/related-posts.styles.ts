'use client';

import { screens, styled } from '@/styles';

export const StyledRelatedPostWrapper = styled.section`
  padding: 32px 0;

  @media (min-width: ${screens['lg']}) {
    padding: 24px 0 0 0;
    margin: 0;
  }
`;

export const StyledRelatedPostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* 1 column on mobile */
  gap: 24px;

  @media (min-width: ${screens['lg']}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  & article {
    max-width: 100%;

    @media (min-width: ${screens['lg']}) {
      max-width: 434px;
    }
  }
`;
