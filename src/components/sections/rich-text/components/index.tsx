import { StyledBiggerText, StyledHeading, StyledLink, StyledText, StyledUL } from './default.styles';
import type { StyledHeadingProps } from './default.types';

import { Accordion } from '@/components/modules/accordion';
import type { AccordionProps } from '@/components/modules/accordion/accordion.types';
import { CTABox } from '@/components/modules/cta-box';
import type { CTABoxProps } from '@/components/modules/cta-box/cta-box.types';

const Heading2 = ({ children, id }: Component<StyledHeadingProps>) => {
  return (
    <StyledHeading $margin={48} forwardedAs="h2" fontSize="m" color="lightGrey" id={id}>
      {children}
    </StyledHeading>
  );
};

const Heading3to6 = ({ children, id }: Component<StyledHeadingProps>) => {
  return (
    <StyledHeading $margin={24} forwardedAs="h3" fontSize="s" color="lightGrey" id={id}>
      {children}
    </StyledHeading>
  );
};

// TODO: need to define the default styles
export const defaultComponents = {
  h2: Heading2,
  h3: Heading3to6,
  h4: Heading3to6,
  h5: Heading3to6,
  h6: Heading3to6,
  a({ children, href }: Component<{ href: string }>) {
    return <StyledLink href={href}>{children}</StyledLink>;
  },
  p({ children }: Component) {
    return (
      <StyledText fontSize="m" color="darkGrey">
        {children}
      </StyledText>
    );
  },
  BiggerText({ text }: Component<{ text: string }>) {
    return (
      <StyledBiggerText fontSize="l" fontWeight="bold" color="lightGrey">
        {text}
      </StyledBiggerText>
    );
  },
  Accordion(props: AccordionProps) {
    return <Accordion {...props} />;
  },
  CTABox(props: CTABoxProps) {
    return <CTABox {...props} />;
  },
  ul({ children }: Component) {
    return <StyledUL>{children}</StyledUL>;
  },
};
