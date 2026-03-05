import { marked } from 'marked';

import {
  StyledTextSlotButtonsWrapper,
  StyledTextSlotCopyWrapper,
  StyledTextSlotInnerWrapper,
  StyledTextSlotText,
  StyledTextSlotTitle,
  StyledTextSlotWrapper,
} from './text-slot.styles';
import type { TextSlotProps } from './text-slot.types';

import { Button } from '@/components/elements/button';
import { Copy } from '@/components/elements/copy';
import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';

export const TextSlot = ({ title, copy, texts, children, buttons, $textCenteredOnMobile }: TextSlotProps) => {
  return (
    <StyledTextSlotWrapper>
      <StyledTextSlotInnerWrapper data-text-centered={$textCenteredOnMobile ? 'true' : undefined}>
        <StyledTextSlotTitle data-text-centered={$textCenteredOnMobile ? 'true' : undefined}>
          <Heading as="h1" fontSize="l" color="textGradient">
            {title}
          </Heading>
        </StyledTextSlotTitle>
        {copy && (
          <StyledTextSlotCopyWrapper data-copy-wrapper="true">
            <Copy text={copy.command} />
            <Text fontSize="l" color="white" fontWeight="medium">
              {copy.subtitle}
            </Text>
          </StyledTextSlotCopyWrapper>
        )}
        {Array.isArray(texts) &&
          texts?.length > 0 &&
          texts.map(text => (
            <StyledTextSlotText
              data-text-centered={$textCenteredOnMobile ? 'true' : undefined}
              dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
            />
          ))}
        <StyledTextSlotButtonsWrapper>
          {Array.isArray(buttons) && buttons?.length > 0 && buttons?.map(button => <Button {...button} />)}
        </StyledTextSlotButtonsWrapper>
      </StyledTextSlotInnerWrapper>
      {children}
    </StyledTextSlotWrapper>
  );
};
