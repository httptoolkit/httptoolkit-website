'use client';

import type { StyledSquareIconProps } from './square-icon.types';
import { SquareIconSizes } from './square-icon.types';

import { css, styled } from '@/styles';

export const StyledSquareIcon = styled.div<StyledSquareIconProps>`
  display: flex;
  width: fit-content;
  border-radius: 12px;
  padding: 11px;
  border: 1px solid var(--button-border);
  width: ${({ $size }) => SquareIconSizes[$size || 'medium']}px;
  height: ${({ $size }) => SquareIconSizes[$size || 'medium']}px;

  ${({ $variant, $size }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background-color: var(--ink-black);

          box-shadow:
            0px 2px 0px 0px rgba(0, 0, 0, 0.05) inset,
            0px 0px 11px 0px rgba(0, 0, 0, 0.05);

          & svg {
            color: var(--electric-blue);
            box-shadow:
              0px 2.4 1.2 0px rgba(201, 212, 251, 0.1) inset,
              0px -1.2 1.2 0px rgba(16, 46, 151, 0.1) inset,
              0px 2.4 1.2 0px rgba(201, 212, 251, 0.1) inset,
              0px -1.2 1.2 0px rgba(16, 46, 151, 0.1) inset;
          }

          ${() =>
            $size === 'large' &&
            `
              border-width: 1.13px;
              border-radius: 16px;
              align-items: center;
              justify-content: center;
            `}
        `;

      case 'secondary':
        return css`
          background-color: var(--ink-grey);

          & svg {
            color: var(--light-grey);
          }
        `;

      case 'darker-secondary':
        return css`
          background-color: var(--ink-black);

          & svg {
            color: var(--light-grey);
          }
        `;

      case 'tertiary':
        return css`
          color: var(--white)
          border-radius: 8px;
          padding: 12px;
          background-color: var(--dark-grey);
          box-shadow: 0px 0px 24px 0px #8082891a inset;
        `;

      case 'tertiary-bigger':
        return css`
          color: var(--white)
          border-radius: 8px;
          padding: 15px;
          background-color: var(--dark-grey);
          box-shadow: 0px 0px 24px 0px #8082891a inset;
        `;
    }
  }}
`;