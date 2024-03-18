export interface AccordionItem {
  title: string;
  text: string;
}

export interface StyledAccordionProps {
  $variant?: 'default' | 'transparent';
}

export interface AccordionProps extends StyledAccordionProps {
  items: AccordionItem[];
}
