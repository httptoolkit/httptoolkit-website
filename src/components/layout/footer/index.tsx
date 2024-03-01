import { FooterColumnBlock } from './components/footer-column-block';
import { FooterCopy } from './components/footer-copy';
import { StyledSeparator, StyledColumn, StyledContainer, StyledFooter, StyledIconsWrapper } from './footer.styles';

import { Container } from '@/components/elements/container';
import { Github, TwitterX } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';
import { SquareIcon } from '@/components/elements/square-icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import { footerColumns } from '@/content/data/footer-columns';
import LogoFooter from '@/images/logo-footer.svg';

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer>
        <StyledColumn>
          <Stack>
            <LogoFooter />
            <Text fontSize="m">
              There&apos;s a lot of new HTTP Toolkit features coming soon, like automated iOS interception, HTTP client
              tools, gRPC & GraphQL support, and request diffing.
            </Text>
          </Stack>
          <StyledIconsWrapper>
            <Stack>
              <Text as="label" fontSize="m" fontWeight="bold">
                FOLLOW US
              </Text>
              <Stack $direction="row">
                <Link href="https://github.com/httptoolkit" title="Github" aria-label="Github">
                  <SquareIcon $size="small" icon={Github} />
                </Link>
                <Link href="https://twitter.com/httptoolkit" title="Twitter" aria-label="Twitter">
                  <SquareIcon $size="small" icon={TwitterX} />
                </Link>
              </Stack>
            </Stack>
            <ThemeToggle id="themetogglefooter" />
          </StyledIconsWrapper>
        </StyledColumn>
        <StyledColumn as="nav" aria-label="Httptoolkit directory" role="navigation">
          {footerColumns.map(column => {
            const hasSubHeading = !!column.subHeading;
            return (
              <Stack key={column.title} $gapxl={hasSubHeading ? '64px' : '16px'}>
                <FooterColumnBlock column={column} />
                {column.subHeading && <FooterColumnBlock column={column.subHeading} />}
              </Stack>
            );
          })}
        </StyledColumn>
      </StyledContainer>
      <Container>
        <StyledSeparator />
        <FooterCopy />
      </Container>
    </StyledFooter>
  );
};
