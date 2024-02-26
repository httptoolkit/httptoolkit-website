import { StyledMobileWrapper, StyledNavMobileItems } from './header-mobile.styles';
import { MobileDrawerMenu } from './mobile-drawer-menu';

import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { Dropdown } from '@/components/modules/dropdown';
import type { DropdownOptionProps } from '@/components/modules/dropdown/dropdown.types';

type NavigationItems = {
  href: string;
  label: string;
};

interface MobileHeaderProps {
  navigationItems: NavigationItems[];
  dropdownItems: DropdownOptionProps[];
}

export const MobileHeader = ({ navigationItems, dropdownItems }: MobileHeaderProps) => {
  return (
    <StyledMobileWrapper>
      <MobileDrawerMenu>
        <StyledNavMobileItems>
          {navigationItems.map(navItem => {
            return (
              <Link key={`${navItem.label}-${navItem.href}`} href={navItem.href}>
                <Text as="label" fontSize="xl" fontWeight="bold">
                  {navItem.label}
                </Text>
              </Link>
            );
          })}
        </StyledNavMobileItems>
        <Dropdown items={dropdownItems} aria-label="Download Items" $variant="secondary" $small $direction="top">
          Download for macOS
        </Dropdown>
      </MobileDrawerMenu>
    </StyledMobileWrapper>
  );
};
