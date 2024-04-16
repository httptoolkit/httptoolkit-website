import { startCase } from 'lodash-es';

import type { TableContentProps } from '@/components/modules/table-content/table-content.types';

export type UnorganizedDoc = Omit<Doc, 'content'> & { parent: string | undefined };

const indexParent = 'getting-started';
export const FAQ_SLUG = 'subscription-faq';
const basePath = '/docs';

export function getContentTableLinks(docs: UnorganizedDoc[]): TableContentProps['links'] {
  const parents = Array.from(new Set(docs.map(doc => doc.parent).filter(doc => doc))) as string[];
  const indexParentDoc = docs.find(doc => !doc.parent) as UnorganizedDoc;

  const links: TableContentProps['links'] = parents.map(parent => {
    const parentLinks = docs
      .filter(doc => doc.parent === parent)
      .filter(doc => doc.slug !== FAQ_SLUG)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(doc => ({
        text: doc.name,
        href: `${basePath}${doc.parent && `/${doc.parent}`}/${doc.slug}`,
      }));
    const subItems =
      parent === indexParent
        ? [
            {
              text: indexParentDoc.name,
              href: `${basePath}/${indexParentDoc.slug}`,
            },
            ...parentLinks,
          ]
        : parentLinks;

    return {
      text: startCase(parent?.split('-').join(' ')),
      subItems,
    };
  });

  return links;
}
