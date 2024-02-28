import type { Icon } from '@phosphor-icons/react';

import type { LinkProps } from '@/components/elements/link/link.types';

export interface StyledIntegrationCardProps {
  $showBadge?: boolean;
}

export interface IntegrationCardProps extends StyledIntegrationCardProps {
  icon: Icon;
  badgeText?: string;
  title: string;
  text: string;
  link: LinkProps;
}
