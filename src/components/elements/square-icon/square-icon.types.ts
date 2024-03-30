import type { Icon } from '@phosphor-icons/react';

import type { CustomIcon } from '../icon/custom/types';

export const SquareIconSizes = {
  mini: 40,
  small: 48,
  medium: 56,
  large: 64,
  xLarge: 72,
};

export interface StyledSquareIconProps {
  $variant?: 'primary' | 'secondary' | 'darker-secondary' | 'tertiary' | 'tertiary-bigger';
  $size?: keyof typeof SquareIconSizes;
}

export type IconType = Icon | CustomIcon;

export interface SquareIconProps extends StyledSquareIconProps {
  icon: IconType;
}
