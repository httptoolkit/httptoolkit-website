'use client';

import type { StyledIconRowItem } from './icon-rows.types';

import { styled } from '@/styles';

const iconsSize = 72;

export const StyledIconRowsWrapper = styled.div<StyledIconRowItem>`
  display: flex;
  gap: 12px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: column;
    ${({ $orientation, $offset }) =>
      $orientation === 'right'
        ? `
        margin-right: calc(-${iconsSize}px * ${$offset});
        `
        : `
        margin-left: calc(-${iconsSize}px * ${$offset});
      `}
  }
`;

export const StyledIconRow = styled.div<StyledIconRowItem>`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding-top: calc(${iconsSize}px * ${({ $offset }) => $offset});

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: row;
    padding-top: 0;
    ${({ $orientation, $offset }) =>
      $orientation === 'right'
        ? `
      justify-content: start;  
      padding-left: calc(${iconsSize}px * ${$offset});
      `
        : `
      justify-content: end;  
      padding-right: calc(${iconsSize}px * ${$offset});
    `}
  }
`;
