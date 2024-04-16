import { StyledSendEmailForm, StyledSendEmailWrapper } from './send-email.styles';

import { Button } from '@/components/elements/button';
import type { ButtonProps } from '@/components/elements/button/button.types';
import { Text } from '@/components/elements/text';
import { Input } from '@/components/modules/input';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';

export const SendEmail = ({
  buttonProps,
  ...props
}: {
  buttonProps: Pick<ButtonProps, '$small' | '$variant' | '$withBorder'>;
}) => {
  return (
    <StyledSendEmailWrapper {...props}>
      <Text fontSize="s" textAlign="center" color="white">
        On mobile? Send this to your computer and try it out there:
      </Text>
      <StyledSendEmailForm method="POST" action={NEWSLETTER_URLS.download}>
        <div className="visually-hidden">
          <label htmlFor="extra-info">An extra form field you should ignore</label>
          <input type="text" id="extra-info" name="first-name" tab-index="-1" autoComplete="nope" />
        </div>
        <Input required id="" name="email" type="email" placeholder="Enter you email" />
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
