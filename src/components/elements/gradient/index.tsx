import { styled } from '@linaria/react';

export interface GradientVariantProps {
  shape?: 'full' | 'side';
}

const StyledGradient = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  aspect-ratio: 16/11;
  z-index: -1;
  pointer-events: none;
  user-select: none;

  &[data-shape="full"] {
    background: radial-gradient(circle, var(--circle-gradient) 0%, transparent 30%),
      radial-gradient(ellipse 50% 45%, var(--ellipse-gradient) 0%, transparent 70%);
    background-size: contain;
    opacity: 0.15;
  }

  &[data-shape="side"] {
    background: radial-gradient(circle at left, var(--circle-gradient) 0%, transparent 30%),
      radial-gradient(ellipse 70% 45% at left, var(--ellipse-gradient) 0%, transparent 70%);
    background-size: contain;
    opacity: 0.15;
  }
`;

export const Gradient = ({ shape = 'side' }: GradientVariantProps) => {
  return <StyledGradient data-shape={shape} />;
};
