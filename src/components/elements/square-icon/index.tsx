import { StyledSquareIcon } from './square-icon.styles';
import type { SquareIconProps } from './square-icon.types';
import { SquareIconSizes } from './square-icon.types';

export const SquareIcon = ({ icon: Icon, $size = 'medium', $variant = 'primary' }: SquareIconProps) => {
  return (
    <StyledSquareIcon $variant={$variant} $size={$size}>
      <Icon
        size={SquareIconSizes[$size]}
        width={`${SquareIconSizes[$size]}px`}
        height={`${SquareIconSizes[$size]}px`}
        weight="fill"
      />
    </StyledSquareIcon>
  );
};
