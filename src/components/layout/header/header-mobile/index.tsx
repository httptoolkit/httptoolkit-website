import { StyledMobileWrapper, StyledNavMobileItems } from './header-mobile.styles';
import { MobileDrawerMenu } from './mobile-drawer-menu';

import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { DownloadButton } from '@/components/modules/download-button';

type NavigationItems = {
  href: string;
  label: string;
};

interface MobileHeaderProps {
  navigationItems: NavigationItems[];
}

export const MobileHeader = ({ navigationItems }: MobileHeaderProps) => {
  return (
    <StyledMobileWrapper>
      <MobileDrawerMenu>
        <StyledNavMobileItems>
          {navigationItems.map(navItem => {
            return (
              <Link key={`${navItem.label}-${navItem.href}`} href={navItem.href}>
                <Text as="label" fontSize="xll" fontWeight="bold" color="lightGrey">
                  {navItem.label}
                </Text>
              </Link>
            );
          })}
        </StyledNavMobileItems>
        <DownloadButton $small $variant="secondary" isInHeader={true} />
      </MobileDrawerMenu>
    </StyledMobileWrapper>
  );
};
