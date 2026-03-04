import styled, { css, keyframes } from 'styled-components';

export { css, keyframes, styled };

export {
  screens,
  textColors,
  fontWeight,
  fontSizes,
  lineHeight,
  letterSpacing,
} from './tokens';
export type { TextColor, FontWeight, FontSize } from './tokens';

export const textGradientMixin = css`
  background: var(--text-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const textOrangeGradientMixin = css`
  background: var(--text-orange-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Keyframes = {
  rotate: keyframes`
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  `,
};