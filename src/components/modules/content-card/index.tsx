import {
  StyledContentCardContent,
  StyledContentCardForm,
  StyledContentCardTitle,
  StyledContentCardWrapper,
} from './content-card.styles';
import type { ContentCardProps } from './content-card.types';
import { Input } from '../input';

import { Button } from '@/components/elements/button';
import { Text } from '@/components/elements/text';

export const ContentCard = ({ title, text, button, $isNewsletter }: ContentCardProps) => {
  return (
    <StyledContentCardWrapper>
      <StyledContentCardContent>
        <StyledContentCardTitle fontSize="l" fontWeight="bold" color="white">
          {title}
        </StyledContentCardTitle>
        {text && (
          <Text fontSize="m" color="darkGrey">
            {text}
          </Text>
        )}
      </StyledContentCardContent>
      {$isNewsletter && (
        <>
          <StyledContentCardForm>
            <Input id="email" placeholder="Email address" type="email" />
            <Button as="button" type="submit" $variant="secondary" $small>
              Sign up
            </Button>
          </StyledContentCardForm>
          <Text color="darkGrey" fontSize="m">
            No spam, just very occasional updates on major new releases.
          </Text>
        </>
      )}
      {button?.href && (
        <Button as="link" target="_blank" $variant="secondary" {...button}>
          {button.children}
        </Button>
      )}
    </StyledContentCardWrapper>
  );
};
