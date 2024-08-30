'use client';

import type { StyledTextSlotProps } from './text-slot.types';

import { Heading } from '@/components/elements/heading';
import { styled } from '@/styles';

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

    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      text-align: left;
    }
  }
`;

export const StyledTextSlotText = styled.div<StyledTextSlotProps>`
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.darkGrey};
  ${({ $textCenteredOnMobile }) =>
    $textCenteredOnMobile &&
    `
    text-align: center;
    `}

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    text-align: left;
  }

  & p {
    margin-bottom: 4px;
  }

  & strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
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

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    align-items: ${({ $textCenteredOnMobile }) => ($textCenteredOnMobile ? 'center' : 'initial')};
  }
`;

export const StyledTextSlotButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: row;
  }
`;
