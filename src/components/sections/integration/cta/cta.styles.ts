'use client';

import type { StyledIntegrationCTAProps } from './cta.types';

import { styled } from '@/styles';

export const StyledIntegrationCTAWrapper = styled.section<StyledIntegrationCTAProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;

  ${({ $variant, theme }) =>
    $variant === 'cta'
      ? `
        background-color: ${theme.colors.inkBlack};
        box-shadow: ${theme.colors.borderGradient};
        padding: 32px 16px 0;
        gap: 42px;
        `
      : `
        padding: 32px 16px 0;
        gap: 32px;
        `}

  &::before {
    content: '';
    background: linear-gradient(0deg, ${({ theme }) => theme.colors.inkGrey} 13%, rgba(30, 32, 40, 0) 93.25%);
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 130px;
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: row;

    ${({ $variant }) =>
      $variant === 'cta'
        ? `
      padding: 128px 0;
      gap: 99px;
      `
        : `
      padding: 96px 0;
      gap: 35px;
      `}

    &::before, &::after {
      content: '';
      position: absolute;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.inkGrey} 13%, rgba(30, 32, 40, 0) 93.25%);
      width: 200px;
      height: 100%;
      top: 0;
      bottom: unset;
    }

    &::before {
      left: 0;
      right: unset;
      transform: unset;
    }

    &::after {
      right: 0;
      left: unset;
      transform: rotate(180deg);
    }
  }
`;

export const StyledIntegrationCTAContent = styled.div<StyledIntegrationCTAProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  > p {
    max-width: 740px;
  }
`;
