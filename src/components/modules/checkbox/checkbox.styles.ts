'use client';

import type { InputProps } from './checkbox.types';

import { styled, fontSizes, fontWeight } from '@/styles';

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;
  width: 100%;
`;

export const StyledInput = styled.input<InputProps>`
  padding: 14px 14px;
  border: none;
  font-size: ${fontSizes.text.s};
  line-height: 150%;
  color: ${({ $hasError }) => ($hasError ? 'var(--text-cinnabar-red)' : 'var(--text-light-grey)')};
  outline: 0;
  height: 20px;
  width: 20px;
  resize: none;
  border-radius: 6px;
  background-color: var(--ink-grey);
  accent-color: var(--electric-light-blue);
  &:focus {
    background-color: var(--ink-black);
  }
`;

export const STyledLabel = styled.label`
  font-size: ${fontSizes.text.m};
  font-weight: ${fontWeight.bold};
  color: var(--text-dark-grey);
  text-align: left;
`;