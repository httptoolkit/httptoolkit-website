import type { Icon } from '@phosphor-icons/react';

import { styled } from '@linaria/react';

import type { CustomIcon } from '@/components/elements/icon/custom/types';
import { SquareIcon } from '@/components/elements/square-icon';
import { screens } from '@/styles/tokens';

export interface IconRowItem {
  icons: (Icon | CustomIcon)[];
  offset: number;
}

export interface IconRowsProps {
  rows: IconRowItem[];
  $offset: IconRowItem['offset'];
  $orientation: 'right' | 'left';
}

const iconsSize = 72;

const StyledIconRowsWrapper = styled.div`
  display: flex;
  gap: 12px;

  @media (min-width: ${screens.lg}) {
    flex-direction: column;
    &[data-orientation="right"] { margin-right: calc(-${iconsSize}px * var(--offset)); }
    &[data-orientation="left"] { margin-left: calc(-${iconsSize}px * var(--offset)); }
  }
`;

const StyledIconRow = styled.div`
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

const parserOffset = (offset: number) => {
  const additionalOffset = Math.floor(offset) * 0.16; // .16 is the sixth part of the icon size (72)
  return offset + additionalOffset;
};

export const IconRows = ({ rows, $orientation, $offset }: IconRowsProps) => {
  return (
    <StyledIconRowsWrapper
      data-orientation={$orientation}
      style={{ '--offset': $offset } as React.CSSProperties}
    >
      {Array.isArray(rows) &&
        rows?.length > 0 &&
        rows.map((row, rowIndex) => (
          <StyledIconRow
            key={rowIndex}
            data-orientation={$orientation}
            style={{ '--offset': parserOffset(row.offset) } as React.CSSProperties}
          >
            {Array.isArray(row.icons) &&
              row.icons?.length > 0 &&
              row.icons.map((icon, iconIndex) => <SquareIcon key={iconIndex} icon={icon} $size="xLarge" />)}
          </StyledIconRow>
        ))}
    </StyledIconRowsWrapper>
  );
};
