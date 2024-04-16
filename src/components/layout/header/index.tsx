import { Suspense } from 'react';

import { MobileHeader } from './header-mobile';
import { StyledHeader, StyledHeaderContainer, StyledNavItems, StyledNavigation } from './header.styles';
import type { HeaderProps } from './header.types';

import { FullLogo } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { DownloadButton } from '@/components/modules/download-button';
import { pageRoutes } from '@/lib/constants/routes';

export const Header = ({ isNavigationEnabled = true }: HeaderProps) => {
  const { PRICING, DOCS, BLOG, CONTACT, INTEGRATION } = pageRoutes;
  const navigationItems = [PRICING, DOCS, BLOG, CONTACT, INTEGRATION];

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <Link href="/" aria-label="Http Toolkit homepage">
          <FullLogo height={26} />
        </Link>
        <MobileHeader navigationItems={navigationItems} />
        {isNavigationEnabled ? (
          <StyledNavigation>
            <StyledNavItems aria-label="Global">
              {navigationItems.map(navItem => {
                const shouldDisablePreFetch = [BLOG.label, DOCS.label].includes(navItem.label) ? false : undefined;
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
