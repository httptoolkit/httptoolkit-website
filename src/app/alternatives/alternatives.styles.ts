'use client';

import { screens, styled } from '@/styles';

export const StyledAlternativesPageColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;

  @media (min-width: ${screens['lg']}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 96px;
  }
`;

export const StyledAlternativesColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;

  @media (min-width: ${screens['lg']}) {
    gap: 64px;
  }

  a {
    text-decoration: underline;
  }
`;

export const StyledGradientLeft = styled.div`
  position: absolute;
  max-width: 100%;
  top: -180px;
  left: 0;
  height: 780px;

  pointer-events: none;

  @media (min-width: ${screens['lg']}) {
    top: -7px;
  }
`;

export const StyledAlternativeList = styled.ul`
  list-style: disc inside;
`;

export const StyledAlternativeHeadingTag = styled.h2`
  display: inline-block;

  font-size: ${({ theme }) => theme.fontSizes.heading.mobile.m};
  color: ${({ theme }) => theme.colors.text.lightGrey};
  line-height: 1.5;

  @media (min-width: ${screens.lg}) {
    font-size: ${({ theme }) => theme.fontSizes.heading.desktop.m};
  }

  &:hover {
    text-decoration: underline;
  }
`;