import type { Icon, IconWeight } from '@phosphor-icons/react';

type badgedVariant = 'primary' | 'secondary';
export interface StyledBadgeProps {
  $variant?: badgedVariant;
}

export interface BadgeProps {
  variant?: badgedVariant;
  icon?: Icon;
  iconWeight?: IconWeight;
  additionalText?: string;
}
