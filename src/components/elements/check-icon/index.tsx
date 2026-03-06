import { styled } from '@linaria/react';

import { Check } from '../icon';

export interface CheckIconProps {
  small?: boolean;
}

const StyledCheckIcon = styled.div`
  flex-shrink: 0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blue-gradient);
  width: 20px;
  height: 20px;
  color: var(--text-always-white);
  box-shadow:
    0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset,
    0px -0.83px 0.83px 0px rgba(16, 46, 151, 0.1) inset,
    0 0 0 1px var(--border-always-gradient) inset;

  &[data-small='true'] {
    width: 17px;
    height: 17px;
  }
`;

export const CheckIcon = ({ small = false }: CheckIconProps) => {
  return (
    <StyledCheckIcon data-small={small}>
      <Check size={12} />
    </StyledCheckIcon>
  );
};
