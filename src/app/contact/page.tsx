import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { GithubLogo } from '@/components/elements/icon';
import { ContentCard } from '@/components/modules/content-card';
import { ContactForm } from '@/components/sections/contact-form';
import { TextSlot } from '@/components/sections/text-slot';

export default function ContactPage() {
  return (
    <Container>
      <Heading color="textGradient">Contact</Heading>
      <div>
        <TextSlot
          title="Frida Mobile Interception Scripts"
          texts={[
            '**Frida scripts to directly MitM all HTTPS traffic from a target mobile application.**',
            '**This repo contains Frida scripts designed to do everything required for fully automated HTTPS MitM interception on mobile devices.**\n\nThis set of scripts can be used all together, to handle interception, manage certificate trust & disable certificate pinning & transparency checks, for MitM interception of HTTP(S) traffic on Android and iOS, or they can be used and tweaked independently to hook just specific features.',
          ]}
          buttons={[
            {
              $variant: 'primary',
              children: 'Get Started!',
              as: 'link',
              href: '/',
            },
            {
              $variant: 'secondary',
              children: 'Getting Started Guide',
              as: 'link',
              href: 'https://github.com',
              icon: GithubLogo,
            },
          ]}
          copy={{
            command: 'brew install --cask http-toolkit',
            subtitle: 'Copy & run the above to install HTTP Toolkit.',
          }}
        >
          <ContentCard
            title="Having issues?"
            text="Head to the GitHub issue repo, as many questions and bugs already have answers there, and new bugs or feature requests posted there get more feedback & support from the wider community."
            buttonText="Github HTTP Toolkit"
            buttonIcon={GithubLogo}
            buttonHref="https://github.com/httptoolkit/httptoolkit-website"
          />
        </TextSlot>
        <div></div>
      </div>
      <Heading color="textGradient">Get in touch</Heading>
      <ContactForm />
    </Container>
  );
}
