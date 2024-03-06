import type { Icon } from '@phosphor-icons/react';

import type { CustomIcon } from '@/components/elements/icon/custom/types';

interface FeatureLineBadgeProps {
  text: string;
  icon: Icon;
}

export interface StyledFeatureLineProps {
  $align?: 'left' | 'right';
}

export interface FeatureLineProps extends StyledFeatureLineProps {
  title: string;
  darkImage: string;
  lightImage: string;
  alt: string;
  badge?: FeatureLineBadgeProps;
  icon?: Icon | CustomIcon;
  text?: string;
  list?: string[];
}
