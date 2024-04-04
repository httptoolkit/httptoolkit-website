'use client';

import { Container } from '@/components/elements/container';
import { Text } from '@/components/elements/text';
import { styled } from '@/styles';

export const StyledTextWithAccordionWrapper = styled.section`
  position: relative;
`;

export const StyledTextWithAccordionGradientWrapper = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  top: -10px;
  z-index: -1;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    display: none;
  }
`;

export const StyledTextWithAccordionContentWrapper = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      flex-direction: row;
      justify-content: space-between;
      padding: 128px 48px;
    }

    @media (min-width: ${({ theme }) => theme.screens['2xl']}) {
      padding: 128px 90px;
    }
  }
`;

export const StyledTextWithAccordionTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    max-width: 375px;
    flex-shrink: 0;
  }

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    text-align: center;
  }
`;

export const StyledTextWithAccordionText = styled(Text)`
  &&& {
    margin-top: 24px;
    margin-bottom: 16px;

    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      margin-bottom: 24px;
    }
  }
`;
