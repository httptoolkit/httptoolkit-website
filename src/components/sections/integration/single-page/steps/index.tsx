import { styled } from '@linaria/react';

import { Text } from '@/components/elements/text';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';
import { screens, fontWeight } from '@/styles/tokens';

export interface IntegrationStepsProps {
  title: string;
  subtitle?: string;
  steps: string[][];
}

export interface IntegrationStepNumberProps {
  variation: 'blue' | 'orange';
}

const StyledIntegrationStepsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    gap: 68px;
    padding: 98px 0;
  }
`;

const StyledIntegrationStepsContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    gap: 32px;
  }
`;

const StyledIntegrationStepsItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0px 2px 24px 0px var(--shadow-default);
  border-radius: 12px;
  padding: 24px;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    max-width: 656px;
  }
`;

const StyledIntegrationStepsItemStep = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledIntegrationStepsItemStepNumber = styled.div`
  width: 64px;
  height: 64px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${fontWeight.bold};
  border-radius: 8px;
  background-color: var(--dark-grey);
  flex-shrink: 0;
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0px 0px 24px 0px var(--shadow-inner-box) inset;
`;

const StyledIntegrationStepsItemStepNumberText = styled.span`
  line-height: 1;

  &[data-variation="blue"] {
    color: var(--electric-blue);
  }

  &[data-variation="orange"] {
    background: var(--text-orange-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

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
                    <StyledIntegrationStepsItemStepNumber>
                      <StyledIntegrationStepsItemStepNumberText data-variation={stepIndex % 2 === 0 ? 'blue' : 'orange'}>
                        {index + 1}
                      </StyledIntegrationStepsItemStepNumberText>
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
