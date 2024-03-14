import type { PricingComparisonProps } from '../../comparison.types';

export interface MobileComparisonCardProps {
  title: string;
  text: string;
  plan: PricingComparisonProps['plans'][number];
  features: PricingComparisonProps['features'];
}
