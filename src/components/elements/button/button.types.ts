import type { Icon, IconWeight } from '@phosphor-icons/react';
import type { AnchorHTMLAttributes, AriaAttributes, ButtonHTMLAttributes } from 'react';

export type ButtonWithoutHrefProps = {
  href?: never;
  target?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type LinkWithHrefProps = {
  href: string;
  type?: never;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonType = 'link' | 'button';

export type StyledButtonProps = {
  $isDropdown?: boolean;
  $variant?: 'primary' | 'secondary';
  $withBorder?: boolean;
  $small?: boolean;
};

export type ButtonProps = {
  as?: ButtonType;
  icon?: Icon;
  iconWeight?: IconWeight;
} & StyledButtonProps &
  AriaAttributes &
  (ButtonWithoutHrefProps | LinkWithHrefProps);

export type ButtonComponentType = (props: Component<Omit<ButtonProps, 'HTMLAnchorElement'>>) => JSX.Element;
