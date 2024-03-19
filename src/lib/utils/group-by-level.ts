import type { HeadingGroup } from '../mdx/extract-tittles';

export interface HeadingGroupWithSubItems extends HeadingGroup {
  subItems: HeadingGroup[];
}

export function groupByLevel(data: HeadingGroup[]) {
  const grouped: HeadingGroupWithSubItems[] = [];

  data.forEach(item => {
    if (item.level === 2) {
      grouped.push({
        ...item,
        subItems: [],
      });
    } else {
      const parentLevel2 = grouped[grouped.length - 1];
      if (parentLevel2) {
        parentLevel2.subItems.push(item);
      }
    }
  });

  return grouped;
}
