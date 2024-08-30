'use client';

import { screens, styled } from '@/styles';

export const MovingBorder = styled.figure`
  --border-width: 1px;
  --radius: 20px;
  width: 100%;
  position: relative;
  border-radius: var(--radius);
  border: var(--border-width) solid transparent;

  @media (min-width: ${screens['lg']}) {
    width: fit-content;
  }

  @media (hover: hover) {
    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.cinnarbarRed};
      transition: all ease-in 0.3s;
    }
  }

  &:before {
    content: ' ';
    position: absolute;
    inset: calc(var(--border-width) * -1);
    z-index: -1;
    border: inherit;
    border-radius: inherit;
    background-image: conic-gradient(
      from var(--angle),
      rgba(255, 255, 255, 0.1),
      rgba(225, 66, 31, 0.1),
      rgba(255, 255, 255, 0.1),
      rgba(225, 66, 31, 0.9)
    );
    background-origin: border-box;
    -webkit-mask: linear-gradient(black, black), linear-gradient(black, black);
    mask: linear-gradient(black, black), linear-gradient(black, black);
    -webkit-mask-clip: content-box, border-box;
    mask-clip: content-box, border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: spin 3s linear infinite paused;
    animation-play-state: running;
  }

  /* Use CSS @supports for non-Houdini browsers to ensure gradient display without animation. */
  @supports not (background: paint(something)) {
    &::before {
      background-image: conic-gradient(
        from var(--angle),
        rgba(255, 255, 255, 0.1),
        rgba(225, 66, 31, 0.1),
        rgba(255, 255, 255, 0.1),
        rgba(225, 66, 31, 0.9)
      );
    }
  }

  @property --angle {
    syntax: '<angle>';
    inherits: true;
    initial-value: 0turn;
  }

  @keyframes spin {
    to {
      --angle: 1turn;
    }
  }
`;
