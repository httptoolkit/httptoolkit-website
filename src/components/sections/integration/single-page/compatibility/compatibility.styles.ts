'use client';

import { Container } from '@/components/elements/container';
import { styled } from '@/styles';

export const StyledIntegrationCompatibilityWrapper = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  box-shadow: 1px 0 1px 0 ${({ theme }) => theme.colors.button.border};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    background-image: ${({ theme }) => theme.backgroundImages.backgroundDots};
    background-repeat: repeat;
    background-size: 450px;
  }
`;

export const StyledIntegrationCompatibilityGradientWrapper = styled.div`
  position: absolute;
  width: 1474.5px;
  height: 941px;
  right: -550px;
  top: -350px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    top: -150px;
    right: -500px;
  }

  & > div {
    z-index: 0;
  }
`;

export const StyledIntegrationCompatibilityContentWrapper = styled(Container)`
  display: flex;
  padding: 32px 16px;
  flex-direction: column;
  gap: 32px;
  position: relative;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 96px 90px;
  }
`;

export const StyledIntegrationCompatibilityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex-shrink: 0;
`;

export const StyledIntegrationCompatibilityContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    text-align: left;
    max-width: 375px;
  }
`;

export const StyledIntegrationCompatibilityLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.label.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.cinnarbarRed};
  line-height: 1.1;
  letter-spacing: 0.6px;
  text-transform: uppercase;
`;

export const StyledCompatibilityBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    justify-content: end;
    gap: 12px;
    max-width: 685px;
  }
`;
