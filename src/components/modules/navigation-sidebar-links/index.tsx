import {
  StyledNavigationSidebarLinksContentItem,
  StyledNavigationSidebarLinksContentLink,
  StyledNavigationSidebarLinksContentTitle,
  StyledNavigationSidebarLinksContentWrapper,
  StyledNavigationSidebarLinksTitle,
  StyledNavigationSidebarLinksWrapper,
} from './navigation-sidebar-links.styles';
import type { NavigationSidebarLinkItem, NavigationSidebarLinksProps } from './navigation-sidebar-links.types';

import { Link } from '@/components/elements/link';

const ItemTitleComponent = ({ text, href }: NavigationSidebarLinkItem) => {
  if (href) {
    return <Link href={href}>{text}</Link>;
  }

  return text;
};

export const NavigationSidebarLinks = ({ title, links }: NavigationSidebarLinksProps) => {
  return (
    <StyledNavigationSidebarLinksWrapper>
      <StyledNavigationSidebarLinksTitle forwardedAs="p" fontSize="xs" fontWeight="medium" color="white">
        {title}
      </StyledNavigationSidebarLinksTitle>
      <StyledNavigationSidebarLinksContentWrapper>
        {Array.isArray(links) &&
          links?.length > 0 &&
          links.map((link, index) => (
            <StyledNavigationSidebarLinksContentItem key={index}>
              <StyledNavigationSidebarLinksContentTitle fontSize="m" color="white">
                <ItemTitleComponent {...link} />
              </StyledNavigationSidebarLinksContentTitle>
              {Array.isArray(link.subItems) &&
                link.subItems?.length > 0 &&
                link.subItems.map(link => (
                  <StyledNavigationSidebarLinksContentLink key={link.href} href={link.href}>
                    {link.text}
                  </StyledNavigationSidebarLinksContentLink>
                ))}
            </StyledNavigationSidebarLinksContentItem>
          ))}
      </StyledNavigationSidebarLinksContentWrapper>
    </StyledNavigationSidebarLinksWrapper>
  );
};
