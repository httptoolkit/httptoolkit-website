import { styled } from '@linaria/react';

import { Container } from '@/components/elements/container';
import { screens } from '@/styles/tokens';

export const StyledPricingPlansWrapper = styled(Container)`
  &&& {
    position: relative;
    max-width: ${screens['2xl']} !important;
  }
`;

export const StyledPricingPlansSwitchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 96px auto 32px;
  width: fit-content;

  @media (min-width: ${screens.lg}) {
    margin: 48px auto;
  }
`;

export const StyledPricingPlansSwitchBadge = styled.div`
  position: absolute;
  left: -34px;
  top: -22px;

  border-radius: 24px;
  padding: 8px 12px;
  transform: rotate(-14deg);
  background: var(--orange-gradient);
  box-shadow:
    0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset,
    0px -0.83px 0.83px 0px rgba(16, 46, 151, 0.1) inset,
    0 0 0 1px var(--button-border) inset;

  & > p {
    text-transform: uppercase;
  }
`;

export const StyledPricingPlansCardsWrapper = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;

  @media (min-width: ${screens.lg}) {
    grid-template-columns: repeat(3, 1fr);

    &[data-hide-free="true"] {
      grid-template-columns: repeat(6, 1fr);

      & > [data-pricing-card="true"]:first-child {
        grid-column: 2/4;
      }

      & > [data-pricing-card="true"]:last-child {
        grid-column: 4/6;
      }
    }
  }
`;

export const StyledPricingPlansLoginInfoWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    gap: 24px;
  }

  & a {
    font-weight: bold;
    color: var(--electric-blue);
    text-decoration: underline;
  }
`;

export const StyledLoadingSpinner = styled.span`
  display: inline-flex;

  @keyframes pricing-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  & svg {
    animation: pricing-rotate 5s linear infinite;
  }
`;
