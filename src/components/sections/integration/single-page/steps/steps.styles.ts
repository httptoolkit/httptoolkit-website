'use client';

import type { StyledIntegrationStepNumberProps } from './steps.types';

import { css, styled } from '@/styles';

export const StyledIntegrationStepsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    gap: 68px;
    padding: 98px 0;
  }
`;

export const StyledIntegrationStepsContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: row;
    gap: 32px;
  }
`;

export const StyledIntegrationStepsItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset,
    0px 2px 24px 0px ${({ theme }) => theme.colors.shadowDefault};
  border-radius: 12px;
  padding: 24px;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
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
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.mediumGrey};
  flex-shrink: 0;
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset,
    0px 0px 24px 0px ${({ theme }) => theme.shadow.innerBox} inset;
`;

export const StyledIntegrationStepsItemStepNumberText = styled.span<StyledIntegrationStepNumberProps>`
  line-height: 1;
  ${({ theme, $variation }) => {
    switch ($variation) {
      case 'blue':
        return css`
          color: ${theme.colors.electricBlue};
        `;
      case 'orange':
        return theme.colors.text.textOrangeGradient;
    }
  }}
`;
