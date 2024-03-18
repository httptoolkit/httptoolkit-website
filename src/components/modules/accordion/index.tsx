'use client';

import { marked } from 'marked';

import {
  StyledAccordionContent,
  StyledAccordionItem,
  StyledAccordionTrigger,
  StyledAccordionWrapper,
} from './accordion.styles';
import type { AccordionProps, StyledAccordionProps } from './accordion.types';

import { Heading } from '@/components/elements/heading';
import { CaretDown } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { renderer } from '@/lib/marked/link-target-render';

const AccordionTitle = ({ $variant, children }: Component<StyledAccordionProps>) => {
  if ($variant === 'transparent') {
    return (
      <Text fontSize="l" fontWeight="bold" color="lightGrey" textAlign="left">
        {children}
      </Text>
    );
  }
  return (
    <Heading as="h3" fontSize="s" color="darkGrey" textAlign="left">
      {children}
    </Heading>
  );
};

export const Accordion = ({ items, $variant = 'default' }: AccordionProps) => {
  return (
    <StyledAccordionWrapper type="single" defaultValue={items[0].title} collapsible $variant={$variant}>
      {Array.isArray(items) &&
        items.length > 0 &&
        items.map(item => (
          <StyledAccordionItem key={item.text} value={item.title} $variant={$variant}>
            <StyledAccordionTrigger>
              <AccordionTitle>{item.title}</AccordionTitle>
              <CaretDown weight="fill" size={24} />
            </StyledAccordionTrigger>
            <StyledAccordionContent>
              <div dangerouslySetInnerHTML={{ __html: marked.parse(item.text, { renderer }) }}></div>
            </StyledAccordionContent>
          </StyledAccordionItem>
        ))}
    </StyledAccordionWrapper>
  );
};
