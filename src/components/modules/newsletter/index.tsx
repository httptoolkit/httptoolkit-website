'use client';

import { styled } from '@linaria/react';
import { screens, fontSizes, fontWeight } from '@/styles/tokens';

import { NEWSLETTER_URLS } from './newsletter.values';
import { Input } from '../input';

import { Button } from '@/components/elements/button';
import { Gradient } from '@/components/elements/gradient';
import { Text, type TextProps } from '@/components/elements/text';
import { useNewsletterSubmit } from '@/lib/hooks/use-newsletter-submit';

export interface StyledNewsletterProps {
  $variant?: 'default' | 'blog-short' | 'with-gradient';
}

export interface NewsletterProps extends StyledNewsletterProps {
  title: string;
  text: string;
  supportText?: string;
  buttonText?: string;
  action?: string;
}

const StyledNewsletterWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0 0 24px 0 var(--shadow-inner-box) inset;

  @media (min-width: ${screens.lg}) {
    padding: 32px;
  }

  @media (max-width: ${screens.lg}) {
    text-align: center;
  }

  background-image: var(--background-dots);
  background-repeat: repeat;
  background-size: 400px;

  &[data-variant="default"] {
    margin: 64px auto 24px;
    margin-top: 0;
    gap: 16px;
    background-image: unset;

    @media (min-width: ${screens.lg}) {
      margin: 0 auto 64px;
      gap: 24px;
      grid-template-columns: 1fr 516px;
    }
  }

  &[data-variant="with-gradient"] {
    margin: 48px auto 24px;
    gap: 24px;

    @media (min-width: ${screens.lg}) {
      grid-template-columns: 1fr 516px;
    }
  }

  &[data-variant="blog-short"] {
    gap: 24px;

    @media (min-width: ${screens.lg}) {
      padding: 24px 16px 16px;
    }
  }
`;

const StyledNewsletterGradientWrapper = styled.div`
  position: absolute;
  width: 1200px;
  bottom: -350px;
  left: -400px;
  right: -400px;
  margin: auto;

  & > div {
    z-index: 0;
  }

  &[data-variant="blog-short"] {
    @media (min-width: ${screens.lg}) {
      width: 1600px;
      bottom: unset;
      right: unset;
      left: -800px;
    }
  }

  &[data-variant="with-gradient"] {
    @media (min-width: ${screens.lg}) {
      width: 1600px;
      bottom: -600px;
      right: -700px;
      left: unset;
    }
  }
`;

const StyledNewsletterContentWrapper = styled.div`
  display: grid;
  position: relative;

  &[data-variant="default"],
  &[data-variant="with-gradient"] {
    gap: 16px;

    @media (min-width: ${screens.lg}) {
      max-width: 630px;
    }
  }

  &[data-variant="blog-short"] {
    gap: 24px;

    @media (min-width: ${screens.lg}) {
      gap: 16px;
    }
  }
`;

const StyledNewsletterTitle = styled.p`
  line-height: 1.3;
  text-align: center;

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }

  &[data-variant="default"],
  &[data-variant="with-gradient"] {
    font-size: ${fontSizes.heading.mobile.m};
    color: var(--text-light-grey);

    @media (min-width: ${screens.xl}) {
      font-size: ${fontSizes.heading.desktop.m};
    }
  }

  &[data-variant="blog-short"] {
    font-size: ${fontSizes.heading.mobile.s};
    color: var(--text-white);

    @media (min-width: ${screens.lg}) {
      font-size: ${fontSizes.heading.desktop.s};
    }
  }
`;

const StyledNewsletterFormContentWrapper = styled.div`
  display: grid;
  position: relative;
  gap: 16px;
`;

const StyledNewsletterFormWrapper = styled.form`
  display: grid;
  gap: 12px;

  & *[data-button='true'],
  *[data-badge='true'] {
    flex-shrink: 0;
  }

  @media (min-width: ${screens.lg}) {
    display: flex;
  }

  &[data-variant="blog-short"] {
    @media (min-width: ${screens.lg}) {
      display: grid;
    }

    & *[data-button='true'] {
      width: 100%;
    }
  }
`;

export const StyledNewsletterSuccess = styled.div`
  font-size: ${fontSizes.button.default};
  font-weight: ${fontWeight.medium};
  color: var(--text-white);
  line-height: 1;
  text-align: center;
  padding: 16px 24px;
  border-radius: 12px;
  background: var(--electric-blue);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0 0 8px 0 var(--shadow-default);
`;

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
    <StyledNewsletterWrapper data-variant={$variant}>
      {$variant !== 'default' && (
        <StyledNewsletterGradientWrapper data-variant={$variant}>
          <Gradient $shape="full" />
        </StyledNewsletterGradientWrapper>
      )}
      <StyledNewsletterContentWrapper data-variant={$variant}>
        <StyledNewsletterTitle data-variant={$variant}>{title}</StyledNewsletterTitle>
        {text && (
          <Text fontSize={TextSize} color={TextColor} fontWeight="normal">
            {text}
          </Text>
        )}
      </StyledNewsletterContentWrapper>
      <StyledNewsletterFormContentWrapper>
        {$variant !== 'blog-short' && (
          <Text fontSize="m" color={SupportColor} fontWeight={SupportWeight}>
            {supportText}
          </Text>
        )}
        {isSuccess && <StyledNewsletterSuccess>Thanks for subscribing!</StyledNewsletterSuccess>}
        <StyledNewsletterFormWrapper
          data-variant={$variant}
          onSubmit={handleSubmit}
          method="POST"
          action={action}
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
