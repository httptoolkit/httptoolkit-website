import type { Icon } from '@phosphor-icons/react';

import type { CustomIcon } from '@/components/elements/icon/custom/types';

export interface IconRowItem {
  icons: (Icon | CustomIcon)[];
  offset: number;
}

export interface StyledIconRowItem {
  $orientation: IconRowsProps['$orientation'];
  $offset: IconRowItem['offset'];
}

export interface IconRowsProps {
  rows: IconRowItem[];
  $offset: IconRowItem['offset'];
  $orientation: 'right' | 'left';
}
