import { Suspense } from 'react';

import { styled } from '@linaria/react';

import { MobileHeader } from './header-mobile';

import { Container } from '@/components/elements/container';
import { HalfColoredLogo } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { DownloadButton } from '@/components/modules/download-button';
import { pageRoutes } from '@/lib/constants/routes';
import { screens } from '@/styles/tokens';

const StyledHeader = styled.header`
  position: relative;
  border-bottom: 1px solid var(--button-border);
`;

const StyledHeaderContainer = styled(Container)`
  &&& {
    display: flex;
    align-items: center;
    padding-top: 22px;
    padding-bottom: 22px;
    gap: 56px;
    max-height: 70px;

    justify-content: space-between;
  }
`;

const StyledNavItems = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 48px;

  @media (min-width: ${screens['lg']}) {
    display: flex;
  }

  & a:focus {
    span {
      transition: color ease-in 200ms;
      color: var(--cinnabar-red);
    }
  }

  @media (hover: hover) {
    & a:hover {
      span {
        transition: color ease-in 200ms;
        color: var(--cinnabar-red);
      }
    }
  }
`;

const StyledNavigation = styled.div`
  width: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${screens['lg']}) {
    display: flex;
  }
`;

interface HeaderProps {
  isNavigationEnabled?: boolean;
}

export const Header = ({ isNavigationEnabled = true }: HeaderProps) => {
  const { PRICING, DOCS, BLOG, INTEGRATION, CONTACT } = pageRoutes;
  const navigationItems = [PRICING, DOCS, BLOG, INTEGRATION, CONTACT];

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <Link href="/" aria-label="Http Toolkit homepage">
          <HalfColoredLogo height={26} />
        </Link>
        <MobileHeader navigationItems={navigationItems} />
        {isNavigationEnabled ? (
          <StyledNavigation>
            <StyledNavItems aria-label="Global">
              {navigationItems.map(navItem => {
                const shouldDisablePreFetch = [BLOG.label, DOCS.label, PRICING.label].includes(navItem.label)
                  ? false
                  : undefined;
                return (
                  <Link key={`${navItem.label}-${navItem.href}`} prefetch={shouldDisablePreFetch} href={navItem.href}>
                    <Text as="span" fontSize="m">
                      {navItem.label}
                    </Text>
                  </Link>
                );
              })}
            </StyledNavItems>
            <Suspense>
              <DownloadButton $small $variant="secondary" />
            </Suspense>
          </StyledNavigation>
        ) : null}
      </StyledHeaderContainer>
    </StyledHeader>
  );
};
