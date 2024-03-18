import type { PricingCardProps } from './components/card/card.types';

export interface Plan {
  badge?: string;
  cards: PricingCardProps[];
}

export interface PricingPlansProps {
  monthly: Plan;
  yearly: Plan;
  disclaimer: string;
}
