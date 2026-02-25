'use client';

import type { StyledIntegrationStepNumberProps } from './steps.types';

import { css, styled, screens, textOrangeGradientMixin, fontWeight } from '@/styles';

export const StyledIntegrationStepsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    gap: 68px;
    padding: 98px 0;
  }
`;

export const StyledIntegrationStepsContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    gap: 32px;
  }
`;

export const StyledIntegrationStepsItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0px 2px 24px 0px var(--shadow-default);
  border-radius: 12px;
  padding: 24px;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    max-width: 656px;
  }
`;

export const StyledIntegrationStepsItemStep = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledIntegrationStepsItemStepNumber = styled.div`
  width: 64px;
  height: 64px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${fontWeight.bold};
  border-radius: 8px;
  background-color: var(--dark-grey);
  flex-shrink: 0;
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0px 0px 24px 0px var(--shadow-inner-box) inset;
`;

export const StyledIntegrationStepsItemStepNumberText = styled.span<StyledIntegrationStepNumberProps>`
  line-height: 1;
  ${({ $variation }) => {
    switch ($variation) {
      case 'blue':
        return css`
          color: var(--electric-blue);
        `;
      case 'orange':
        return textOrangeGradientMixin;
    }
  }}
`;