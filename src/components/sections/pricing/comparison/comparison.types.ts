interface Feature {
  title: string;
  tooltip?: string;
  checked?: string[];
}

interface FeatureWrapper {
  title: string;
  items: Feature[];
}

interface Plan {
  id: string;
  title: string;
}

export interface PricingComparisonProps {
  title: string;
  text: string;
  plans: Plan[];
  features: FeatureWrapper[];
}
