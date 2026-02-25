'use client';

import type { StyledTextSlotProps } from './text-slot.types';

import { Heading } from '@/components/elements/heading';
import { styled, screens, fontSizes, fontWeight } from '@/styles';

export const StyledTextSlotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
`;

export const StyledTextSlotTitle = styled(Heading)<StyledTextSlotProps>`
  &&& {
    ${({ $textCenteredOnMobile }) =>
      $textCenteredOnMobile &&
      `
      text-align: center;
      `}

    @media (min-width: ${screens.lg}) {
      text-align: left;
    }
  }
`;

export const StyledTextSlotText = styled.div<StyledTextSlotProps>`
  font-size: ${fontSizes.text.m};
  line-height: 1.5;
  color: var(--text-dark-grey);
  ${({ $textCenteredOnMobile }) =>
    $textCenteredOnMobile &&
    `
    text-align: center;
    `}

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }

  & p {
    margin-bottom: 4px;
  }

  & strong {
    font-weight: ${fontWeight.bold};
  }

  & a {
    text-decoration: underline;
  }
`;

export const StyledTextSlotCopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledTextSlotInnerWrapper = styled.div<StyledTextSlotProps>`
  display: flex;
  flex-direction: column;
  gap: 24px;

  & ${StyledTextSlotCopyWrapper} {
    width: fit-content;
  }

  @media (max-width: ${screens.lg}) {
    align-items: ${({ $textCenteredOnMobile }) => ($textCenteredOnMobile ? 'center' : 'initial')};
  }
`;

export const StyledTextSlotButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
  }
`;