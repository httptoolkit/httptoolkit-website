'use client';

import { Container } from '@/components/elements/container';
import { CTA } from '@/components/sections/cta';
import { css, screens, styled } from '@/styles';

export const StyledFridaColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
  align-items: center;

  @media (min-width: ${screens['lg']}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 96px;
  }
`;

export const StyledFridaColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${screens['lg']}) {
    max-width: 586px;
  }
`;

export const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: ${screens['lg']}) {
    flex-direction: row;
  }
`;

export const StyledGradientBottom = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: -1;
  transform: rotate(180deg);
  pointer-events: none;
  user-select: none;

  &:before {
    content: '';
    position: absolute;
    top: calc(-100vh);
    bottom: 0;
    right: 0;
    width: 100%;
    height: auto;
    background: radial-gradient(circle at left, ${({ theme }) => theme.colors.circleGradient} 0%, transparent 30%),
      radial-gradient(ellipse 70% 45% at left, ${({ theme }) => theme.colors.ellipseGradient} 0%, transparent 70%);
    background-size: contain;
    opacity: 0.22;
  }

  display: none;
  visibility: hidden;

  & > div {
    opacity: 0.2;
  }

  @media (min-width: ${screens['lg']}) {
    display: block;
    visibility: visible;
  }
`;

export const StyledDisplayDevice = styled.div<{ $hideOn: 'mobile' | 'desktop' }>`
  ${({ $hideOn }) => {
    switch ($hideOn) {
      case 'mobile':
        return css`
          display: none;
          visibility: hidden;

          @media (min-width: ${screens['lg']}) {
            display: block;
            visibility: visible;
          }
        `;
      case 'desktop':
        return css`
          display: block;
          visibility: visible;
          @media (min-width: ${screens['lg']}) {
            display: none;
            visibility: hidden;
          }
        `;
    }
  }}
`;

export const StyledSectionCTA = styled(CTA)`
  padding-bottom: 0 !important;

  & h1 {
    margin-bottom: 19px;
  }
`;

export const StyledMobileText = styled(Container)`
  margin-top: 16px;
`;

export const StyledTextContent = styled.div`
  text-align: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  gap: 8px;

  @media (min-width: ${screens['lg']}) {
    text-align: left;
  }
`;
