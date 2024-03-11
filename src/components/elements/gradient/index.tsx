import { StyledGradient } from './gradient.styles';
import type { StyledGradientProps } from './gradient.types';

export const Gradient = ({ $shape = 'side' }: StyledGradientProps) => {
  return <StyledGradient $shape={$shape} />;
};
