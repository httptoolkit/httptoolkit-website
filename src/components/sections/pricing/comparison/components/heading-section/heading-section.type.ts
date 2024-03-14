import type { PricingComparisonProps } from '../../comparison.types';

export interface HeadingSectionProps {
  title: string;
  text: string;
  plans: PricingComparisonProps['plans'];
}
