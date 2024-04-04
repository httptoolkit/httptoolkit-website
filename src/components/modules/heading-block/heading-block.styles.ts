'use client';

import type { StyledHeadingBlockProps } from './heading-block.types';

import { Heading } from '@/components/elements/heading';
import { styled } from '@/styles';

const alignDictionary: Record<CanvasTextAlign, string> = {
  right: 'end',
  left: 'start',
  center: 'center',
  end: 'end',
  start: 'start',
};

export const StyledHeadingBlockWrapper = styled.section<StyledHeadingBlockProps>`
  max-width: 656px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: ${({ $align }) => $align};
  align-items: ${({ $align }) => alignDictionary[$align]};
  margin: ${({ $isContentCentered: $centered }) => $centered && '0 auto'};
`;

export const StyledHeadingBlockTitle = styled(Heading)`
  &&& {
    span {
      -webkit-text-fill-color: ${({ theme }) => theme.colors.cinnarbarRed};
    }
  }
`;
