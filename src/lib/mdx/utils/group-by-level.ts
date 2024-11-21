import type { HeadingGroup } from './extract-titles';

export interface HeadingGroupWithSubItems extends HeadingGroup {
  subItems: HeadingGroup[];
  level: HeadingGroup['level'];
}
export function groupByLevel(data: HeadingGroup[], level = 2): HeadingGroupWithSubItems[] {
  const grouped: HeadingGroupWithSubItems[] = [];
  let currentParent: HeadingGroupWithSubItems | null = null;

  data.forEach(item => {
    const newItem: HeadingGroupWithSubItems = {
      ...item,
      subItems: [],
      level: item.level as HeadingGroup['level'],
    };

    if (item.level === level) {
      grouped.push(newItem);
      currentParent = newItem;
    } else if (item.level > level && currentParent) {
      currentParent.subItems.push(newItem);
    }
  });

  return grouped;
}
