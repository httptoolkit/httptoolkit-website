import { kebabCase } from 'lodash';

import type { HeadingGroupWithSubItems } from './group-by-level';

import type { ContentWithTableProps } from '@/components/sections/content-with-table/content-with-table.type';

export function formatLinks(headings: HeadingGroupWithSubItems[], withHref = true): ContentWithTableProps['links'] {
  return headings.map(heading => ({
    text: heading.text,
    href: withHref ? `#${kebabCase(heading.text)}` : undefined,
    subItems: heading.subItems.map(subItem => ({
      text: subItem.text,
      href: `#${kebabCase(subItem.text)}`,
    })),
  }));
}
