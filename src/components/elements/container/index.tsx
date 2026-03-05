import { StyledContainer } from './container.styles';
import type { ContainerProps } from './container.types';

export const Container = ({ children, as, $size = 'default', ...props }: ContainerProps) => {
  return (
    <StyledContainer as={as} data-size={$size !== 'default' ? $size : undefined} {...props}>
      {children}
    </StyledContainer>
  );
};
