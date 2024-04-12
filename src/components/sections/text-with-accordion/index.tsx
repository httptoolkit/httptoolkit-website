import {
  StyledTextWithAccordionContentWrapper,
  StyledTextWithAccordionGradientWrapper,
  StyledTextWithAccordionText,
  StyledTextWithAccordionTextWrapper,
  StyledTextWithAccordionWrapper,
} from './text-with-accordion.styles';
import type { TextWithAccordionProps } from './text-with-accordion.types';

import { Button } from '@/components/elements/button';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { Accordion } from '@/components/modules/accordion';

export const TextWithAccordion = ({ title, text, cta, accordionItems }: TextWithAccordionProps) => {
  return (
    <StyledTextWithAccordionWrapper>
      <StyledTextWithAccordionGradientWrapper>
        <Gradient />
      </StyledTextWithAccordionGradientWrapper>
      <StyledTextWithAccordionContentWrapper>
        <StyledTextWithAccordionTextWrapper>
          <Heading as="h2" fontSize="l" color="textGradient">
            {title}
          </Heading>
          <StyledTextWithAccordionText fontSize="m" color="darkGrey">
            {text}
          </StyledTextWithAccordionText>
          <Button {...cta} />
        </StyledTextWithAccordionTextWrapper>
        <Accordion items={accordionItems} isBiggerIcon />
      </StyledTextWithAccordionContentWrapper>
    </StyledTextWithAccordionWrapper>
  );
};
