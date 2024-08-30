import { StyledContainer } from './container.styles';
import type { ContainerProps } from './container.types';

export const Container = ({ children, as, $size = 'default', ...props }: ContainerProps) => {
  return (
    <StyledContainer as={as} $size={$size || 'default'} {...props}>
      {children}
    </StyledContainer>
  );
};
