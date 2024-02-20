import { forwardRef } from 'react';

import { StyledContainer } from './container.styles';

export const Container = forwardRef<HTMLDivElement, Component>((props, ref) => {
  const { children, className } = props;
  return (
    <StyledContainer {...ref} className={className}>
      {children}
    </StyledContainer>
  );
});

Container.displayName = 'Container';
