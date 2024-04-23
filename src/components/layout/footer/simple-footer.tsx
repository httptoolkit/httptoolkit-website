import { FooterCopy } from './components/footer-copy';
import { StyledSeparator, StyledSimpleFooterWrapper, StyledSimpleFooter } from './footer.styles';

import { Container } from '@/components/elements/container';
import { Link } from '@/components/elements/link';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import LogoFooter from '@/images/logo-footer.svg';

export const SimpleFooter = () => {
  return (
    <StyledSimpleFooter>
      <Container>
        <StyledSimpleFooterWrapper>
          <Link aria-label="Http Toolkit homepage" href="/">
            <LogoFooter data-logo="true" />
          </Link>
          <ThemeToggle id="theme-toggle-footer-small" />
        </StyledSimpleFooterWrapper>
        <StyledSeparator $isSimple />
        <FooterCopy />
      </Container>
    </StyledSimpleFooter>
  );
};
