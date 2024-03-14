import { StyledHeadingSectionWrapper } from './heading-section.styles';
import type { HeadingSectionProps } from './heading-section.type';
import { HeadingPlan } from '../heading-plan';
import { TextSection } from '../text-section';

export const HeadingSection = ({ title, text, plans }: HeadingSectionProps) => {
  return (
    <StyledHeadingSectionWrapper>
      <TextSection title={title} text={text} />
      {Array.isArray(plans) &&
        plans.length > 0 &&
        plans.map(plan => (
          <HeadingPlan key={plan.id} id={plan.id} title={plan.title} isDownload={plan.isDownload} CTA={plan.CTA} />
        ))}
    </StyledHeadingSectionWrapper>
  );
};
