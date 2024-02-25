import type { Icon, IconWeight } from '@phosphor-icons/react';

import type {
  ButtonType,
  ButtonWithoutHrefProps,
  LinkWithHrefProps,
  StyledButtonProps,
} from '@/components/elements/button/button.types';

export type OptionComponentType = (props: Component<Omit<DropdownOptionProps, 'content'>>) => JSX.Element;

export type DropdownOptionProps = {
  as?: ButtonType;
  href?: string;
  content: string;
} & (ButtonWithoutHrefProps | LinkWithHrefProps);

export interface DropdownProps extends StyledButtonProps {
  icon?: Icon;
  iconWeight?: IconWeight;
  items: DropdownOptionProps[];
}
