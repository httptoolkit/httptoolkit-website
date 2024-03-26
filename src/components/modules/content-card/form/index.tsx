'use client';

import { Input } from '../../input';
import { StyledNewsletterSuccess } from '../../newsletter/newsletter.styles';
import { StyledContentCardForm } from '../content-card.styles';
import type { ContentCardProps } from '../content-card.types';

import { Button } from '@/components/elements/button';
import { Text } from '@/components/elements/text';
import { useNewsletterSubmit } from '@/lib/hooks/use-newsletter-submit';

export const ContentCardForm = ({ action }: Pick<ContentCardProps, 'action'>) => {
  const [isSuccess, handleSubmit] = useNewsletterSubmit();
  return (
    <>
      {isSuccess && <StyledNewsletterSuccess>Thanks for subscribing!</StyledNewsletterSuccess>}
      <StyledContentCardForm
        method="POST"
        action={action}
        target="_blank"
        onSubmit={handleSubmit}
        className={isSuccess ? 'visually-hidden' : ''}
      >
        <div className="visually-hidden">
          <label htmlFor="extra-info">An extra form field you should ignore</label>
          <input type="text" id="extra-info" name="first-name" tab-index="-1" autoComplete="nope" />
        </div>
        <Input id="email" placeholder="Email address" type="email" required />
        <Button as="button" type="submit" $variant="secondary" $small>
          Sign up
        </Button>
      </StyledContentCardForm>
      <Text color="darkGrey" fontSize="m">
        No spam, just very occasional updates on major new releases.
      </Text>
    </>
  );
};
