import { styled } from '@linaria/react';

import { Button } from '@/components/elements/button';
import Stack from '@/components/elements/stack';
import { Input } from '@/components/modules/input';
import { screens } from '@/styles/tokens';

const StyledContactFormWrapper = styled.div`
  padding: 16px;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border),
    0 0 8px 0 var(--shadow-default),
    0 0 24px 0px rgba(128, 130, 137, 0.1) inset;
  border-radius: 16px;

  @media (min-width: ${screens['lg']}) {
    padding: 32px;
    max-width: 624px;
  }
`;

interface ContactFormProps {
  action?: string;
  submitLabel?: string;
  defaultValues?: {
    name?: string;
    email?: string;
    message?: string;
  };
  placeholders?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export const ContactForm = ({
  action = 'https://accounts.httptoolkit.tech/api/contact-form',
  submitLabel = 'Submit the form',
  defaultValues,
  placeholders,
}: ContactFormProps) => {
  return (
    <StyledContactFormWrapper>
      <form action={action} method="POST">
        <Stack gapxl="32px">
          <Stack gapxl="16px">
            <Input
              label="Your Name"
              id="name"
              placeholder={placeholders?.name ?? 'e.g. Holly Smith'}
              required
              type="text"
              defaultValue={defaultValues?.name}
            />
            <Input
              label="Email"
              id="email"
              placeholder={placeholders?.email ?? 'e.g. holly.smith@example.com'}
              required
              type="email"
              defaultValue={defaultValues?.email}
            />
            <Input
              label="Message"
              id="message"
              as="textarea"
              placeholder={placeholders?.message ?? 'Your message...'}
              required
              defaultValue={defaultValues?.message}
            />
            <div style={{ display: 'none' }}>
              <Input
                label="Phone number (this should be invisible - don't complete it)"
                id="phone"
                type="text"
                value=""
                placeholder="If you're a real person, leave this empty"
              />
            </div>
          </Stack>
          <Button type="submit" isFluid>
            {submitLabel}
          </Button>
        </Stack>
      </form>
    </StyledContactFormWrapper>
  );
};
