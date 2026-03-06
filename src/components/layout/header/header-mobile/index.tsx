import { styled } from '@linaria/react';

import { MobileDrawerMenu } from './mobile-drawer-menu';

import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { DownloadButton } from '@/components/modules/download-button';
import { screens } from '@/styles/tokens';

const StyledMobileWrapper = styled.div`
  display: block;
  text-align: center;

  @media (min-width: ${screens['lg']}) {
    display: none;
  }
`;

const StyledNavMobileItems = styled.nav`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  text-transform: uppercase;
  margin-top: 15px;

  @media (min-width: ${screens.md}) {
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
  }
`;

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
        <DownloadButton small variant="secondary" isInHeader={true} />
      </MobileDrawerMenu>
    </StyledMobileWrapper>
  );
};
