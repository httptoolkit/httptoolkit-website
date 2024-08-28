import { FooterCopy } from './components/footer-copy';
import { StyledSeparator, StyledSimpleFooterWrapper, StyledSimpleFooter } from './footer.styles';

import { Container } from '@/components/elements/container';
import { HalfColoredLogo } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';
import { ThemeToggle } from '@/components/elements/theme-toggle';

export const SimpleFooter = () => {
  return (
    <StyledSimpleFooter>
      <Container>
        <StyledSimpleFooterWrapper>
          <Link aria-label="HTTP Toolkit homepage" href="/">
            <HalfColoredLogo data-logo="true" />
          </Link>
          <ThemeToggle id="theme-toggle-footer-small" />
        </StyledSimpleFooterWrapper>
        <StyledSeparator $isSimple />
        <FooterCopy />
      </Container>
    </StyledSimpleFooter>
  );
};
