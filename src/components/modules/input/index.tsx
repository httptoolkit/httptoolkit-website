import { forwardRef } from 'react';

import { STyledLabel, StyledInput, StyledInputBorder, StyledInputWrapper, StyledSearchButton } from './input.styles';
import type { InputProps } from './input.types';

import { MagnifyingGlass } from '@/components/elements/icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ as = 'input', errorMessage, $hasError = false, onClickSearch, id, label, ...props }, ref) => {
    return (
      <StyledInputWrapper>
        <Stack $gapxl="8px">
          {label && <STyledLabel htmlFor={id}>{label}</STyledLabel>}
          <StyledInputBorder $hasError={$hasError} $styledAs={as}>
            <StyledInput id={id} name={id} ref={ref} $type={props.type} $hasError={$hasError} as={as} {...props} />
            {props.type === 'search' && (
              <StyledSearchButton title="Click to search" onClick={onClickSearch}>
                <MagnifyingGlass weight="fill" size={16} />
              </StyledSearchButton>
            )}
          </StyledInputBorder>
        </Stack>
        {errorMessage && (
          <Text fontSize="s" color="cinnabarRed">
            {errorMessage}
          </Text>
        )}
      </StyledInputWrapper>
    );
  },
);

Input.displayName = 'Input';
