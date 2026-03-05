'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { usePathname } from 'next/navigation';

import { styled } from '@linaria/react';
import { Link } from '@/components/elements/link';
import { fontWeight } from '@/styles/tokens';

import { TableContentAccordionFixed } from './components/table-content-fixed';
import { TableContentTriggerComponent } from './components/table-content-trigger';

import { CaretDown } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { getPathWithoutHash } from '@/lib/utils';

import type { HeadingGroup } from '@/lib/mdx/utils/extract-titles';

export interface TableContentSubitem {
  text: string;
  href: string;
  level?: HeadingGroup['level'];
  subItems?: TableContentSubitem[];
}

export interface TableContentItem {
  text: string;
  href?: string;
  level?: HeadingGroup['level'];
  subItems?: TableContentSubitem[];
}

export interface TableContentProps {
  isCollapsible?: boolean;
  links: TableContentItem[];
}

export interface TableContentFixedProps {
  id?: string;
  link: TableContentProps['links'][0];
  hasSubItems: boolean;
}

const StyledTableContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  padding: 16px;
  max-height: calc(100vh - 32px);
  overflow: auto;
  background: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0px 0px 24px 0px var(--shadow-inner-box) inset;

  scrollbar-width: thin;
  scrollbar-color: var(--light-grey) transparent;
  scrollbar-gutter: stable;
`;

const triggerStyles = `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: transparent;
  border: none;

  &:focus,
  &:focus-within {
    background-color: var(--ink-grey);
  }

  @media (hover: hover) {
    &:hover {
      background-color: var(--ink-grey);
    }
  }

  & > p,
  & > p > a {
    display: inline-block;
    width: 100%;
    text-align: left;
  }
`;

export const StyledTableContentItemLink = styled.div`
  ${triggerStyles}

  & a {
    transition: color ease-in 300ms;
    &.active {
      color: var(--electric-light-blue);

      p {
        transition: color ease-in 300ms;
        color: var(--electric-light-blue);
      }
    }
  }
`;

const StyledTableContentItemTrigger = styled(Accordion.Trigger)`
  &&& {
    ${triggerStyles}

    &[data-state=open] svg {
      transform: rotate(180deg);
    }

    & svg {
      transition: transform 0.5s;
      color: var(--text-white);
    }
  }
`;

const StyledTableContentContent = styled(Accordion.Content)`
  &&& {
    overflow: hidden;

    @keyframes table-content-slide-down {
      from {
        height: 0;
      }
      to {
        height: var(--radix-accordion-content-height);
      }
    }

    @keyframes table-content-slide-up {
      from {
        height: var(--radix-accordion-content-height);
      }
      to {
        height: 0;
      }
    }

    &[data-state='open'] {
      animation: table-content-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
    &[data-state='closed'] {
      animation: table-content-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
  }
`;

export const StyledTableContentSubitem = styled(Link)`
  &&& {
    display: inline-block;
    width: 100%;
    font-weight: ${fontWeight.normal};
    color: var(--text-light-grey);
    transition: all 0.1s;
    outline: none;
    border-radius: 8px;
    padding: 8px 32px;

    &.active {
      span,
      p {
        color: var(--text-electric-light-blue);
      }
    }

    &:focus {
      color: var(--text-dark-grey);
    }

    @media (hover: hover) {
      &:hover {
        color: var(--text-dark-grey);
      }
    }

    &[data-accordion-fixed="true"] {
      padding: 8px 16px;

      &:focus,
      &:focus-within {
        background-color: var(--ink-grey);
      }

      @media (hover: hover) {
        &:hover {
          background-color: var(--ink-grey);
        }
      }
    }

    &[data-active='true'] {
      color: var(--electric-light-blue);
    }
  }
`;

const TableOfContentFixedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

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
    links.map((link, idx) => (
      <AccordionItem
        key={`${link.href}-${idx}`}
        link={link}
        isCollapsible={Boolean(isCollapsible)}
        currentPath={currentPath}
      />
    ));

  if (!isCollapsible) {
    return <StyledTableContentWrapper data-match-scroll>{content}</StyledTableContentWrapper>;
  }

  const defaultOpenItem = links.find(item =>
    item.subItems?.some(subItem =>
      getPathWithoutHash(subItem.href) === currentPath
    )
  );

  return (
    <StyledTableContentWrapper>
      <Accordion.Root
        asChild
        type="single"
        defaultValue={defaultOpenItem?.text || links[0].text}
        collapsible
      >
        <>{ content }</>
      </Accordion.Root>
    </StyledTableContentWrapper>
  );
};
