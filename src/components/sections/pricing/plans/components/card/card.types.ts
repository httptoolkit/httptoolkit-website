import type { ButtonProps } from '@/components/elements/button/button.types';

export interface StyledPricingCardProps {
  $isHighlighted?: boolean;
}

interface Features {
  text: string;
  items: string[];
}

export interface PricingCardProps extends StyledPricingCardProps {
  title: string;
  price: number;
  priceDescription: string;
  isDownload?: boolean;
  CTA?: ButtonProps;
  features: Features[];
}
