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
import { Text } from '@/components/elements/text';

export const TextSlot = ({ title, copy, texts, children, buttons, $textCenteredOnMobile }: TextSlotProps) => {
  return (
    <StyledTextSlotWrapper>
      <StyledTextSlotInnerWrapper>
        <StyledTextSlotTitle
          forwardedAs="h1"
          fontSize="l"
          color="textGradient"
          $textCenteredOnMobile={$textCenteredOnMobile}
        >
          {title}
        </StyledTextSlotTitle>
        {copy && (
          <StyledTextSlotCopyWrapper>
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
              dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
              $textCenteredOnMobile={$textCenteredOnMobile}
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
