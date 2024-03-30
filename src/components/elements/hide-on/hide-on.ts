'use client';

import { screens, styled, css } from '@/styles';

export const StyledHideElementOn = styled.div<{ $hideOn: 'mobile' | 'desktop' }>`
  ${({ $hideOn }) => {
    switch ($hideOn) {
      case 'mobile':
        return css`
          display: none;
          visibility: hidden;

          @media (min-width: ${screens['lg']}) {
            display: block;
            visibility: visible;
          }
        `;
      case 'desktop':
        return css`
          display: block;
          visibility: visible;
          @media (min-width: ${screens['lg']}) {
            display: none;
            visibility: hidden;
          }
        `;
    }
  }}
`;
