'use client';

import { marked } from 'marked';

import {
  StyledAccordionContent,
  StyledAccordionItem,
  StyledAccordionTransparentTitle,
  StyledAccordionTrigger,
  StyledAccordionWrapper,
} from './accordion.styles';
import type { AccordionProps, StyledAccordionProps } from './accordion.types';

import { Heading } from '@/components/elements/heading';
import { CaretDown } from '@/components/elements/icon';
import { renderer } from '@/lib/marked/link-target-render';

const AccordionTitle = ({ $variant, children }: Component<StyledAccordionProps>) => {
  if ($variant === 'transparent') {
    return <StyledAccordionTransparentTitle>{children}</StyledAccordionTransparentTitle>;
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
        items.map((item, idx) => (
          <StyledAccordionItem key={`${item.title}-${idx}`} value={item.title} $variant={$variant}>
            <StyledAccordionTrigger>
              <AccordionTitle $variant={$variant}>{item.title}</AccordionTitle>
              <CaretDown weight="fill" size={24} />
            </StyledAccordionTrigger>
            <StyledAccordionContent>
              <div
                className="accordion_content_inner"
                dangerouslySetInnerHTML={{ __html: marked.parse(item.text, { renderer }) }}
              />
            </StyledAccordionContent>
          </StyledAccordionItem>
        ))}
    </StyledAccordionWrapper>
  );
};
