'use client';

import type { StyledFeatureLineProps } from './feature-line.types';

import { ThemedImage } from '@/components/elements/themed-image';
import { styled } from '@/styles';

export const StyledFeatureLineWrapper = styled.section<StyledFeatureLineProps>`
  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    display: flex;
    flex-direction: ${({ $align }) => $align === 'right' && 'row-reverse'};
    align-items: center;
    justify-content: space-between;
  }

  & > *:nth-child(2) {
    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      width: 50%;
      max-height: 570px;
    }
  }
`;

export const StyledFeatureLineImage = styled(ThemedImage)``;

export const StyledFeatureLineContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 548px;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    align-items: center;
    margin: 0 auto 32px;
    gap: 32px;
  }
`;

export const StyledFeatureLineTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    gap: 32px;

    & > * {
      text-align: center;
    }
  }
`;
