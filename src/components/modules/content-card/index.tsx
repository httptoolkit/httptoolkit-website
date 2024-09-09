import { StyledContentCardContent, StyledContentCardTitle, StyledContentCardWrapper } from './content-card.styles';
import type { ContentCardProps } from './content-card.types';
import { NewsletterForm } from './form';

import { Button } from '@/components/elements/button';
import { Text } from '@/components/elements/text';

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
