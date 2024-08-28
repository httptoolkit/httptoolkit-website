import { PricingPlanData } from "../../plans.types";

export interface StyledPricingCardProps {
  $isHighlighted?: boolean;
}

export type PricingCardProps = StyledPricingCardProps & PricingPlanData;