import { forwardRef } from 'react';

import { StyledInput, StyledInputBorder, StyledInputWrapper, StyledSearchButton } from './input.styles';
import type { InputProps } from './input.types';

import { MagnifyingGlass } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ as = 'input', errorMessage, $hasError = false, onClickSearch, ...props }, ref) => {
    return (
      <StyledInputWrapper>
        <StyledInputBorder $hasError={$hasError} $styledAs={as}>
          <StyledInput ref={ref} $hasError={$hasError} as={as} {...props} />
          {props.type === 'search' && (
            <StyledSearchButton title="Click to search" onClick={onClickSearch}>
              <MagnifyingGlass weight="fill" size={16} />
            </StyledSearchButton>
          )}
        </StyledInputBorder>
        {errorMessage && (
          <Text fontSize="s" color="cinnarbarRed">
            {errorMessage}
          </Text>
        )}
      </StyledInputWrapper>
    );
  },
);

Input.displayName = 'Input';
