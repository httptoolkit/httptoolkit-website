import type { Icon } from '@phosphor-icons/react';

export interface StyledFluidCardProps {
  $variant?: 'default' | 'highlighted' | 'dark';
}

export interface FluidCardProps extends StyledFluidCardProps {
  icon?: Icon;
  title: string;
  text: string;
  buttonHref?: string;
  buttonText?: string;
}
