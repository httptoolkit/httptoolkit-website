'use client';

import { styled, screens } from '@/styles';

export const StyledIntegrationTextVideoGradientWrapper = styled.section`
  position: relative;
`;

export const StyledIntegrationTextVideoGradient = styled.div`
  position: absolute;
  width: 80%;
  top: -17%;
  right: 0;
  transform: rotate(180deg);
  z-index: -1;

  @media (max-width: ${screens.lg}) {
    display: none;
  }
`;

export const StyledIntegrationTextVideoWrapper = styled.div`
  padding: 64px 16px;

  @media (min-width: ${screens.lg}) {
    padding: 96px 150px 48px;
  }
`;

export const StyledIntegrationTextVideoHeading = styled.div`
  max-width: 656px;
  margin: 0 auto 64px;

  @media (min-width: ${screens.lg}) {
    margin: 0 auto calc(48px + 96px);
  }
`;