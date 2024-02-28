import React from 'react';

import { StyledStack } from './stack.styles';
import type { StackProps } from './stack.types';

const Stack = ({ $gap, $gapxl, $direction, children }: StackProps) => {
  return (
    <StyledStack $gap={$gap} $gapxl={$gapxl} $direction={$direction}>
      {children}
    </StyledStack>
  );
};

export default Stack;
