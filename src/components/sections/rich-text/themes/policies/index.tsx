import {
  StyledPoliciesHeading,
  StyledPoliciesSectionBreak,
  StyledPoliciesText,
  StyledPoliciesUL,
} from './policies.styles';
import { defaultComponents } from '../default';

const Heading2 = ({ children, id }: Component) => {
  return (
    <StyledPoliciesHeading forwardedAs="h2" fontSize="m" color="lightGrey" id={id}>
      {children}
    </StyledPoliciesHeading>
  );
};

const Heading3 = ({ children, id }: Component) => {
  return (
    <StyledPoliciesHeading forwardedAs="h3" fontSize="s" color="lightGrey" id={id}>
      {children}
    </StyledPoliciesHeading>
  );
};

export const policiesComponents = {
  ...defaultComponents,
  Heading2,
  Heading3,
  h2: Heading2,
  h3: Heading3,
  p({ children }: Component) {
    return (
      <StyledPoliciesText fontSize="m" color="darkGrey">
        {children}
      </StyledPoliciesText>
    );
  },
  Spacer() {
    return <StyledPoliciesSectionBreak />;
  },
  ul({ children }: Component) {
    return <StyledPoliciesUL>{children}</StyledPoliciesUL>;
  },
};
