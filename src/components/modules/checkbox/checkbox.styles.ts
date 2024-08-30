'use client';

import type { InputProps } from './checkbox.types';

import { styled } from '@/styles';

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
  font-size: ${({ theme }) => theme.fontSizes.text.s};
  line-height: 150%;
  color: ${({ theme, $hasError }) => ($hasError ? theme.colors.text.cinnarbarRed : theme.colors.text.lightGrey)};
  outline: 0;
  height: 20px;
  width: 20px;
  resize: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.inkGrey};
  accent-color: ${({ theme }) => theme.colors.electricLightBlue};
  &:focus {
    background-color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

export const STyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.darkGrey};
  text-align: left;
`;
