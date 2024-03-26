'use client';

import {
  StyledNewsletterContentWrapper,
  StyledNewsletterFormContentWrapper,
  StyledNewsletterFormWrapper,
  StyledNewsletterGradientWrapper,
  StyledNewsletterSuccess,
  StyledNewsletterTitle,
  StyledNewsletterWrapper,
} from './newsletter.styles';
import type { NewsletterProps } from './newsletter.types';
import { NEWSLETTER_URLS } from './newsletter.values';
import { Input } from '../input';

import { Button } from '@/components/elements/button';
import { Gradient } from '@/components/elements/gradient';
import { Text } from '@/components/elements/text';
import type { TextProps } from '@/components/elements/text/text.types';
import { useNewsletterSubmit } from '@/lib/hooks/use-newsletter-submit';

export function Newsletter({
  $variant = 'default',
  title,
  text,
  supportText,
  buttonText = 'Sign up',
  action = NEWSLETTER_URLS.default,
}: NewsletterProps) {
  const TextSize: TextProps['fontSize'] = $variant === 'blog-short' ? 'l' : 'm';
  const TextColor: TextProps['color'] = $variant === 'blog-short' ? 'white' : 'darkGrey';
  const SupportWeight: TextProps['fontWeight'] = $variant === 'with-gradient' ? 'bold' : 'normal';
  const SupportColor: TextProps['color'] = $variant === 'with-gradient' ? 'white' : 'darkGrey';

  const [isSuccess, handleSubmit] = useNewsletterSubmit();

  return (
    <StyledNewsletterWrapper $variant={$variant}>
      {$variant !== 'default' && (
        <StyledNewsletterGradientWrapper $variant={$variant}>
          <Gradient $shape="full" />
        </StyledNewsletterGradientWrapper>
      )}
      <StyledNewsletterContentWrapper $variant={$variant}>
        <StyledNewsletterTitle $variant={$variant}>{title}</StyledNewsletterTitle>
        {text && (
          <Text fontSize={TextSize} color={TextColor} fontWeight="normal">
            {text}
          </Text>
        )}
      </StyledNewsletterContentWrapper>
      <StyledNewsletterFormContentWrapper $variant={$variant}>
        {$variant !== 'blog-short' && (
          <Text fontSize="m" color={SupportColor} fontWeight={SupportWeight}>
            {supportText}
          </Text>
        )}
        {isSuccess && <StyledNewsletterSuccess>Thanks for subscribing!</StyledNewsletterSuccess>}
        <StyledNewsletterFormWrapper
          $variant={$variant}
          onSubmit={handleSubmit}
          method="POST"
          action={action}
          target="_blank"
          className={isSuccess ? 'visually-hidden' : ''}
        >
          <div className="visually-hidden">
            <label htmlFor="extra-info">An extra form field you should ignore</label>
            <input type="text" id="extra-info" name="first-name" tab-index="-1" autoComplete="nope" />
          </div>
          <Input required id="email" type="email" placeholder="Email address" />
          <Button $variant="secondary" $small type="submit">
            {buttonText}
          </Button>
        </StyledNewsletterFormWrapper>
      </StyledNewsletterFormContentWrapper>
    </StyledNewsletterWrapper>
  );
}
