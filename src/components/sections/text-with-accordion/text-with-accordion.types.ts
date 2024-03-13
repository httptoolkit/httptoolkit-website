import type { ButtonProps } from '@/components/elements/button/button.types';
import type { AccordionProps } from '@/components/modules/accordion/accordion.types';

export interface TextWithAccordionProps {
  title: string;
  text: string;
  cta: ButtonProps;
  accordionItems: AccordionProps['items'];
}
