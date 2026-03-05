import { styled } from '@linaria/react';

import { Button, type ButtonProps } from '@/components/elements/button';
import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';
import { Accordion } from '@/components/modules/accordion';
import type { AccordionProps } from '@/components/modules/accordion';
import { screens } from '@/styles/tokens';

export interface TextWithAccordionProps {
  title: string;
  text: string;
  cta: ButtonProps;
  accordionItems: AccordionProps['items'];
}

const StyledTextWithAccordionWrapper = styled.section`
  position: relative;
`;

const StyledTextWithAccordionGradientWrapper = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  top: -10px;
  z-index: -1;

  @media (max-width: ${screens.lg}) {
    display: none;
  }
`;

const StyledTextWithAccordionContentWrapper = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (min-width: ${screens.lg}) {
      flex-direction: row;
      justify-content: space-between;
      padding: 128px 48px;
    }

    @media (min-width: ${screens['2xl']}) {
      padding: 128px 90px;
    }
  }
`;

const StyledTextWithAccordionTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${screens.lg}) {
    max-width: 375px;
    flex-shrink: 0;
  }

  @media (max-width: ${screens.lg}) {
    text-align: center;
  }
`;

const StyledTextWithAccordionText = styled(Text)`
  &&& {
    margin-top: 24px;
    margin-bottom: 16px;

    @media (min-width: ${screens.lg}) {
      margin-bottom: 24px;
    }
  }
`;

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
