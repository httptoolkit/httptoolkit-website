'use client';

import { marked } from 'marked';

import {
  StyledPriceCardFeature,
  StyledPriceCardFeatureItemLI,
  StyledPriceCardFeatureItemsWrapper,
  StyledPriceCardPrice,
  StyledPricingCardCaveats,
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
import { renderer } from '@/lib/marked/link-target-render';

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
            <StyledPriceCardFeatureItemLI key={idx} $itemColor={itemColor}>
              <CheckIcon />
              <span dangerouslySetInnerHTML={{ __html: marked.parse(item, { renderer }) }} />
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
        <Text fontSize="l" color="darkGrey">
          <StyledPriceCardPrice>{isFree ? 'Free' : price}</StyledPriceCardPrice>
          { priceDescription }
          <br />
          { typeof price === 'string' && !isFree && (
            <StyledPricingCardCaveats forwardedAs="span" fontSize="s" color="darkGrey">
              plus local tax, paid { isPaidYearly ? 'annually' : 'monthly' }
            </StyledPricingCardCaveats>
          )}
        </Text>
      </StyledPricingCardPriceWrapper>
      <StyledPricingCardButtonWrapper>{children}</StyledPricingCardButtonWrapper>
      {Array.isArray(features) &&
        features.length > 0 &&
        features.map((feature, idx) => <FeatureList key={idx} feature={feature} $isHighlighted={$isHighlighted} />)}
    </StyledPricingCardWrapper>
  );
};
