'use client';

import type { StyledBadgeProps } from './badge.types';

import { css, styled } from '@/styles';

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 16px;
`;

export const AdditionalText = styled.span`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: ${({ theme }) => theme.fontSizes.label.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.label};
  text-transform: uppercase;
`;

export const StyledBadge = styled.p<StyledBadgeProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.label.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: ${({ theme }) => theme.lineHeight.label};
  letter-spacing: ${({ theme }) => theme.letterSpacing.label};
  text-transform: uppercase;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          border-radius: 16px;
          padding: 6px 10px;
          color: ${({ theme }) => theme.colors.text.lightGrey};
          background-color: ${({ theme }) => theme.colors.darkGrey};
          box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.borderDark} inset;
        `;

      case 'secondary':
        return css`
          border-radius: 24px;
          padding: 8px 12px;
          color: ${({ theme }) => theme.colors.text.alwayLightGrey};
          background: ${({ theme }) => theme.colors.blueGradient};
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset;
        `;
    }
  }}
`;
