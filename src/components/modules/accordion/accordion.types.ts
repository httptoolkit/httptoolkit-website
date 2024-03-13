export interface AccordionItem {
  title: string;
  text: string;
}

export interface StyledAccordionProps {
  $variant?: 'default';
}

export interface AccordionProps extends StyledAccordionProps {
  items: AccordionItem[];
}
