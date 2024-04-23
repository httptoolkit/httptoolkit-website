'use client';

import type { BreadcrumState } from './breadcrumbs-types';

import { css, styled } from '@/styles';

export const StyledBreadcrumbContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledBreadcrumbItemWrapper = styled.div<{ $state?: BreadcrumState }>`
  flex: 1 1 33%;

  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-evenly;

  padding: 5px;
  text-align: center;

  p {
    padding: 0 5px;

    ${({ $state }) => {
      switch ($state) {
        case 'yes':
          return css`
            opacity: 0.6;
          `;

        case 'no':
        case 'maybe':
          return css`
            font-weight: bold;
          `;

        case 'nvm':
          return css`
            opacity: 0.5;
            text-decoration: line-through;
          `;
      }
    }}
  }
`;
