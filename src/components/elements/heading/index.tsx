import { forwardRef } from 'react';

import { StyledHeading } from './heading.styles';
import type { HeadingProps } from './heading.types';

export const Heading = forwardRef<HTMLDivElement, Component<HeadingProps>>((props, ref) => {
  const { children, className, as = 'h1', fontSize = 'xl', fontWeight, color } = props;

  return (
    <StyledHeading {...ref} as={as} fontSize={fontSize} color={color} fontWeight={fontWeight} className={className}>
      {children}
    </StyledHeading>
  );
});

Heading.displayName = 'Heading';
