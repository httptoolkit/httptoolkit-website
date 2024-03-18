'use client';

import type { StyledPricingCardProps } from './card.types';

import { StyledButton, StyledLink } from '@/components/elements/button/button.styles';
import { styled } from '@/styles';

export const StyledPricingCardWrapper = styled.div<StyledPricingCardProps>`
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border} inset;
  background-color: ${({ theme, $isHighlighted }) =>
    $isHighlighted ? theme.colors.inkBlack : theme.colors.mediumGrey};
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    gap: 32px;
    padding: 32px;
  }
`;

export const StyledPricingCardButtonWrapper = styled.div`
  & > *,
  & > * > ${StyledButton}, & > * > ${StyledLink} {
    width: 100%;
  }
`;

export const StyledPricingCardPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledPriceCardPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.heading.mobile.l};
  line-height: 1.1;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    font-size: 56px;
    line-height: 61.6px;
  }
`;

export const StyledPriceCardFeaturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    gap: 32px;
  }
`;

export const StyledPriceCardFeature = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StyledPriceCardFeatureItemsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledPriceCardFeatureItemLI = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
`;
