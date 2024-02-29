import type { Icon } from '@phosphor-icons/react';

export interface StyledContentCardProps {
  $isNewsletter?: boolean;
}

export interface ContentCardProps extends StyledContentCardProps {
  title: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonIcon?: Icon;
}
