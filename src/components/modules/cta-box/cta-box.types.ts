import type { Icon } from '@phosphor-icons/react';

export interface StyledCTABoxProps {
  $variant?: 'blog' | 'faq';
}

export interface CTABoxProps extends StyledCTABoxProps {
  title: string;
  subtitle?: string;
  text?: string;
  textOverButton?: string;
  buttonText: string;
  buttonHref: string;
  buttonIcon?: Icon;
}
