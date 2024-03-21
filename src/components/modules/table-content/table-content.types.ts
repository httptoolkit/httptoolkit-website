interface TableContentSubitem {
  text: string;
  href: string;
}

export interface TableContentItem {
  text: string;
  href?: string;
  subItems?: TableContentSubitem[];
}

export interface TableContentProps {
  isCollapsible?: boolean;
  links: TableContentItem[];
}

export interface TableContentFixedProps {
  link: TableContentProps['links'][0];
  hasSubItems: boolean;
}
