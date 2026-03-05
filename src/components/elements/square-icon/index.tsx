import { StyledSquareIcon } from './square-icon.styles';
import type { SquareIconProps } from './square-icon.types';
import { SquareIconSizes } from './square-icon.types';

export const SquareIcon = ({ icon: Icon, $size = 'medium', $variant = 'primary', ...props }: SquareIconProps) => {
  return (
    <StyledSquareIcon
      data-variant={$variant}
      data-size={$size}
      style={{ '--icon-size': `${SquareIconSizes[$size || 'medium']}px` } as React.CSSProperties}
      {...props}
    >
      <Icon size="100%" weight="fill" />
    </StyledSquareIcon>
  );
};
