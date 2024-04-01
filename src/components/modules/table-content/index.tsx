'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { usePathname } from 'next/navigation';

import { TableContentAccordionFixed } from './components/table-content-fixed';
import { TableContentTriggerComponent } from './components/table-content-trigger';
import {
  StyledTableContentContent,
  StyledTableContentItemTrigger,
  StyledTableContentSubitem,
  StyledTableContentWrapper,
  TableOfContentFixedWrapper,
} from './table-content.styles';
import type { TableContentProps } from './table-content.types';

import { CaretDown } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';

const AccordionItem = ({
  link,
  isCollapsible,
  currentPath,
}: {
  link: TableContentProps['links'][number];
  isCollapsible: boolean;
  currentPath?: string;
}) => {
  const hasSubItems = Boolean(Array.isArray(link.subItems) && link.subItems?.length);
  const showCaret = isCollapsible && hasSubItems;

  if (!isCollapsible)
    return (
      <TableOfContentFixedWrapper id="table-of-content-headings">
        <TableContentAccordionFixed key={link.text} link={link} hasSubItems={hasSubItems} />
      </TableOfContentFixedWrapper>
    );

  return (
    <Accordion.Item value={link.text} key={link.text}>
      <StyledTableContentItemTrigger>
        <TableContentTriggerComponent text={link.text} href={!hasSubItems ? link.href : undefined} />{' '}
        {showCaret && <CaretDown size={16} weight="fill" />}
      </StyledTableContentItemTrigger>
      {hasSubItems && (
        <StyledTableContentContent>
          {link?.subItems?.map(item => (
            <Text key={item.text} fontSize="m" fontWeight="bold" color="lightGrey">
              <StyledTableContentSubitem data-active={currentPath === item.href} href={item.href}>
                {item.text}
              </StyledTableContentSubitem>
            </Text>
          ))}
        </StyledTableContentContent>
      )}
    </Accordion.Item>
  );
};

export const TableContent = ({ isCollapsible, links }: TableContentProps) => {
  const currentPath = usePathname();

  const content =
    Array.isArray(links) &&
    links.map(link => (
      <AccordionItem key={link.href} link={link} isCollapsible={Boolean(isCollapsible)} currentPath={currentPath} />
    ));

  if (!isCollapsible) return <StyledTableContentWrapper>{content}</StyledTableContentWrapper>;

  const defaultOpenItem = links.find(item => {
    return item.subItems?.some(subItem => subItem.href === currentPath);
  });

  return (
    <StyledTableContentWrapper>
      <Accordion.Root asChild type="single" defaultValue={defaultOpenItem?.text || links[0].text} collapsible>
        <>{content}</>
      </Accordion.Root>
    </StyledTableContentWrapper>
  );
};
