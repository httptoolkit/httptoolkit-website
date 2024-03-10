import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { ContactForm } from '@/components/sections/contact-form';

export default function ContactPage() {
  return (
    <Container>
      <Heading color="textGradient">Get in touch</Heading>
      <ContactForm />
    </Container>
  );
}
