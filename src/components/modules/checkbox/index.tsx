import { forwardRef } from 'react';

import { STyledLabel, StyledInput, StyledInputWrapper } from './checkbox.styles';
import type { InputProps } from './checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(({ id, label, $hasError, ...props }, ref) => {
  return (
    <StyledInputWrapper>
      <StyledInput id={id} name={id} ref={ref} type="checkbox" data-has-error={$hasError ? "true" : undefined} {...props} />
      <STyledLabel htmlFor={id}>{label}</STyledLabel>
    </StyledInputWrapper>
  );
});

Checkbox.displayName = 'Checkbox';
