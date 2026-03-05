import React from 'react';

import { StyledStack } from './stack.styles';
import type { StackProps } from './stack.types';

const Stack = ({ $gap, $gapxl, $direction, $alignItems, children }: StackProps) => {
  return (
    <StyledStack
      data-stack
      style={{
        '--stack-direction': $direction,
        '--stack-align': $alignItems,
        '--stack-gap': $gap,
        '--stack-gapxl': $gapxl,
      } as React.CSSProperties}
    >
      {children}
    </StyledStack>
  );
};

export default Stack;
