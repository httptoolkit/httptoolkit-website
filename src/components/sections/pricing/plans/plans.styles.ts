'use client';

import { StyledPricingCardWrapper } from './components/card/card.styles';
import type { StyledPricingPlansProps } from './plans.types';

import { Container } from '@/components/elements/container';
import { css, keyframes, styled } from '@/styles';

export const StyledPricingPlansWrapper = styled(Container)`
  &&& {
    position: relative;
    max-width: ${({ theme }) => theme.screens['2xl']} !important;
  }
`;

export const StyledPricingPlansSwitchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 96px auto 32px;
  width: fit-content;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    margin: 48px auto;
  }
`;

export const StyledPricingPlansSwitchBadge = styled.div`
  position: absolute;
  left: -56px;
  top: -28px;
  border-radius: 24px;
  padding: 8px 12px;
  transform: rotate(-14deg);
  background: ${({ theme }) => theme.colors.orangeGradient};
  box-shadow:
    0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset,
    0px -0.83px 0.83px 0px rgba(16, 46, 151, 0.1) inset,
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset;

  & > p {
    text-transform: uppercase;
  }
`;

export const StyledPricingPlansCardsWrapper = styled.div<StyledPricingPlansProps>`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: ${({ $hideFree }) => ($hideFree ? 'repeat(6, 1fr)' : 'repeat(3, 1fr)')};

    ${({ $hideFree }) =>
      $hideFree &&
      css`
        & > ${StyledPricingCardWrapper}:first-child {
          grid-column: 2/4;
        }

        & > ${StyledPricingCardWrapper} {
          grid-column: 4/6;
        }
      `}
  }
`;

export const StyledPricingPlansDisclaimerWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 32px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    gap: 24px;
  }
`;

// Define the keyframe animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledLoadingSpinner = styled.span`
  display: inline-flex;

  & svg {
    animation: ${rotate} 5s linear infinite;
  }
`;
