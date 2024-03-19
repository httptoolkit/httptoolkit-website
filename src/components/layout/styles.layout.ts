'use client';

import { screens, styled } from '@/styles';

export const StyledLandingLayoutWrapper = styled.div`
  min-height: fit-content;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;

  @media (min-width: ${screens['md']}) {
    & main {
      flex: 1; /* Allow the main content to grow and take up remaining space */
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    & section:first-of-type {
      width: 100%;
      height: 100%;
      display: flex;
    }
  }
`;
