'use client';

import { Container } from '@/components/elements/container';
import { screens, styled } from '@/styles';

export const StyledHeader = styled.header`
  position: relative;
  border-bottom: 1px solid var(--button-border);
`;

export const StyledLogoWrapper = styled.div`
  & svg {
    fill: currentColor;
    width: auto;
    height: 26px;
  }
`;

export const StyledHeaderContainer = styled(Container)`
  &&& {
    display: flex;
    align-items: center;
    padding-top: 22px;
    padding-bottom: 22px;
    gap: 56px;
    max-height: 70px;

    justify-content: space-between;
  }
`;

export const StyledNavItems = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 48px;

  @media (min-width: ${screens['lg']}) {
    display: flex;
  }

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
`;

export const StyledNavigation = styled.div`
  width: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${screens['lg']}) {
    display: flex;
  }
`;