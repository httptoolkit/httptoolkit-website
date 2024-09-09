import type { ButtonProps } from '@/components/elements/button/button.types';

export interface StyledContentCardProps {
  $isNewsletter?: boolean;
}

export interface ContentCardProps extends StyledContentCardProps {
  title: string;
  text?: string;
  button?: ButtonProps;
  newsletter?: {
    action: string;
    source: string;
  }
}
