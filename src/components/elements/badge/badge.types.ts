import type { Icon, IconWeight } from '@phosphor-icons/react';

export interface BadgeProps {
  variant?: 'primary' | 'secondary';
  icon?: Icon;
  iconWeight?: IconWeight;
  additionalText?: string;
}
