import { StyledPricingComparisonDesktopWrapper, StyledPricingComparisonWrapper } from './comparison.styles';
import type { PricingComparisonProps } from './comparison.types';
import { FeaturesSection } from './components/features-section';
import { HeadingSection } from './components/heading-section';
import { MobileComparisonCard } from './components/mobile-comparison-card';

export const PricingComparison = ({ title, text, plans, features }: PricingComparisonProps) => {
  return (
    <StyledPricingComparisonWrapper forwardedAs="section">
      {Array.isArray(plans) &&
        plans.length > 0 &&
        plans.map(plan => (
          <MobileComparisonCard key={plan.id} title={title} text={text} plan={plan} features={features} />
        ))}
      <StyledPricingComparisonDesktopWrapper>
        <HeadingSection title={title} text={text} plans={plans} />
        <FeaturesSection plans={plans} features={features} />
      </StyledPricingComparisonDesktopWrapper>
    </StyledPricingComparisonWrapper>
  );
};
