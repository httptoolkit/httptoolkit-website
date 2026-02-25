'use client';

import type { InputBorderProps, InputProps } from './input.types';

import { styled, fontSizes, fontWeight } from '@/styles';

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

  background: var(--border-gradient);

  @media (hover: hover) {
    &:hover {
      ${({ $hasError }) => !$hasError && `background: var(--blue-gradient);`}
    }
  }

  ${({ $hasError }) =>
    $hasError &&
    `
      background: var(--orange-gradient);
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
  color: var(--text-always-white);
`;

export const StyledInput = styled.input<InputProps>`
  padding: 14px 14px;
  border: none;
  font-size: ${fontSizes.text.s};
  line-height: 150%;
  color: ${({ $hasError }) => ($hasError ? 'var(--text-cinnabar-red)' : 'var(--text-light-grey)')};
  outline: 0;
  width: 100%;
  height: ${({ as }) => (as === 'textarea' ? '100%' : '46px')};
  resize: none;

  border-radius: 6px;
  background-color: ${({ $hasError, $type }) =>
    $type === 'search' ? 'var(--dark-grey)' : $hasError ? 'var(--ink-black)' : 'var(--ink-grey)'};

  box-shadow:
    0px 1.5px 4px -1px rgba(10, 9, 11, 0.07),
    0px 3px 1px 0px rgba(24, 25, 28, 0.5) inset;

  &::placeholder {
    color: ${({ $hasError }) => ($hasError ? 'var(--text-cinnabar-red)' : 'var(--text-dark-grey)')};
  }

  &:focus {
    background-color: var(--ink-black);
  }
`;

export const STyledLabel = styled.label`
  font-weight: ${fontWeight.bold};
  color: var(--text-dark-grey);
`;