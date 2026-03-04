import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

const StyledSection = styled.section`
  position: relative;
  padding-top: 32px;
  padding-bottom: 32px;

  @media (min-width: ${screens['2xl']}) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;

export const Section = ({ children, className }: Component) => {
  return <StyledSection className={className}>{children}</StyledSection>;
};
