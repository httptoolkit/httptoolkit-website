'use client';

import type { StyledFeatureLineProps } from './feature-line.types';

import { styled, screens } from '@/styles';

export const StyledFeatureLineWrapper = styled.section<StyledFeatureLineProps>`
  @media (min-width: ${screens.lg}) {
    display: flex;
    flex-direction: ${({ $align }) => $align === 'right' && 'row-reverse'};
    align-items: center;
    justify-content: space-between;
  }

  & > *:nth-child(2) {
    @media (min-width: ${screens.lg}) {
      width: 50%;
    }
  }

  img {
    mask-image: linear-gradient(transparent 1%, #000 5%, #000 95%, transparent 98%)
  }
`;

export const StyledFeatureLineContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 548px;

  @media (max-width: ${screens.lg}) {
    align-items: center;
    margin: 0 auto 32px;
    gap: 32px;
  }
`;

export const StyledFeatureLineTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${screens.lg}) {
    gap: 32px;

    & > * {
      text-align: center;
    }
  }
`;