'use client';

import { TableContentTriggerComponent } from './table-content-trigger';
import { StyledTableContentItemLink, StyledTableContentSubitem } from '../table-content.styles';
import type { TableContentFixedProps, TableContentSubitem } from '../table-content.types';

import { Text } from '@/components/elements/text';

export const TableContentAccordionFixed = ({ link, hasSubItems }: TableContentFixedProps) => {
  const renderSubItems = (subItems: TableContentSubitem[]) => {
    return subItems.map(item => {
      const withSubItems = item.subItems && item.subItems?.length > 0;
      const isHeading2 = (item.level ?? 2) === 2;
      const isChildHeading = !withSubItems && !isHeading2;

      return (
        <ul style={{ paddingLeft: isChildHeading ? '16px' : 0 }} key={item.text} data-level={item.level ?? 2}>
          <li>
            <StyledTableContentSubitem $isAccordionFixed={true} href={item.href}>
              <Text
                as="span"
                fontSize="m"
                color={isChildHeading ? 'lightGrey' : 'white'}
                fontWeight={isChildHeading ? 'normal' : 'bold'}
              >
                {item.text}
              </Text>
            </StyledTableContentSubitem>
          </li>
          {item.subItems && renderSubItems(item.subItems)}
        </ul>
      );
    });
  };

  return (
    <>
      {link.text && (
        <StyledTableContentItemLink>
          <TableContentTriggerComponent text={link.text} href={link.href ?? '#intro'} />
        </StyledTableContentItemLink>
      )}

      {hasSubItems && link.subItems?.length && renderSubItems(link.subItems)}
    </>
  );
};
