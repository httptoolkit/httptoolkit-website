'use client';

import { StyledPricingComparisonDesktopWrapper, StyledPricingComparisonWrapper } from './comparison.styles';
import type { PricingComparisonProps } from './comparison.types';
import { FeaturesSection } from './components/features-section';
import { HeadingSection } from './components/heading-section';
import { MobileComparisonCard } from './components/mobile-comparison-card';

import { useIsMobile } from '@/lib/hooks/use-is-mobile';

export const PricingComparison = ({ title, text, plans, features }: PricingComparisonProps) => {
  const isMobile = useIsMobile();
  return (
    <StyledPricingComparisonWrapper forwardedAs="section">
      {isMobile ? (
        Array.isArray(plans) &&
        plans.length > 0 &&
        plans.map(plan => (
          <MobileComparisonCard key={plan.id} title={title} text={text} plan={plan} features={features} />
        ))
      ) : (
        <StyledPricingComparisonDesktopWrapper>
          <HeadingSection title={title} text={text} plans={plans} />
          <FeaturesSection plans={plans} features={features} />
        </StyledPricingComparisonDesktopWrapper>
      )}
    </StyledPricingComparisonWrapper>
  );
};
