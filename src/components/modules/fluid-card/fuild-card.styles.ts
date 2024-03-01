'use client';

import type { StyledFluidCardProps } from './fluid-card.types';

import { css, styled } from '@/styles';

export const StyledFluidCardWrapper = styled.div<StyledFluidCardProps>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border},
    0px 2px 24px 0px ${({ theme }) => theme.colors.shadowDefault};

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'default':
        return css`
          background: ${theme.colors.darkGrey};
          gap: 32px;
        `;
      case 'dark':
        return css`
          background: ${theme.colors.inkBlack};
        `;
      case 'highlighted':
        return css`
          background-image: ${({ theme }) => theme.backgroundImages.backgroundAlwaysDarkDots},
            ${theme.colors.blueGradient};
          background-size: 450px 450px;
          background-repeat: repeat repeat;
          background-position: center;
          box-shadow:
            0px 2.4px 1.2px 0px rgba(201, 212, 251, 0.1) inset,
            0px -1.2px 1.2px 0px rgba(16, 46, 151, 0.1) inset,
            0px 2.4px 1.2px 0px rgba(201, 212, 251, 0.1) inset,
            0px -1.2px 1.2px 0px rgba(16, 46, 151, 0.1) inset;
        `;
    }
  }}
`;

export const StyledFluidCardContentWrapper = styled.div<StyledFluidCardProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $variant }) => ($variant === 'highlighted' ? '16px' : '20px')};
`;

export const StyledFluidCardText = styled.div<StyledFluidCardProps>`
  & * {
    font-size: ${({ theme }) => theme.fontSizes.text.m};
    color: ${({ theme, $variant }) =>
      $variant === 'highlighted' ? theme.colors.text.alwayLightGrey : theme.colors.text.darkGrey};
  }

  & p:not(:last-child) {
    margin-bottom: 8px;
  }

  & strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  & a {
    text-decoration: underline;
  }
`;
