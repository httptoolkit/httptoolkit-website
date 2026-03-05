import { styled } from '@linaria/react';

import type { PricingComparisonProps } from '../..';
import { FeaturesSection } from '../features-section';
import { HeadingPlan } from '../heading-plan';
import { TextSection } from '../text-section';

import { screens } from '@/styles/tokens';

interface MobileComparisonCardProps {
  title: string;
  text: string;
  plan: PricingComparisonProps['plans'][number];
  features: PricingComparisonProps['features'];
}

const StyledMobileComparisonCardWrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: ${screens.lg}) {
      display: none;
    }
  }
`;

export const MobileComparisonCard = ({ title, text, plan, features }: MobileComparisonCardProps) => {
  return (
    <StyledMobileComparisonCardWrapper>
      <HeadingPlan id={plan.id} title={plan.title} />
      <TextSection title={title} text={text} />
      <FeaturesSection plans={[plan]} features={features} active={plan.id} />
    </StyledMobileComparisonCardWrapper>
  );
};
