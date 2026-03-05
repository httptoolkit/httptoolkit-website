import { styled } from '@linaria/react';

import type { PlanId } from '../plans';

import { FeaturesSection } from './components/features-section';
import { HeadingSection } from './components/heading-section';
import { MobileComparisonCard } from './components/mobile-comparison-card';

import { Container } from '@/components/elements/container';
import { screens } from '@/styles/tokens';

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

const StyledPricingComparisonWrapper = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-top: 0;
    padding-bottom: 64px;

    @media (min-width: ${screens.lg}) {
      display: block;
      padding-top: 96px;
      padding-bottom: 96px;
    }
  }
`;

const StyledPricingComparisonDesktopWrapper = styled.div`
  &&& {
    display: none;

    @media (min-width: ${screens.lg}) {
      display: block;
    }
  }
`;

export const PricingComparison = ({ title, text, plans, features }: PricingComparisonProps) => {
  return (
    <StyledPricingComparisonWrapper>
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
