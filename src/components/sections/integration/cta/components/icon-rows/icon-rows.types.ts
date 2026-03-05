import type { Icon } from '@phosphor-icons/react';

import type { CustomIcon } from '@/components/elements/icon/custom/types';

export interface IconRowItem {
  icons: (Icon | CustomIcon)[];
  offset: number;
}

export interface IconRowsProps {
  rows: IconRowItem[];
  $offset: IconRowItem['offset'];
  $orientation: 'right' | 'left';
}
