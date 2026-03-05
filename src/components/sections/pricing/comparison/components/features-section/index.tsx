import { styled } from '@linaria/react';

import type { PricingComparisonProps } from '../..';

import { CheckIcon } from '@/components/elements/check-icon';
import { Question } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { Tooltip } from '@/components/elements/tooltip';
import { screens } from '@/styles/tokens';

interface FeaturesSectionProps extends Pick<PricingComparisonProps, 'plans' | 'features'> {
  active?: string;
}

const StyledFeaturesSectionWrapper = styled.div`
  &&& {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (min-width: ${screens.lg}) {
      gap: 0;
      padding-top: 0;
    }
  }
`;

const StyledFeatureSectionItemWrapper = styled.div`
  &:not(:last-child) {
    padding-bottom: 8px;
    border-bottom: 1px solid var(--dark-grey);
  }

  @media (min-width: ${screens.lg}) {
    &,
    &:not(:last-child) {
      padding-top: 16px;
      padding-bottom: 16px;
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }
`;

const StyledFeatureSectionTitle = styled(Text)`
  &&& {
    padding: 18.5px 0;

    @media (min-width: ${screens.lg}) {
      padding-left: 32px;
    }
  }
`;

const StyledFeatureSectionItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 52px;
  min-height: 48px;
  padding: 13.5px 0;

  @media (min-width: ${screens.lg}) {
    grid-template-columns: repeat(4, 1fr);
    border-radius: 8px;
    transition: all 0.3;

    @media (hover: hover) {
      &:hover {
        background-color: var(--dark-grey);
      }
    }
  }
`;

const StyledFeatureSectionItemTitleWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  @media (min-width: ${screens.lg}) {
    padding-left: 32px;
  }
`;

const StyledCheckedMarkWrapper = styled.div`
  margin: auto;
`;

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
