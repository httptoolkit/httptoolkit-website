'use client';

import { MovingBorder } from '../moving-border';

import { styled } from '@/styles';

export const StyledThemedImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;

  & img {
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
  }
`;

export const ThemedImageMovingBorder = styled(MovingBorder)`
  --border-width: 2px;
  --radius: 16px;
  line-height: 0;
  width: 100%;
  aspect-ratio: 1 / 1;

  &:hover {
    border: var(--border-width) solid transparent;
  }

  & img {
    padding: 10px;
    border-radius: 22px;
    border: 1px solid linear-gradient(270deg, #ffffff -0.8%, rgba(255, 255, 255, 0) 93.82%);
  }

  &:before {
    background-image: conic-gradient(from var(--angle), var(--moving-border-dark));
    animation: spin 5s linear infinite paused;
    animation-play-state: running;
  }

  @supports not (background: paint(something)) {
    &::before {
      background-image: conic-gradient(from var(--angle), var(--moving-border-dark));
    }
  }
`;
