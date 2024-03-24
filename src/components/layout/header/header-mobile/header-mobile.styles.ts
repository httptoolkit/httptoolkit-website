'use client';

import { screens, styled } from '@/styles';

export const StyledMobileWrapper = styled.div`
  display: block;
  text-align: center;

  @media (min-width: ${screens['lg']}) {
    display: none;
  }
`;

export const StyledNavMobileItems = styled.nav`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  text-transform: uppercase;
  margin-top: 64px;

  @media (min-width: ${screens.md}) {
    & a:hover,
    & a:focus {
      span {
        transition: color ease-in 200ms;
        color: ${({ theme }) => theme.colors.cinnarbarRed};
      }
    }
  }
`;
