import type { ReactNode } from 'react';

import type { PricingCardProps } from './components/card/card.types';

export interface PricingPlansData {
  cards: PricingCardProps[];
  disclaimer: string;
}

export interface StyledPricingPlansProps {
  $hideFree?: boolean;
  downloadButton?: ReactNode;
}
