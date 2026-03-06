import { styled } from '@linaria/react';

export const StyledText = styled.p`
  font-size: var(--text-font-size);
  color: var(--text-color);
  font-weight: var(--text-font-weight);
  text-align: var(--text-text-align, unset);
  line-height: 1.5;
  letter-spacing: initial;
  text-transform: initial;
  font-style: var(--text-font-style, normal);

  &[data-is-label="true"] {
    line-height: 1.1;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`;
