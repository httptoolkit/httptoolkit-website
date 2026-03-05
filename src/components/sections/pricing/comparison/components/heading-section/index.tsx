import { StyledHeadingSectionWrapper } from './heading-section.styles';

import type { PricingComparisonProps } from '../../comparison.types';
import { HeadingPlan } from '../heading-plan';
import { TextSection } from '../text-section';

import { DownloadButton } from '@/components/modules/download-button';

interface HeadingSectionProps {
  title: string;
  text: string;
  plans: PricingComparisonProps['plans'];
}

export const HeadingSection = ({ title, text, plans }: HeadingSectionProps) => {
  return (
    <StyledHeadingSectionWrapper>
      <TextSection title={title} text={text} />
      {Array.isArray(plans) &&
        plans.length > 0 &&
        plans.map(plan => (
          <HeadingPlan key={plan.id} id={plan.id} title={plan.title} downloadButton={<DownloadButton />} />
        ))}
    </StyledHeadingSectionWrapper>
  );
};
