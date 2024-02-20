import { StyledContainer } from './container.styles';

export const Container = ({ children, className }: Component) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};
