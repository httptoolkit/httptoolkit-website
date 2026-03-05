import { NewsletterForm } from './form';

import { Button, type ButtonProps } from '@/components/elements/button';
import { Text } from '@/components/elements/text';
import { styled } from '@linaria/react';
import { screens } from '@/styles/tokens';

interface StyledContentCardProps {
  $isNewsletter?: boolean;
}

export interface ContentCardProps extends StyledContentCardProps {
  title: string;
  text?: string;
  button?: ButtonProps;
  newsletter?: {
    action: string;
    source: string;
  }
}

const StyledContentCardWrapper = styled.div<StyledContentCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ $isNewsletter }) => ($isNewsletter ? '16px' : '32px')};
  border-radius: 12px;
  padding: 16px;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border),
    0 0 8px 0 var(--shadow-default);

  @media (min-width: ${screens['lg']}) {
    padding: 32px;
    gap: ${({ $isNewsletter }) => ($isNewsletter ? '16px' : '43px')};
  }
`;

const StyledContentCardTitle = styled(Text)`
  &&& {
    max-width: 452px;
  }
`;

const StyledContentCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledContentCardForm = styled.form`
  display: flex;
  gap: 12px;
  flex-direction: column;

  @media (min-width: ${screens['lg']}) {
    flex-direction: row;
    align-items: center;
  }

  & button {
    flex-shrink: 0;
  }
`;

export const ContentCard = ({ title, text, button, newsletter }: ContentCardProps) => {
  return (
    <StyledContentCardWrapper $isNewsletter={!!newsletter}>
      <StyledContentCardContent>
        <StyledContentCardTitle fontSize="l" fontWeight="bold" color="white" textAlign="left">
          {title}
        </StyledContentCardTitle>
        {text && (
          <Text fontSize="m" color="darkGrey">
            {text}
          </Text>
        )}
      </StyledContentCardContent>
      {!!newsletter && <NewsletterForm action={newsletter.action} source={newsletter.source} />}
      {button?.href && (
        <Button as="link" target="_blank" $variant="secondary" {...button}>
          {button.children}
        </Button>
      )}
    </StyledContentCardWrapper>
  );
};
