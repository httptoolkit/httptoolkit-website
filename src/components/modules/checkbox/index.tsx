import { forwardRef } from 'react';
import type { AriaAttributes, InputHTMLAttributes } from 'react';

import { styled } from '@linaria/react';
import { fontSizes, fontWeight } from '@/styles/tokens';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, AriaAttributes {
  id: string;
  as?: 'input' | 'textarea';
  errorMessage?: string;
  hasError?: boolean;
  onClickSearch?: () => void;
  label?: string;
  type?: string;
}

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 14px 14px;
  border: none;
  font-size: ${fontSizes.text.s};
  line-height: 150%;
  color: var(--text-light-grey);
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

  &[data-has-error="true"] {
    color: var(--text-cinnabar-red);
  }
`;

const STyledLabel = styled.label`
  font-size: ${fontSizes.text.m};
  font-weight: ${fontWeight.bold};
  color: var(--text-dark-grey);
  text-align: left;
`;

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(({ id, label, hasError, ...props }, ref) => {
  return (
    <StyledInputWrapper>
      <StyledInput id={id} name={id} ref={ref} type="checkbox" data-has-error={hasError ? "true" : undefined} {...props} />
      <STyledLabel htmlFor={id}>{label}</STyledLabel>
    </StyledInputWrapper>
  );
});

Checkbox.displayName = 'Checkbox';
