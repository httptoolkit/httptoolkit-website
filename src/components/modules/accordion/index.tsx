'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';

import {
  StyledAccordionContent,
  StyledAccordionItem,
  StyledAccordionTrigger,
  StyledAccordionWrapper,
} from './accordion.styles';
import type { AccordionProps } from './accordion.types';

import { Heading } from '@/components/elements/heading';
import { CaretDown } from '@/components/elements/icon';

export const Accordion = ({ items, $variant = 'default' }: AccordionProps) => {
  return (
    <StyledAccordionWrapper type="single" defaultValue={items[0].title} collapsible $variant={$variant}>
      {Array.isArray(items) &&
        items.length > 0 &&
        items.map(item => (
          <StyledAccordionItem value={item.title} $variant={$variant}>
            <RadixAccordion.Header>
              <StyledAccordionTrigger>
                <Heading as="h3" fontSize="s" color="darkGrey" textAlign="left">
                  {item.title}
                </Heading>
                <CaretDown weight="fill" size={24} />
              </StyledAccordionTrigger>
            </RadixAccordion.Header>
            <StyledAccordionContent>{item.text}</StyledAccordionContent>
          </StyledAccordionItem>
        ))}
    </StyledAccordionWrapper>
  );
};
