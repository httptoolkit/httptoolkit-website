import { FooterCopy } from './components/footer-copy';
import { StyledSeparator, StyledFooter, StyledSimpleFooterWrapper } from './footer.styles';

import { Container } from '@/components/elements/container';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import LogoFooter from '@/images/logo-footer.svg';

export const SimpleFooter = () => {
  return (
    <StyledFooter>
      <Container>
        <StyledSimpleFooterWrapper>
          <LogoFooter />
          <ThemeToggle id="theme-toggle-footer-small" />
        </StyledSimpleFooterWrapper>
        <StyledSeparator />
        <FooterCopy />
      </Container>
    </StyledFooter>
  );
};
