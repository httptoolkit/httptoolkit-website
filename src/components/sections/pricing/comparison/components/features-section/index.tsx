import {
  StyledCheckedMarkWrapper,
  StyledFeatureSectionItem,
  StyledFeatureSectionItemTitleWrapper,
  StyledFeatureSectionItemWrapper,
  StyledFeatureSectionTitle,
  StyledFeaturesSectionWrapper,
} from './features-section.styles';
import type { FeaturesSectionProps } from './features-section.types';

import { CheckIcon } from '@/components/elements/check-icon';
import { Question } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { Tooltip } from '@/components/elements/tooltip';

const CheckedMark = ({ checked }: { checked: boolean }) => {
  return (
    <StyledCheckedMarkWrapper>
      {checked ? (
        <CheckIcon />
      ) : (
        <Text fontSize="m" fontWeight="medium" color="lightGrey">
          –
        </Text>
      )}
    </StyledCheckedMarkWrapper>
  );
};

export const FeaturesSection = ({ features, active, plans }: FeaturesSectionProps) => {
  return (
    <StyledFeaturesSectionWrapper>
      {Array.isArray(features) &&
        features.length > 0 &&
        features.map(feature => (
          <StyledFeatureSectionItemWrapper key={feature.title}>
            <StyledFeatureSectionTitle fontSize="l" color="lightGrey" fontWeight="medium">
              {feature.title}
            </StyledFeatureSectionTitle>
            {Array.isArray(feature.items) &&
              feature.items.length > 0 &&
              feature.items.map(item => (
                <StyledFeatureSectionItem key={item.title}>
                  <StyledFeatureSectionItemTitleWrapper>
                    <Text fontSize="s" fontWeight="medium" color="darkGrey">
                      {item.title}
                    </Text>
                    {item.tooltip && (
                      <Tooltip text={item.tooltip}>
                        <Question weight="regular" />
                      </Tooltip>
                    )}
                  </StyledFeatureSectionItemTitleWrapper>
                  {active && <CheckedMark checked={item.checked?.some(check => active === check) || false} />}
                  {!active &&
                    Array.isArray(plans) &&
                    plans.length > 0 &&
                    plans.map(plan => (
                      <CheckedMark key={plan.id} checked={item.checked?.some(check => plan.id === check) || false} />
                    ))}
                </StyledFeatureSectionItem>
              ))}
          </StyledFeatureSectionItemWrapper>
        ))}
    </StyledFeaturesSectionWrapper>
  );
};
