import type { Icon } from '@phosphor-icons/react';

import type { CustomIcon } from '../icon/custom/types';

export const SquareIconSizes = {
  medium: 32,
  large: 48,
};

export interface StyledSquareIconProps {
  $variant?: 'primary' | 'secondary' | 'darker-secondary' | 'tertiary';
  $size?: keyof typeof SquareIconSizes;
}

export interface SquareIconProps extends StyledSquareIconProps {
  icon: Icon | CustomIcon;
}
