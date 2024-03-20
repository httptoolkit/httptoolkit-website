'use client';

import { Container } from '@/components/elements/container';
import { screens, styled } from '@/styles';

export const StyledExplorerSection = styled.section`
  padding: 18px 0;
  margin: 64px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.button.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.button.border};

  @media (min-width: ${screens.lg}) {
    display: block;
    border-top: 0;
    margin-top: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.button.border};
    padding: 34px 0;
  }
`;

export const StyledExplorerContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

export const StyledTagsWrapper = styled.nav`
  & ul {
    display: inline-flex;
    align-items: center;
    gap: 48px;
  }

  display: none;

  @media (min-width: ${screens.lg}) {
    display: block;
  }
`;

export const StyledTagsMobileWrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: center;

  @media (min-width: ${screens.lg}) {
    display: none;
  }
`;

export const StyledTagText = styled.span`
  color: ${({ theme }) => theme.colors.text.lightGrey};
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  text-transform: capitalize;
  transition: color ease-in 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.text.electricLightBlue};
  }
`;

export const StyledSearchWrapper = styled.div``;
