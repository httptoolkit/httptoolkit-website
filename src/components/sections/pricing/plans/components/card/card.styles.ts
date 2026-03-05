import { styled } from '@linaria/react';

import { screens, fontSizes } from '@/styles/tokens';

export const StyledPricingCardWrapper = styled.div`
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 0 1px var(--button-border) inset;
  background-color: var(--dark-grey);
  display: flex;
  flex-direction: column;
  gap: 16px;

  &[data-highlighted="true"] {
    background-color: var(--ink-black);
  }

  @media (min-width: ${screens.lg}) {
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

  @media (min-width: ${screens.lg}) {
    justify-content: space-between;
  }

  *[data-text='true'],
  *[data-badge='true'] {
    width: fit-content;
    flex-shrink: 0;
  }
`;

export const StyledPricingCardButtonWrapper = styled.div`
  & [data-dropdown-wrapper='true'],
  & [data-dropdown='true'],
  & [data-button='true'] {
    width: 100%;
  }
`;

export const StyledPricingCardPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }
`;

export const StyledPricingCardCaveats = styled.span`
  margin-top: 6px;
  font-style: italic;
`;

export const StyledPriceCardPrice = styled.span`
  font-size: ${fontSizes.heading.mobile.l};
  line-height: 1.1;
  margin-right: 5px;

  @media (min-width: ${screens.lg}) {
    font-size: 56px;
    line-height: 61.6px;
  }
`;

export const StyledPricingCardCTAWrapper = styled.div`
  display: grid;
  gap: 16px;

  [data-dropdown-wrapper] {
    width: 100%;

    & > * {
      width: 100%;
    }
  }

  *[data-text='true'] {
    text-align: center;

    @media (min-width: ${screens.lg}) {
      text-align: left;
    }
  }
`;

export const StyledPriceCardFeaturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
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

  && a {
    text-decoration: underline;
  }

  && p {
    font-size: ${fontSizes.text.m};
    color: var(--item-color);
    text-align: left;
  }
`;
