import { StyledContactFormWrapper } from './contact-form.styles';

import { Button } from '@/components/elements/button';
import Stack from '@/components/elements/stack';
import { Input } from '@/components/modules/input';

export const ContactForm = () => {
  return (
    <StyledContactFormWrapper>
      {/* TODO: Replace test formspree with the client endpoint after QA */}
      <form action="https://formspree.io/f/xnqezbgv" method="POST">
        <Stack $gapxl="32px">
          <Stack $gapxl="16px">
            <Input label="Your Name" id="name" placeholder="e.g. Holly Smith" required type="text" />
            <Input label="Email" id="email" placeholder="e.g. holly.smith@gmail.com" required type="email" />
            <Input
              label="Message"
              id="message"
              as="textarea"
              placeholder="Please share your message with us"
              required
            />
          </Stack>
          <Button type="submit" $isFluid>
            Submit the form
          </Button>
        </Stack>
      </form>
    </StyledContactFormWrapper>
  );
};
