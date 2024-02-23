import type { Icon, IconWeight } from '@phosphor-icons/react';
import type { AnchorHTMLAttributes, AriaAttributes, ButtonHTMLAttributes } from 'react';

type ButtonProperties = {
  href?: never;
  target?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProperties = {
  href: string;
  type?: never;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps<T> = {
  as: T;
  variant?: 'primary' | 'secondary';
  withBorder?: boolean;
  small?: boolean;
  icon?: Icon;
  iconWeight?: IconWeight;
  isDropdown?: boolean;
} & AriaAttributes &
  (T extends 'button' ? ButtonProperties : LinkProperties);

export type ButtonType = <T extends 'button' | 'link'>(props: Component<ButtonProps<T>>) => JSX.Element;

export type ButtonComponentType<T extends 'button' | 'link'> = (
  props: Component<
    Omit<ButtonProps<T>, 'as'> & {
      as: T | 'a';
    }
  >,
) => JSX.Element;
