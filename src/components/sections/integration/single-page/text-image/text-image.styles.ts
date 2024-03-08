'use client';

import { styled } from '@/styles';

export const StyledIntegrationTextImageGradientWrapper = styled.section`
  position: relative;
`;

export const StyledIntegrationTextImageGradient = styled.div`
  position: absolute;
  width: 80%;
  top: -17%;
  right: 0;
  transform: rotate(180deg);

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    display: none;
  }
`;

export const StyledIntegrationTextImageWrapper = styled.div`
  padding: 64px 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 96px 150px 48px;
  }
`;

export const StyledIntegrationTextImageHeading = styled.div`
  max-width: 656px;
  margin: 0 auto 64px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    margin: 0 auto calc(48px + 96px);
  }
`;
