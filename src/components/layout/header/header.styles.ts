'use client';

import { Container } from '@/components/elements/container';
import { screens, styled } from '@/styles';

export const StyledHeader = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.button.border};
`;

export const StyledLogoWrapper = styled.div`
  & svg {
    fill: currentColor;
  }
`;

export const StyledHeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  padding-top: 22px;
  padding-bottom: 22px;
  gap: 56px;
  max-height: 70px;

  justify-content: space-between;
`;

export const StyledNavItems = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 48px;

  & a:hover,
  & a:focus {
    span {
      transition: color ease-in 200ms;
      color: ${({ theme }) => theme.colors.cinnarbarRed};
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
