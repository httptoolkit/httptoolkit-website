import React from 'react';

import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export interface StyledStackProps {
  $direction?: 'row' | 'row-reverse' | 'column' | ' column-reverse';
  $alignItems?: 'center' | 'self-start' | 'self-end' | 'normal';
  $gap?: string;
  $gapxl?: string;
}

export type StackProps = Component<StyledStackProps>;

const StyledStack = styled.div`
  display: flex;
  flex-direction: var(--stack-direction, column);
  align-items: var(--stack-align, initial);
  gap: var(--stack-gap, 16px);

  @media (min-width: ${screens.lg}) {
    gap: var(--stack-gapxl, 16px);
  }
`;

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
