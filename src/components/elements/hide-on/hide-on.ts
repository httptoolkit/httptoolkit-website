'use client';

import { screens, styled, css } from '@/styles';

type ScreenKey = keyof typeof screens;

export const StyledHideElementOn = styled.div<
  | { $hideBelow: ScreenKey, $hideAbove?: undefined }
  | { $hideAbove: ScreenKey, $hideBelow?: undefined }
>`
  ${({ $hideBelow, $hideAbove }) => {
    if ($hideBelow) {
      return css`
        display: none;
        visibility: hidden;

        @media (min-width: ${screens[$hideBelow]}) {
          display: block;
          visibility: visible;
        }
      `;
    } else {
      return css`
        display: block;
        visibility: visible;
        @media (min-width: ${screens[$hideAbove]}) {
          display: none;
          visibility: hidden;
        }
      `;
    }
  }}
`;
