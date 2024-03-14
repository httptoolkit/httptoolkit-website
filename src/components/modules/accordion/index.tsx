'use client';

import {
  StyledAccordionContent,
  StyledAccordionItem,
  StyledAccordionTrigger,
  StyledAccordionWrapper,
} from './accordion.styles';
import type { AccordionProps } from './accordion.types';

import { Heading } from '@/components/elements/heading';
import { CaretDown } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';

export const Accordion = ({ items, $variant = 'default' }: AccordionProps) => {
  return (
    <StyledAccordionWrapper type="single" defaultValue={items[0].title} collapsible $variant={$variant}>
      {Array.isArray(items) &&
        items.length > 0 &&
        items.map(item => (
          <StyledAccordionItem value={item.title} $variant={$variant}>
            <StyledAccordionTrigger>
              <Heading as="h3" fontSize="m" color="darkGrey" textAlign="left">
                {item.title}
              </Heading>
              <CaretDown weight="fill" size={24} />
            </StyledAccordionTrigger>
            <StyledAccordionContent>
              <Text fontSize="m" color="darkGrey">
                {item.text}
              </Text>
            </StyledAccordionContent>
          </StyledAccordionItem>
        ))}
    </StyledAccordionWrapper>
  );
};
