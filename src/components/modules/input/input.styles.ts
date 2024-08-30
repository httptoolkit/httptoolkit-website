'use client';

import type { InputBorderProps, InputProps } from './input.types';

import { styled } from '@/styles';

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const StyledInputBorder = styled.span<InputBorderProps>`
  width: 100%;
  display: inline-block;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  padding: 1px;
  height: ${({ $styledAs }) => ($styledAs === 'textarea' ? '124px' : 'auto')};

  background: ${({ theme }) => theme.colors.borderGradient};

  @media (hover: hover) {
    &:hover {
      ${({ theme, $hasError }) => !$hasError && `background: ${theme.colors.blueGradient};`}
    }
  }

  ${({ $hasError, theme }) =>
    $hasError &&
    `
      background: ${theme.colors.orangeGradient};
    `}
`;

export const StyledSearchButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 12px;
  margin: auto;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.alwayWhite};
`;

export const StyledInput = styled.input<InputProps>`
  padding: 14px 14px;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.text.s};
  line-height: 150%;
  color: ${({ theme, $hasError }) => ($hasError ? theme.colors.text.cinnarbarRed : theme.colors.text.lightGrey)};
  outline: 0;
  width: 100%;
  height: ${({ as }) => (as === 'textarea' ? '100%' : '46px')};
  resize: none;

  border-radius: 6px;
  background-color: ${({ theme, $hasError, $type }) =>
    $type === 'search' ? theme.colors.darkGrey : $hasError ? theme.colors.inkBlack : theme.colors.inkGrey};

  box-shadow:
    0px 1.5px 4px -1px rgba(10, 9, 11, 0.07),
    0px 3px 1px 0px rgba(24, 25, 28, 0.5) inset;

  &::placeholder {
    color: ${({ theme, $hasError }) => ($hasError ? theme.colors.text.cinnarbarRed : theme.colors.text.darkGrey)};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

export const STyledLabel = styled.label`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.darkGrey};
`;
