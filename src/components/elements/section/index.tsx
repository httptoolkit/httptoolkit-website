import { StyledSection } from './section.styles';

export const Section = ({ children, className }: Component) => {
  return <StyledSection className={className}>{children}</StyledSection>;
};
