'use client';

import {
  StyledPriceCardFeature,
  StyledPriceCardFeatureItemLI,
  StyledPriceCardFeatureItemsWrapper,
  StyledPriceCardPrice,
  StyledPricingCardButtonWrapper,
  StyledPricingCardPriceWrapper,
  StyledPricingCardWrapper,
} from './card.styles';
import type { PricingCardProps } from './card.types';

import { Button } from '@/components/elements/button';
import { CheckIcon } from '@/components/elements/check-icon';
import { Text } from '@/components/elements/text';
import type { TextProps } from '@/components/elements/text/text.types';
import { DownloadButton } from '@/components/modules/download-button';

const renderFeatures = (
  feature: PricingCardProps['features'][number],
  $isHighlighted: PricingCardProps['$isHighlighted'],
) => {
  const textColor: TextProps['color'] = $isHighlighted ? 'white' : 'lightGrey';
  const itemColor: TextProps['color'] = $isHighlighted ? 'white' : 'darkGrey';

  return (
    <StyledPriceCardFeature>
      <Text fontSize="m" fontWeight="medium" color={textColor}>
        {feature.text}
      </Text>
      <StyledPriceCardFeatureItemsWrapper>
        {Array.isArray(feature.items) &&
          feature.items?.length > 0 &&
          feature.items.map(item => (
            <StyledPriceCardFeatureItemLI>
              <CheckIcon />
              <Text fontSize="m" color={itemColor}>
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
  isDownload,
  CTA,
  features,
  $isHighlighted,
}: PricingCardProps) => {
  const TextColor: TextProps['color'] = $isHighlighted ? 'white' : 'lightGrey';
  return (
    <StyledPricingCardWrapper $isHighlighted={$isHighlighted}>
      <StyledPricingCardPriceWrapper>
        <Text fontSize="l" color={TextColor}>
          {title}
        </Text>
        <Text fontSize="l" color="white">
          {/* TODO: Refactor to change when is authenticated */}
          <StyledPriceCardPrice>{price === 0 ? 'Free' : `€${price}`}</StyledPriceCardPrice>
          {priceDescription}
        </Text>
      </StyledPricingCardPriceWrapper>
      <StyledPricingCardButtonWrapper>
        {isDownload ? <DownloadButton {...CTA} /> : CTA && <Button {...CTA} />}
      </StyledPricingCardButtonWrapper>
      {Array.isArray(features) &&
        features.length > 0 &&
        features.map(feature => renderFeatures(feature, $isHighlighted))}
    </StyledPricingCardWrapper>
  );
};
