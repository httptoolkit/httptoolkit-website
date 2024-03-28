'use client';

import { screens, styled } from '@/styles';

export const StyledDownloadSection = styled.section`
  position: relative;
  padding-top: 32px;
  padding-bottom: 64px;

  @media (min-width: ${screens['2xl']}) {
    padding-top: 96px;
    padding-bottom: 48px;
  }
`;

export const StyledDownloadaColumns = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;

  @media (min-width: ${screens['lg']}) {
    gap: 96px;
  }
`;

export const StyledColumnContent = styled.div`
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

export const StyledImageWrapper = styled.div`
  display: none;
  visibility: hidden;

  @media (min-width: ${screens['lg']}) {
    display: block;
    visibility: visible;
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

export const StyledGradientMobile = styled.div`
  position: absolute;
  top: -100px;
  width: 100%;
  height: 700px;
  display: block;
  visibility: visible;

  @media (min-width: ${screens['lg']}) {
    display: none;
    visibility: hidden;
  }
`;
