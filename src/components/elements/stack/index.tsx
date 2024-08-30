import React from 'react';

import { StyledStack } from './stack.styles';
import type { StackProps } from './stack.types';

const Stack = ({ $gap, $gapxl, $direction, $alignItems, children }: StackProps) => {
  return (
    <StyledStack $gap={$gap} $gapxl={$gapxl} $alignItems={$alignItems} $direction={$direction}>
      {children}
    </StyledStack>
  );
};

export default Stack;
