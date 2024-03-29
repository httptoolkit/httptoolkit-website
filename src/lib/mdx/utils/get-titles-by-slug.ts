import { getHeadingLinks } from './get-heading-links';
import { getDocBySlug } from '../docs';

import type { TableContentItem } from '@/components/modules/table-content/table-content.types';

export async function getTitlesBySlug(filePath: string, slug: string, prefixHref?: string): Promise<TableContentItem> {
  const content = await getDocBySlug(slug);
  const links = await getHeadingLinks(filePath);
  const subItems = links.map(link => ({
    text: link.text,
    href: `${prefixHref}${link.href}` as string,
  }));

  return {
    text: content.name,
    subItems,
  };
}

export async function getBlogTitlesBySlug(filePath: string): Promise<TableContentItem> {
  const links = await getHeadingLinks(filePath);
  const subItems = links.map(link => ({
    text: link.text,
    href: link.href as string,
    subItems: link.subItems,
  }));

  return {
    text: 'Introduction',
    subItems,
  };
}
