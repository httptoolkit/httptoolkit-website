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
  gap: 2.5rem;
  text-transform: uppercase;
  margin-top: 15px;

  @media (min-width: ${screens.md}) {
    & a:focus {
      span {
        transition: color ease-in 200ms;
        color: var(--cinnabar-red);
      }
    }

    @media (hover: hover) {
      & a:hover {
        span {
          transition: color ease-in 200ms;
          color: var(--cinnabar-red);
        }
      }
    }
  }
`;