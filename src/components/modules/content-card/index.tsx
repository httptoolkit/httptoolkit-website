import { StyledContentCardContent, StyledContentCardTitle, StyledContentCardWrapper } from './content-card.styles';
import type { ContentCardProps } from './content-card.types';
import { ContentCardForm } from './form';

import { Button } from '@/components/elements/button';
import { Text } from '@/components/elements/text';

export const ContentCard = ({ title, text, button, action, $isNewsletter }: ContentCardProps) => {
  return (
    <StyledContentCardWrapper $isNewsletter={$isNewsletter}>
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
      {$isNewsletter && <ContentCardForm action={action} />}
      {button?.href && (
        <Button as="link" target="_blank" $variant="secondary" {...button}>
          {button.children}
        </Button>
      )}
    </StyledContentCardWrapper>
  );
};
