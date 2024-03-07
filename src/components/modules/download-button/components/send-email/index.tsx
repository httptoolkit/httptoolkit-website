import { StyledSendEmailForm, StyledSendEmailWrapper } from './send-email.styles';

import { Button } from '@/components/elements/button';
import { Text } from '@/components/elements/text';
import { Input } from '@/components/modules/input';

export const SendEmail = () => {
  return (
    <StyledSendEmailWrapper>
      <Text fontSize="s" textAlign="center" color="white">
        On mobile? Send this to your computer and try it out there:
      </Text>
      <StyledSendEmailForm>
        <Input name="email" type="email" placeholder="Enter you email" />
        <Button $variant="primary" as="button" type="submit">
          Send me a download link
        </Button>
      </StyledSendEmailForm>
      <Text fontSize="s" textAlign="center" color="darkGrey">
        No spam, just very occasional updates on major new releases.
      </Text>
    </StyledSendEmailWrapper>
  );
};