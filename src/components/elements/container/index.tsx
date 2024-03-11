import { StyledContainer } from './container.styles';
import type { ContainerProps } from './container.types';

export const Container = ({ children, className, as, $size = 'default' }: ContainerProps) => {
  return (
    <StyledContainer as={as} className={className} $size={$size}>
      {children}
    </StyledContainer>
  );
};
