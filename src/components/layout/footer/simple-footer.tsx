import { FooterCopy } from './components/footer-copy';
import { StyledSeparator, StyledSimpleFooterWrapper, StyledSimpleFooter } from './footer.styles';

import { Container } from '@/components/elements/container';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import LogoFooter from '@/images/logo-footer.svg';

export const SimpleFooter = () => {
  return (
    <StyledSimpleFooter>
      <Container>
        <StyledSimpleFooterWrapper>
          <LogoFooter />
          <ThemeToggle id="theme-toggle-footer-small" />
        </StyledSimpleFooterWrapper>
        <StyledSeparator $isSimple />
        <FooterCopy />
      </Container>
    </StyledSimpleFooter>
  );
};
