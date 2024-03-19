import { MobileHeader } from './header-mobile';
import {
  StyledHeaderContainer,
  StyledHeader,
  StyledLogoWrapper,
  StyledNavItems,
  StyledNavigation,
} from './header.styles';
import type { HeaderProps } from './header.types';

import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { DownloadButton } from '@/components/modules/download-button';
import Logo from '@/images/logo.svg';
import { pageRoutes } from '@/lib/constants/routes';

export const Header = ({ isNavigationEnabled = true }: HeaderProps) => {
  const { PRICING, DOCS, BLOG, CONTACT, INTEGRATION } = pageRoutes;
  const navigationItems = [PRICING, DOCS, BLOG, CONTACT, INTEGRATION];

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledLogoWrapper>
          <Link href="/" aria-label="Http Toolkit homepage">
            <Logo />
          </Link>
        </StyledLogoWrapper>
        <MobileHeader navigationItems={navigationItems} />
        {isNavigationEnabled ? (
          <StyledNavigation>
            <StyledNavItems aria-label="Global">
              {navigationItems.map(navItem => {
                return (
                  <Link key={`${navItem.label}-${navItem.href}`} href={navItem.href}>
                    <Text as="span" fontSize="m">
                      {navItem.label}
                    </Text>
                  </Link>
                );
              })}
            </StyledNavItems>
            <DownloadButton $small $variant="secondary" />
          </StyledNavigation>
        ) : null}
      </StyledHeaderContainer>
    </StyledHeader>
  );
};
