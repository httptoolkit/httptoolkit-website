import {
  StyledIntegrationStepsContentWrapper,
  StyledIntegrationStepsItem,
  StyledIntegrationStepsItemStep,
  StyledIntegrationStepsItemStepNumber,
  StyledIntegrationStepsWrapper,
} from './steps.styles';
import type { IntegrationStepsProps } from './steps.types';

import { Text } from '@/components/elements/text';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';

/**
 * @param title: This string can have highlighted text on the segments that are between \`\*content\*\`
 */
export const IntegrationSteps = ({ title, subtitle, steps }: IntegrationStepsProps) => {
  return (
    <StyledIntegrationStepsWrapper>
      <AltHeadingBlock title={title} subtitle={subtitle} />
      <StyledIntegrationStepsContentWrapper>
        {Array.isArray(steps) &&
          steps.length > 0 &&
          steps.map((step, stepIndex) => (
            <StyledIntegrationStepsItem key={step[0]}>
              {Array.isArray(step) &&
                step.length > 0 &&
                step.map((item, index) => (
                  <StyledIntegrationStepsItemStep key={item}>
                    <StyledIntegrationStepsItemStepNumber $variation={stepIndex % 2 === 0 ? 'blue' : 'orange'}>
                      <span>{index + 1}</span>
                    </StyledIntegrationStepsItemStepNumber>
                    <Text fontSize="l" color="darkGrey">
                      {item}
                    </Text>
                  </StyledIntegrationStepsItemStep>
                ))}
            </StyledIntegrationStepsItem>
          ))}
      </StyledIntegrationStepsContentWrapper>
    </StyledIntegrationStepsWrapper>
  );
};
