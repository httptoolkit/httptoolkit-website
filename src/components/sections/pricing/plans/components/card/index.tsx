'use client';

import {
  StyledPriceCardFeature,
  StyledPriceCardFeatureItemLI,
  StyledPriceCardFeatureItemsWrapper,
  StyledPriceCardPrice,
  StyledPricingCardAnnualFlag,
  StyledPricingCardButtonWrapper,
  StyledPricingCardPriceWrapper,
  StyledPricingCardTitle,
  StyledPricingCardWrapper,
} from './card.styles';
import type { PricingCardProps } from './card.types';

import { Badge } from '@/components/elements/badge';
import { CheckIcon } from '@/components/elements/check-icon';
import { Text } from '@/components/elements/text';
import type { TextProps } from '@/components/elements/text/text.types';

interface FeatureListProps {
  feature: PricingCardProps['features'][number];
  $isHighlighted: PricingCardProps['$isHighlighted'];
}
const FeatureList = ({ feature, $isHighlighted }: FeatureListProps) => {
  const textColor: TextProps['color'] = $isHighlighted ? 'white' : 'lightGrey';
  const itemColor: TextProps['color'] = $isHighlighted ? 'white' : 'darkGrey';

  return (
    <StyledPriceCardFeature>
      <Text fontSize="m" fontWeight="medium" color={textColor} textAlign="left">
        {feature.text}
      </Text>
      <StyledPriceCardFeatureItemsWrapper>
        {Array.isArray(feature.items) &&
          feature.items?.length > 0 &&
          feature.items.map((item, idx) => (
            <StyledPriceCardFeatureItemLI key={idx}>
              <CheckIcon />
              <Text fontSize="m" color={itemColor} textAlign="left">
                {item}
              </Text>
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
  $isHighlighted,
  isPaidYearly,
  children,
  status,
}: Component<PricingCardProps>) => {
  const TextColor: TextProps['color'] = $isHighlighted ? 'white' : 'lightGrey';
  const isFree = price === 0;
  return (
    <StyledPricingCardWrapper $isHighlighted={$isHighlighted}>
      <StyledPricingCardPriceWrapper>
        <StyledPricingCardTitle>
          <Text fontSize="l" color={TextColor}>
            {title}
          </Text>
          {status && <Badge variant="secondary">{status}</Badge>}
        </StyledPricingCardTitle>
        <Text fontSize="l" color="lightGrey">
          <StyledPriceCardPrice>{isFree ? 'Free' : price}</StyledPriceCardPrice>
          {priceDescription}
          <br />
          {isPaidYearly && !isFree && (
            <StyledPricingCardAnnualFlag forwardedAs="span" fontSize="s" color="darkGrey">
              paid annually
            </StyledPricingCardAnnualFlag>
          )}
        </Text>
      </StyledPricingCardPriceWrapper>
      <StyledPricingCardButtonWrapper>{children}</StyledPricingCardButtonWrapper>
      {Array.isArray(features) &&
        features.length > 0 &&
        features.map((feature, idx) => <FeatureList key={idx} feature={feature} $isHighlighted />)}
    </StyledPricingCardWrapper>
  );
};
