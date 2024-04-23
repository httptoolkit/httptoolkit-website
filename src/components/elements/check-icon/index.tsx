import { StyledCheckIcon } from './check-icon.styles';
import { Check } from '../icon';

export interface CheckIconProps {
  $small?: boolean;
}

export const CheckIcon = ({ $small = false }: CheckIconProps) => {
  return (
    <StyledCheckIcon $small={$small}>
      <Check size={12} />
    </StyledCheckIcon>
  );
};
