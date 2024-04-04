'use client';

import { Container } from '@/components/elements/container';
import { Section } from '@/components/elements/section';
import { CTA } from '@/components/sections/cta';
import { screens, styled } from '@/styles';

export const StyledThankYouSection = styled(Section)`
  padding-top: 16px;
  padding-bottom: calc(64px + 32px);

  @media (min-width: ${screens['2xl']}) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;

export const StyledThankYouColumns = styled.div`
  display: flex;
  gap: 64px;

  @media (min-width: ${screens['lg']}) {
    gap: 96px;
  }
`;

export const StyledThankYouColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${screens['lg']}) {
    max-width: 586px;
    width: 100%;
    flex-shrink: 0;
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

export const StyledSectionCTA = styled(CTA)`
  padding-bottom: 0 !important;

  h1 {
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
