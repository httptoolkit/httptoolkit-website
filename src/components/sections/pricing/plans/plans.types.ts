import type { ReactNode } from 'react';
import { TierCode } from '@httptoolkit/accounts';

export interface PricingPlansData {
  plans: PricingPlanData[];
}

export type PlanId = TierCode | 'free';

export interface PricingPlanData {
  id: PlanId;
  title: string;
  price?: number | string | JSX.Element;
  priceDescription: string;
  isPaidYearly?: boolean;
  features: PlanFeatures[];
  status?: string;

  $isHighlighted: boolean;
}

interface PlanFeatures {
  text: string;
  items: string[];
}

export interface StyledPricingPlansProps {
  $hideFree?: boolean;
  downloadButton?: ReactNode;
}
