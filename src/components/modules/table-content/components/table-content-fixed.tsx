'use client';

import { TableContentTriggerComponent } from './table-content-trigger';
import { StyledTableContentItemLink, StyledTableContentSubitem } from '../table-content.styles';
import type { TableContentFixedProps } from '../table-content.types';

import { Text } from '@/components/elements/text';

export const TableContentAccordionFixed = ({ link, hasSubItems }: TableContentFixedProps) => {
  return (
    <>
      <StyledTableContentItemLink>
        <TableContentTriggerComponent text={link.text} href={link.href} />
      </StyledTableContentItemLink>
      {hasSubItems &&
        link?.subItems?.map(item => (
          <Text fontSize="m" fontWeight="bold" color="lightGrey">
            <StyledTableContentSubitem href={item.href}>{item.text}</StyledTableContentSubitem>
          </Text>
        ))}
    </>
  );
};
