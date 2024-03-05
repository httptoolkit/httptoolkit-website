export interface NavigationSidebarLinkSubitem {
  text: string;
  href: string;
}

export interface NavigationSidebarLinkItem {
  text: string;
  href?: string;
  subitems?: NavigationSidebarLinkSubitem[];
}

export interface NavigationSidebarLinksProps {
  title: string;
  links: NavigationSidebarLinkItem[];
}
