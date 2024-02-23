'use client';

import Link from 'next/link';

import type { ButtonProps } from './button.types';

import { css, styled } from '@/styles';
import { adjustOpacity } from '@/styles/helpers/adjust-opacity';
import { getGradientValues } from '@/styles/helpers/get-gradient-values';

const base = css<ButtonProps<'button'>>`
  position: relative;
  z-index: 1;
  display: flex;
  width: fit-content;
  outline: none;

  font-size: ${({ theme, small }) => theme.fontSizes.button[small ? 'small' : 'default']};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-decoration: none;
  line-height: 1;

  padding: ${({ small }) => (small ? '14px 24px' : '18px 24px')};

  border-radius: 12px;
  gap: 8px;
  align-items: center;

  ${props => {
    switch (props.variant) {
      case 'primary':
        const gradientValues = getGradientValues(props.theme.colors.orangeGradient);

        return css`
          color: ${({ theme }) => theme.colors.text.alwayWhite};
          background: linear-gradient(345.32deg, ${gradientValues[0]} 10.67%, ${gradientValues[1]} 89.91%);

          border: 1px solid ${({ theme }) => theme.colors.cinnarbarRed};

          box-shadow:
            0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset,
            0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset;

          ${props.withBorder &&
          `
            box-shadow: 0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset, 0px 4px 24px 0px rgba(245, 109, 79, 0.15), 0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset;
          `}

          &:hover {
            ${() =>
              !props.withBorder &&
              `
              border: 1px solid ${props.theme.colors.text.white};
            `}
          }

          &:focus {
            ${() =>
              props.withBorder
                ? `
              box-shadow: 0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset,0px 4px 24px 0px rgba(245, 109, 79, 0.15), 0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset;                
            `
                : `
              box-shadow:
                0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset,
                0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset,
                0px 0px 0px 8px rgba(50, 52, 59, 0.6);
            `}
          }

          &:active {
            background: linear-gradient(345.32deg, #a32d13 10.67%, #dc3814 89.91%);
            box-shadow:
              0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset,
              0px 4px 24px 0px rgba(245, 109, 79, 0.15),
              0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset;
          }
        `;
      case 'secondary':
        return css`
          color: ${({ theme }) => theme.colors.text.lightGrey};
          background-color: ${({ theme }) => theme.colors.inkBlack};

          border: 1px solid ${({ theme }) => adjustOpacity(theme.colors.white, 0.12)};

          box-shadow: 0px 0px 8px 0px rgba(230, 232, 242, 0.05);

          &:hover {
            ${() =>
              !props.isDropdown &&
              `
              border: 1px solid ${props.theme.colors.text.lightGrey};
              `}
          }

          &:focus {
            ${() =>
              !props.isDropdown &&
              `
              border: 1px solid ${props.theme.colors.text.lightGrey};
              box-shadow:
              0px 0px 8px 0px rgba(230, 232, 242, 0.05),
              0px 0px 0px 8px rgba(50, 52, 59, 0.6);
              `}
          }

          &:active {
            background-color: ${({ theme }) => theme.colors.darkGrey};
            ${() =>
              !props.isDropdown &&
              `
            border: 1px solid ${props.theme.colors.text.lightGrey};
            `}
          }
        `;
    }
  }}
`;

export const StyledLink = styled(Link)<ButtonProps<'button'>>`
  ${base}
`;

export const StyledButton = styled.button<ButtonProps<'button'>>`
  ${base}
`;

export const StyledButtonWrapper = styled.div`
  position: relative;
  width: fit-content;
  overflow: hidden;

  padding: 8px;
  border-radius: 20px;
  box-shadow: inset 0px 0px 0px 10px ${({ theme }) => theme.colors.mediumGrey};
  border: 1px solid ${({ theme }) => adjustOpacity(theme.colors.white, 0.12)};

  &:hover,
  &:focus-within,
  &:active {
    border: 1px solid transparent;

    & .animated-border {
      width: 300vw;
      height: 300vh;
    }
  }

  &::after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.colors.mediumGrey};
    top: 1px;
    right: 1px;
    margin: auto;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border-radius: 20px;
  }
`;
