'use client';
import type { StyledPricingCardProps } from './card.types';

import { StyledBadge } from '@/components/elements/badge/badge.styles';
import { StyledButton, StyledLink } from '@/components/elements/button/button.styles';
import { Text } from '@/components/elements/text';
import { StyledText } from '@/components/elements/text/text.styles';
import { DropdownWrapper } from '@/components/modules/dropdown/dropdown.styles';
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

export const StyledPricingCardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    justify-content: space-between;
  }

  ${StyledText}, ${StyledBadge} {
    width: fit-content;
    flex-shrink: 0;
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
  text-align: center;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    text-align: left;
  }
`;

export const StyledPricingCardAnnualFlag = styled(Text)`
  margin-top: 6px;
`;

export const StyledPriceCardPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.heading.mobile.l};
  line-height: 1.1;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    font-size: 56px;
    line-height: 61.6px;
  }
`;

export const StyledPricingCardCTAWrapper = styled.div`
  display: grid;
  gap: 16px;

  ${DropdownWrapper} {
    width: 100%;

    & > * {
      width: 100%;
    }
  }

  ${StyledText} {
    text-align: center;

    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      text-align: left;
    }
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
