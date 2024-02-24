import type { AriaAttributes, HTMLAttributeAnchorTarget } from 'react';

import type { ButtonProps } from '@/components/elements/button/button.types';

export type OptionComponentType = (props: Component<Omit<DropdownOptionProps, 'content'>>) => JSX.Element;

export interface DropdownOptionProps extends AriaAttributes {
  content: string;
  as?: 'button' | 'a' | 'Link';
  onClick?: () => void;
  href?: string;
  role?: HTMLAttributeAnchorTarget;
  target?: HTMLAttributeAnchorTarget;
}

export interface DropdownProps extends Omit<ButtonProps<'button'>, 'onClick' | 'href'> {
  items: DropdownOptionProps[];
}
