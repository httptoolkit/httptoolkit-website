import { StyledContainer } from './container.styles';

export const Container = ({ children, className, as }: Component<{ as?: string }>) => {
  return (
    <StyledContainer as={as} className={className}>
      {children}
    </StyledContainer>
  );
};
