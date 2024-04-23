import type { Icon } from '@phosphor-icons/react';

import type { CustomIcon } from '@/components/elements/icon/custom/types';
import type { ThemeImageProps } from '@/components/elements/themed-image';

interface FeatureLineBadgeProps {
  text: string;
  icon: Icon;
}

export interface StyledFeatureLineProps {
  $align?: 'left' | 'right';
}

export interface FeatureLineProps extends StyledFeatureLineProps {
  title: string;
  image?: ThemeImageProps;
  badge?: FeatureLineBadgeProps;
  icon?: Icon | CustomIcon;
  text?: string;
  list?: string[];
}
