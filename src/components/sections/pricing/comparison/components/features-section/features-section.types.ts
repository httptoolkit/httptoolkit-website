import type { PricingComparisonProps } from '../../comparison.types';

export interface FeaturesSectionProps extends Pick<PricingComparisonProps, 'plans' | 'features'> {
  active?: string;
}
