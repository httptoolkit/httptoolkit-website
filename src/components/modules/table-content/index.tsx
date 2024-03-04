'use client';

import * as Accordion from '@radix-ui/react-accordion';

import { TableContentAccordionFixed } from './components/table-content-fixed';
import { TableContentTriggerComponent } from './components/table-content-trigger';
import {
  StyledTableContentContent,
  StyledTableContentItemTrigger,
  StyledTableContentSubitem,
  StyledTableContentWrapper,
} from './table-content.styles';
import type { TableContentProps } from './table-content.types';

import { CaretDown } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';

const renderAccordion = (link: TableContentProps['links'][0], isCollapsible: boolean) => {
  const hasSubItems = Boolean(Array.isArray(link.subItems) && link.subItems?.length);
  const showCaret = isCollapsible && hasSubItems;

  if (!isCollapsible) return <TableContentAccordionFixed link={link} hasSubItems={hasSubItems} />;

  return (
    <Accordion.Item value={link.text}>
      <StyledTableContentItemTrigger>
        <TableContentTriggerComponent text={link.text} href={!hasSubItems ? link.href : undefined} />{' '}
        {showCaret && <CaretDown size={16} weight="fill" />}
      </StyledTableContentItemTrigger>
      {hasSubItems && (
        <StyledTableContentContent>
          {link?.subItems?.map(item => (
            <Text fontSize="m" fontWeight="bold" color="lightGrey">
              <StyledTableContentSubitem href={item.href}>{item.text}</StyledTableContentSubitem>
            </Text>
          ))}
        </StyledTableContentContent>
      )}
    </Accordion.Item>
  );
};

export const TableContent = ({ isCollapsible, links }: TableContentProps) => {
  const content = Array.isArray(links) && links.map(link => renderAccordion(link, Boolean(isCollapsible)));

  if (!isCollapsible) return <StyledTableContentWrapper>{content}</StyledTableContentWrapper>;

  return (
    <StyledTableContentWrapper>
      <Accordion.Root asChild type="single" defaultValue={links[0].text} collapsible>
        <>{content}</>
      </Accordion.Root>
    </StyledTableContentWrapper>
  );
};
