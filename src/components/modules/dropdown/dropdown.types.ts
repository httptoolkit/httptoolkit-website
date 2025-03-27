import type { Icon, IconWeight } from '@phosphor-icons/react';
import type { AriaAttributes } from 'react';

import type {
  ButtonType,
  ButtonWithoutHrefProps,
  LinkWithHrefProps,
  StyledButtonProps,
} from '@/components/elements/button/button.types';

export type OptionComponentType = (props: Component<Omit<DropdownOptionProps, 'text'>>) => JSX.Element;

export type DropdownOption =
  | DropdownDownloadOption
  | { type: 'hr' };

export type DropdownDownloadOption = {
  as?: ButtonType;
  href?: string;
  text: string;
  subtext?: string;
};

export type DropdownOptionProps = {
  as?: ButtonType;
  href?: string;
  $variant?: StyledButtonProps['$variant'];
} & (ButtonWithoutHrefProps | LinkWithHrefProps);

export interface DropdownProps extends StyledButtonProps, AriaAttributes {
  icon?: Icon;
  iconWeight?: IconWeight;
  href?: string;
  items: DropdownOption[];
  $direction?: 'top' | 'bottom';
}
