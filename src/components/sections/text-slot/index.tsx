import { marked } from 'marked';

import { styled } from '@linaria/react';

import { screens, fontSizes, fontWeight } from '@/styles/tokens';

import { Button, type ButtonProps } from '@/components/elements/button';
import { Copy } from '@/components/elements/copy';
import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';

export interface TextSlotVariantProps {
  textCenteredOnMobile?: boolean;
}

export interface TextSlotProps extends Component, TextSlotVariantProps {
  title: string;
  texts: string[];
  buttons: ButtonProps[];
  copy?: {
    command: string;
    subtitle: string;
  };
}

const StyledTextSlotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
`;

const StyledTextSlotTitle = styled.div`
  &[data-text-centered="true"] {
    text-align: center;
  }

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }
`;

const StyledTextSlotText = styled.div`
  font-size: ${fontSizes.text.m};
  line-height: 1.5;
  color: var(--text-dark-grey);

  &[data-text-centered="true"] {
    text-align: center;
  }

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }

  & p {
    margin-bottom: 4px;
  }

  & strong {
    font-weight: ${fontWeight.bold};
  }

  & a {
    text-decoration: underline;
  }
`;

const StyledTextSlotCopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTextSlotInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  & [data-copy-wrapper="true"] {
    width: fit-content;
  }

  @media (max-width: ${screens.lg}) {
    &[data-text-centered="true"] {
      align-items: center;
    }
  }
`;

const StyledTextSlotButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
  }
`;

export const TextSlot = ({ title, copy, texts, children, buttons, textCenteredOnMobile }: TextSlotProps) => {
  return (
    <StyledTextSlotWrapper>
      <StyledTextSlotInnerWrapper data-text-centered={textCenteredOnMobile ? 'true' : undefined}>
        <StyledTextSlotTitle data-text-centered={textCenteredOnMobile ? 'true' : undefined}>
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
              data-text-centered={textCenteredOnMobile ? 'true' : undefined}
              dangerouslySetInnerHTML={{ __html: marked.parse(text) as string }}
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
