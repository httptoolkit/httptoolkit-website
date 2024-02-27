import type { BadgeProps } from '@/components/elements/badge/badge.types';

export interface StyledHeadingBlockProps {
  $align: CanvasTextAlign;
  $isContentCentered?: boolean;
}

export interface HeadingBlockProps extends StyledHeadingBlockProps {
  title: string;
  text?: string;
  badgeTitle?: string;
  badgeAdditionalText?: BadgeProps['additionalText'];
  badgeIcon?: BadgeProps['icon'];
}
