'use client';

import { Text } from '@/components/elements/text';
import { styled, screens } from '@/styles';

export const StyledFeaturesSectionWrapper = styled.div`
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

export const StyledFeatureSectionItemWrapper = styled.div`
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

export const StyledFeatureSectionTitle = styled(Text)`
  &&& {
    padding: 18.5px 0;

    @media (min-width: ${screens.lg}) {
      padding-left: 32px;
    }
  }
`;

export const StyledFeatureSectionItem = styled.div`
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

export const StyledFeatureSectionItemTitleWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  @media (min-width: ${screens.lg}) {
    padding-left: 32px;
  }
`;

export const StyledCheckedMarkWrapper = styled.div`
  margin: auto;
`;