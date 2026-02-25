'use client';

import { Container } from '@/components/elements/container';
import { styled, screens, fontSizes, fontWeight } from '@/styles';

export const StyledIntegrationCompatibilityWrapper = styled.section`
  position: relative;
  background-color: var(--ink-black);
  box-shadow: 1px 0 1px 0 var(--button-border);

  @media (max-width: ${screens.lg}) {
    background-image: var(--background-dots);
    background-repeat: repeat;
    background-size: 450px;
  }
`;

export const StyledIntegrationCompatibilityGradientLimits = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const StyledIntegrationCompatibilityGradientWrapper = styled.div`
  position: absolute;
  width: 1474.5px;
  height: 941px;
  right: -550px;
  top: -350px;

  @media (min-width: ${screens.lg}) {
    top: -150px;
    right: -500px;
  }

  & > div {
    z-index: 0;
  }
`;

export const StyledIntegrationCompatibilityContentWrapper = styled(Container)`
  &&& {
    display: flex;
    padding: 32px 16px;
    flex-direction: column;
    gap: 32px;
    position: relative;

    @media (min-width: ${screens.lg}) {
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      padding: 96px 90px;
    }
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

  @media (min-width: ${screens.lg}) {
    text-align: left;
    max-width: 440px;
  }
`;

export const StyledIntegrationCompatibilityLabel = styled.p`
  font-size: ${fontSizes.label.l};
  font-weight: ${fontWeight.bold};
  color: var(--cinnabar-red);
  line-height: 1.1;
  letter-spacing: 0.6px;
  text-transform: uppercase;
`;

export const StyledCompatibilityBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;

  @media (min-width: ${screens.lg}) {
    justify-content: end;
    gap: 12px;
    max-width: 630px;
  }
`;