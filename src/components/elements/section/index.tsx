import { StyledSection } from './container.styles';

export const Section = ({ children, className }: Component) => {
  return <StyledSection className={className}>{children}</StyledSection>;
};
