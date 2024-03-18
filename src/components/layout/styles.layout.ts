'use client';

import { styled } from '@/styles';

export const StyledLandingLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  & main {
    flex: 1; /* Allow the main content to grow and take up remaining space */
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */

    width: 100%;
    height: 100%;
  }

  & section:first-of-type {
    width: 100%;
    height: 100%;
    display: flex;
  }
`;
