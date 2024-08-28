import { PlanId } from "../plans/plans.types";

interface Feature {
  title: string;
  tooltip?: string;
  checked?: PlanId[];
}

interface FeatureWrapper {
  title: string;
  items: Feature[];
}

interface Plan {
  id: PlanId;
  title: string;
}

export interface PricingComparisonProps {
  title: string;
  text: string;
  plans: Plan[];
  features: FeatureWrapper[];
}
