'use client';

import React from 'react';
import { marked } from 'marked';

import { styled } from '@linaria/react';

import type { PricingPlanData } from '../..';

import { Badge } from '@/components/elements/badge';
import { CheckIcon } from '@/components/elements/check-icon';
import { Text } from '@/components/elements/text';
import type { TextProps } from '@/components/elements/text';
import { screens, fontSizes, textColors } from '@/styles/tokens';
import { renderer } from '@/lib/marked/link-target-render';

export interface PricingCardVariantProps {
  isHighlighted?: boolean;
}

export type PricingCardProps = PricingCardVariantProps & PricingPlanData;

const StyledPricingCardWrapper = styled.div`
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

const StyledPricingCardTitle = styled.div`
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

const StyledPricingCardButtonWrapper = styled.div`
  & [data-dropdown-wrapper='true'],
  & [data-dropdown='true'],
  & [data-button='true'] {
    width: 100%;
  }
`;

const StyledPricingCardPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }
`;

const StyledPricingCardCaveats = styled.span`
  margin-top: 6px;
  font-style: italic;
`;

const StyledPriceCardPrice = styled.span`
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

const StyledPriceCardFeature = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledPriceCardFeatureItemsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledPriceCardFeatureItemLI = styled.li`
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

interface FeatureListProps {
  feature: PricingCardProps['features'][number];
  isHighlighted: PricingCardProps['isHighlighted'];
}
const FeatureList = ({ feature, isHighlighted }: FeatureListProps) => {
  const textColor: TextProps['color'] = isHighlighted ? 'white' : 'lightGrey';
  const itemColor: TextProps['color'] = isHighlighted ? 'white' : 'darkGrey';

  return (
    <StyledPriceCardFeature>
      <Text fontSize="m" fontWeight="medium" color={textColor} textAlign="left">
        {feature.text}
      </Text>
      <StyledPriceCardFeatureItemsWrapper>
        {Array.isArray(feature.items) &&
          feature.items?.length > 0 &&
          feature.items.map((item, idx) => (
            <StyledPriceCardFeatureItemLI
              key={idx}
              style={{ '--item-color': textColors[itemColor as keyof typeof textColors] } as React.CSSProperties}
            >
              <CheckIcon />
              <span dangerouslySetInnerHTML={{ __html: marked.parse(item, { renderer }) as string }} />
            </StyledPriceCardFeatureItemLI>
          ))}
      </StyledPriceCardFeatureItemsWrapper>
    </StyledPriceCardFeature>
  );
};

export const PricingCard = ({
  title,
  price,
  priceDescription,
  features,
  isHighlighted,
  isPaidYearly,
  children,
  status,
}: Component<PricingCardProps>) => {
  const TextColor: TextProps['color'] = isHighlighted ? 'white' : 'lightGrey';
  const isFree = price === 0;
  return (
    <StyledPricingCardWrapper data-highlighted={isHighlighted ? 'true' : undefined} data-pricing-card="true">
      <StyledPricingCardPriceWrapper>
        <StyledPricingCardTitle>
          <Text fontSize="l" color={TextColor}>
            {title}
          </Text>
          {status && <Badge variant="secondary">{status}</Badge>}
        </StyledPricingCardTitle>
        <Text fontSize="l" color="darkGrey">
          <StyledPriceCardPrice>{isFree ? 'Free' : price}</StyledPriceCardPrice>
          {priceDescription}
          <br />
          {typeof price === 'string' && !isFree && (
            <StyledPricingCardCaveats>
              <Text as="span" fontSize="s" color="darkGrey">
                plus local tax, paid {isPaidYearly ? 'annually' : 'monthly'}
              </Text>
            </StyledPricingCardCaveats>
          )}
        </Text>
      </StyledPricingCardPriceWrapper>
      <StyledPricingCardButtonWrapper>{children}</StyledPricingCardButtonWrapper>
      {Array.isArray(features) &&
        features.length > 0 &&
        features.map((feature, idx) => <FeatureList key={idx} feature={feature} isHighlighted={isHighlighted} />)}
    </StyledPricingCardWrapper>
  );
};
