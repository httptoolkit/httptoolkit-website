import type { HeadingGroup } from '@/lib/mdx/utils/extract-titles';

export interface TableContentSubitem {
  text: string;
  href: string;
  level?: HeadingGroup['level'];
  subItems?: TableContentSubitem[];
}

export interface TableContentItem {
  text: string;
  href?: string;
  level?: HeadingGroup['level'];
  subItems?: TableContentSubitem[];
}

export interface TableContentProps {
  isCollapsible?: boolean;
  links: TableContentItem[];
}

export interface TableContentFixedProps {
  id?: string;
  link: TableContentProps['links'][0];
  hasSubItems: boolean;
}
