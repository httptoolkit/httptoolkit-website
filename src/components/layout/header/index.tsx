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
import { Dropdown } from '@/components/modules/dropdown';
import type { DropdownOptionProps } from '@/components/modules/dropdown/dropdown.types';
import Logo from '@/images/logo.svg';
import { pageRoutes } from '@/lib/constants/routes';

// TODO: move to it's own component when working in the download feature
export const dropdownItems: DropdownOptionProps[] = [
  {
    content: 'for MacOS DMG',
  },
  {
    content: 'MacOS via Homebrew',
  },
  {
    content: 'Windows Installer',
  },
  {
    content: 'Windows Standalone Zip',
  },
  {
    content: 'Windows via Winget',
  },
  {
    content: 'Linux Debian package',
  },
  {
    content: 'Linux Arch Package via Aur',
  },
  {
    content: 'Linux Standalone Zip',
  },
];

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
        <MobileHeader navigationItems={navigationItems} dropdownItems={dropdownItems} />
        {isNavigationEnabled ? (
          <StyledNavigation>
            <StyledNavItems>
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
            <Dropdown $variant="secondary" $small items={dropdownItems} aria-label="Download Items">
              Download for macOS
            </Dropdown>
          </StyledNavigation>
        ) : null}
      </StyledHeaderContainer>
    </StyledHeader>
  );
};
