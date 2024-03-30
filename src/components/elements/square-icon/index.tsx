import { StyledSquareIcon } from './square-icon.styles';
import type { SquareIconProps } from './square-icon.types';

export const SquareIcon = ({ icon: Icon, $size = 'medium', $variant = 'primary', ...props }: SquareIconProps) => {
  return (
    <StyledSquareIcon $variant={$variant} $size={$size} {...props}>
      <Icon size="100%" weight="fill" />
    </StyledSquareIcon>
  );
};
