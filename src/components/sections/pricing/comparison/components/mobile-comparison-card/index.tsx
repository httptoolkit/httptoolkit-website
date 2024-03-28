import { StyledMobileComparisonCardWrapper } from './mobile-comparison-card.styles';
import type { MobileComparisonCardProps } from './mobile-comparison-card.types';
import { FeaturesSection } from '../features-section';
import { HeadingPlan } from '../heading-plan';
import { TextSection } from '../text-section';

export const MobileComparisonCard = ({ title, text, plan, features }: MobileComparisonCardProps) => {
  return (
    <StyledMobileComparisonCardWrapper>
      <HeadingPlan id={plan.id} title={plan.title} />
      <TextSection title={title} text={text} />
      <FeaturesSection plans={[plan]} features={features} active={plan.id} />
    </StyledMobileComparisonCardWrapper>
  );
};
