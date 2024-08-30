import type { Icon } from '@phosphor-icons/react';

import type { CustomIcon } from '@/components/elements/icon/custom/types';

export interface IntegrationSinglePageHeroProps {
  title: string;
  text: string;
  icon?: Icon | CustomIcon;
  additionalIcons?: Icon[] | CustomIcon[];
  breadcrumbText: string;
  isMultipleIcons?: boolean;
}
