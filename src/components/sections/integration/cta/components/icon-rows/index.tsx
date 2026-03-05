import { StyledIconRow, StyledIconRowsWrapper } from './icon-rows.styles';
import type { IconRowsProps } from './icon-rows.types';

import { SquareIcon } from '@/components/elements/square-icon';

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
