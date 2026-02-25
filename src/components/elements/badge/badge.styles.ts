'use client';

import type { StyledBadgeProps } from './badge.types';

import { css, styled, fontSizes, fontWeight, letterSpacing, lineHeight } from '@/styles';

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 16px;
`;

export const AdditionalText = styled.span`
  color: var(--light-grey);
  font-size: ${fontSizes.label.l};
  font-weight: ${fontWeight.bold};
  letter-spacing: ${letterSpacing.label};
  text-transform: uppercase;
`;

export const StyledBadge = styled.p<StyledBadgeProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${fontSizes.label.m};
  font-weight: ${fontWeight.bold};
  line-height: ${lineHeight.label};
  letter-spacing: ${letterSpacing.label};
  text-transform: uppercase;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          border-radius: 16px;
          padding: 6px 10px;
          color: var(--text-light-grey);
          background-color: var(--dark-grey);
          box-shadow: 0 0 0 1px var(--border-dark) inset;
        `;

      case 'secondary':
        return css`
          border-radius: 24px;
          padding: 8px 12px;
          color: var(--text-always-light-grey);
          background: var(--blue-gradient);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset;
        `;
    }
  }}
`;