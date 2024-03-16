'use client';

import { Container } from '@/components/elements/container';
import { screens, styled } from '@/styles';

export const StyledExplorerSection = styled.section`
  padding: 34px 0;
  margin-bottom: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.button.border};
  display: none;

  @media (min-width: ${screens.lg}) {
    display: block;
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
`;

export const StyledTagText = styled.span`
  color: ${({ theme }) => theme.colors.text.lightGrey};
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  text-transform: capitalize;
  transition: color ease-in 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.text.cinnarbarRed};
  }
`;

export const StyledSearchWrapper = styled.div``;
