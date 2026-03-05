import { styled } from '@linaria/react';

import { OpenSourcePledge } from '@/components/elements/icon/custom';
import { FooterColumnBlock } from './components/footer-column-block';
import { FooterCopy } from './components/footer-copy';

import { Container } from '@/components/elements/container';
import { Github, HalfColoredLogo, TwitterX, Bluesky, Mastodon } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';
import { SquareIcon } from '@/components/elements/square-icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import { Newsletter } from '@/components/modules/newsletter';
import { footerColumns } from '@/content/data/footer-columns';
import { screens } from '@/styles/tokens';

export const StyledFooter = styled.footer`
  margin-top: 32px;

  @media (min-width: ${screens.lg}) {
    margin-top: 96px;
  }
`;

export const StyledSimpleFooter = styled.footer`
  margin-top: 0;
`;

const StyledContainer = styled(Container)`
  &&& {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    gap: 24px;

    @media (min-width: ${screens.md}) {
      flex-direction: row;
      gap: 40px;
    }

    @media (min-width: ${screens.lg}) {
      flex-direction: row;
    }
  }
`;

const StyledColumn = styled.div`
  &:first-child {
    display: flex;
    flex-direction: column;
    min-width: min-content;
    gap: 16px;

    @media (min-width: ${screens.xl}) {
      flex-direction: column;
      min-width: 398px;
      gap: 57px;
    }
  }

  &:last-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (min-width: ${screens.md}) {
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }

    @media (min-width: ${screens.lg}) {
      grid-template-columns: repeat(4, 1fr);
      gap: 50px;
    }

    @media (min-width: ${screens['2xl']}) {
      grid-template-columns: repeat(4, 1fr);
      gap: 91px;
    }

    & div {
      @media (min-width: ${screens.md}) {
        min-width: max-content;
      }

      &:nth-of-type(1) {
        order: 2;

        @media (min-width: ${screens.lg}) {
          order: 1;
        }
      }

      &:nth-of-type(2) {
        order: 3;

        @media (min-width: ${screens.lg}) {
          order: 2;
        }
      }

      &:nth-of-type(3) {
        order: 2;

        @media (min-width: ${screens.lg}) {
          order: 3;
        }
      }

      &:nth-of-type(4) {
        order: 1;

        @media (min-width: ${screens.lg}) {
          order: 4;
        }
      }
    }
  }
`;

export const StyledMenuWrapper = styled.div`
  flex-direction: column;
  gap: 22px;

  @media (max-width: ${screens.lg}) {
    display: none;

    &[data-display-on-mobile="true"] {
      display: flex;
    }
  }

  @media (min-width: ${screens.lg}) {
    display: none;
    gap: var(--menu-gapxl, 21px);

    &[data-display-on-desktop="true"] {
      display: flex;
    }
  }
`;

export const StyledMenuItems = styled.ul`
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${screens.lg}) {
    display: none;

    &[data-display-on-mobile="true"] {
      display: flex;
    }
  }

  @media (min-width: ${screens.lg}) {
    display: none;
    gap: 24px;

    &[data-display-on-desktop="true"] {
      display: flex;
    }
  }

  @media (min-width: ${screens.md}) {
    & a:focus {
      transition: color ease-in 200ms;
      color: var(--cinnabar-red);
    }

    @media (hover: hover) {
      & a:hover {
        transition: color ease-in 200ms;
        color: var(--cinnabar-red);
      }
    }
  }
`;

export const StyledSeparator = styled.hr`
  border-color: var(--dark-grey);
  margin: 24px 0;

  @media (min-width: ${screens.xl}) {
    margin: 48px 0;
  }

  &[data-is-simple="true"] {
    margin: 16px 0;

    @media (min-width: ${screens.xl}) {
      margin: 32px 0;
    }
  }
`;

export const StyledFooterCopySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;

  @media (min-width: ${screens.xl}) {
    flex-direction: row;
  }
`;

export const StyledSimpleFooterWrapper = styled(StyledFooterCopySection)`
  &&& {
    gap: 32px;
    position: relative;

    & svg[data-logo='true'] {
      width: fit-content;
      height: 26px;
    }
  }
`;

const StyledIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: end;
  gap: 25px;

  @media (min-width: ${screens.md}) {
    flex-direction: column;
    align-items: start;
    gap: 57px;
  }
`;

export interface FooterProps {
  withoutNewsletter?: boolean;
}

export const Footer = ({ withoutNewsletter }: FooterProps) => {
  return (
    <StyledFooter>
      {!withoutNewsletter && (
        <Container>
          <Newsletter
            title="Keep yourself up to date"
            text="There's a lot of new HTTP Toolkit features coming soon, like full scripting support, gRPC & GraphQL integration, and request diffing tools."
            supportText="Want to hear about the latest new HTTP Toolkit features as soon as they land? Sign up for updates:"
          />
        </Container>
      )}
      <StyledContainer>
        <StyledColumn>
          <Link href="/" aria-label="HTTP Toolkit homepage">
            <HalfColoredLogo width="170px" />
          </Link>
          <StyledIconsWrapper>
            <Stack>
              <Text as="label" fontSize="m" fontWeight="bold">
                FOLLOW US
              </Text>
              <Stack $direction="row">
                <Link href="https://github.com/httptoolkit" title="Github" aria-label="Github">
                  <SquareIcon $size="small" icon={Github} />
                </Link>
                <Link href="https://bsky.app/profile/httptoolkit.com" title="Bluesky" aria-label="Bluesky">
                  <SquareIcon $size="small" icon={Bluesky} />
                </Link>
                <Link href="https://mastodon.social/@httptoolkit" title="Mastodon" aria-label="Mastodon">
                  <SquareIcon $size="small" icon={Mastodon} />
                </Link>
                <Link href="https://twitter.com/httptoolkit" title="Twitter" aria-label="Twitter">
                  <SquareIcon $size="small" icon={TwitterX} />
                </Link>
              </Stack>
            </Stack>
            <Stack $direction="row">
              <Link href="https://opensourcepledge.com/">
                <OpenSourcePledge fill="#f00" width="120px" alt="Open Source Pledge member" />
              </Link>
            </Stack>
            <ThemeToggle id="themetogglefooter" />
          </StyledIconsWrapper>
        </StyledColumn>
        <StyledColumn as="nav" aria-label="Httptoolkit directory" role="navigation">
          {footerColumns.map(column => {
            const hasSubHeading = !!column.subHeading;
            const displayOnMobile = !!column.displayOn?.includes('mobile');
            const displayOnDesktop = !!column.displayOn?.includes('desktop');
            return (
              <StyledMenuWrapper
                data-display-on-mobile={String(displayOnMobile)}
                data-display-on-desktop={String(displayOnDesktop)}
                style={{ '--menu-gapxl': hasSubHeading ? '64px' : '21px' } as React.CSSProperties}
                key={column.title}
              >
                <FooterColumnBlock column={column} />
                {column.subHeading?.map((subheading, idx) => (
                  <FooterColumnBlock key={`${subheading.title}-${idx}`} column={subheading} />
                ))}
              </StyledMenuWrapper>
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
