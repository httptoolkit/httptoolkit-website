import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

const iconsSize = 72;

export const StyledIconRowsWrapper = styled.div`
  display: flex;
  gap: 12px;

  @media (min-width: ${screens.lg}) {
    flex-direction: column;
    &[data-orientation="right"] { margin-right: calc(-${iconsSize}px * var(--offset)); }
    &[data-orientation="left"] { margin-left: calc(-${iconsSize}px * var(--offset)); }
  }
`;

export const StyledIconRow = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding-top: calc(${iconsSize}px * var(--offset));

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    padding-top: 0;
    &[data-orientation="right"] {
      justify-content: start;
      padding-left: calc(${iconsSize}px * var(--offset));
    }
    &[data-orientation="left"] {
      justify-content: end;
      padding-right: calc(${iconsSize}px * var(--offset));
    }
  }
`;
