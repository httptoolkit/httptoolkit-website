import type React from 'react';

import type { PricingComparisonProps } from '../../comparison.types';

export type HeadingPlanProps = PricingComparisonProps['plans'][number] & {
  downloadButton?: React.ReactNode;
};
