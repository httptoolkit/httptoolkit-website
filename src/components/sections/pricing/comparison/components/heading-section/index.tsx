import { styled } from '@linaria/react';

import type { PricingComparisonProps } from '../..';
import { HeadingPlan } from '../heading-plan';
import { TextSection } from '../text-section';

import { DownloadButton } from '@/components/modules/download-button';

const StyledHeadingSectionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: minmax(130px, fit-content);
  border-bottom: 1px solid var(--dark-grey);

  position: sticky;
  top: 0;
  background-color: var(--ink-grey);
  padding-top: 26px;

  & > *[data-text-section='true'] {
    padding-left: 32px;
    padding-right: 24px;
  }
`;

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
