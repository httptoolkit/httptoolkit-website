import { styled } from '@linaria/react';

import { Button, type ButtonProps } from '@/components/elements/button';
import { Text } from '@/components/elements/text';
import { Input } from '@/components/modules/input';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';
import { screens } from '@/styles/tokens';

const StyledSendEmailWrapper = styled.div`
  display: flex;
  visibility: visible;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 16px;
  background: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border),
    0 0 8px 0 var(--shadow-default);

  @media (min-width: ${screens.md}) {
    display: none;
    visibility: hidden;
  }

  &&[data-is-in-header='true'] p {
    @media screen and (max-height: 700px) {
      &:first-child {
        display: block;
      }

      display: none;
    }
  }
`;

const StyledSendEmailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SendEmail = ({
  buttonProps,
  ...props
}: {
  buttonProps: Pick<ButtonProps, '$small' | '$variant' | '$withBorder'>;
}) => {
  return (
    <StyledSendEmailWrapper {...props}>
      <Text fontSize="s" textAlign="center" color="white">
        On mobile? Send a link to your computer to download HTTP Toolkit there:
      </Text>
      <StyledSendEmailForm method="POST" action={NEWSLETTER_URLS.download}>
        <div className="visually-hidden">
          <label htmlFor="extra-info">An extra form field you should ignore</label>
          <input type="text" id="extra-info" name="first-name" tab-index="-1" autoComplete="nope" />
        </div>
        <Input required id="" name="email" type="email" placeholder="Enter your email" />
        <Button {...buttonProps} $withBorder={false} type="submit">
          Send me a download link
        </Button>
      </StyledSendEmailForm>
      <Text fontSize="s" textAlign="center" color="darkGrey">
        No spam, no newsletters - just a quick & easy download link
      </Text>
    </StyledSendEmailWrapper>
  );
};
