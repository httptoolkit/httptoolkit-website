import { StyledHeadingPlanWrapper } from './heading-plan.styles';
import type { HeadingPlanProps } from './heading-plan.types';

import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import { DownloadButton } from '@/components/modules/download-button';

export const HeadingPlan = ({ isDownload, CTA, title }: HeadingPlanProps) => {
  return (
    <StyledHeadingPlanWrapper>
      <Heading as="h3" fontSize="xs" color="lightGrey" textAlign="center">
        {title}
      </Heading>
      {isDownload ? <DownloadButton {...CTA} /> : <Button {...CTA} />}
    </StyledHeadingPlanWrapper>
  );
};
