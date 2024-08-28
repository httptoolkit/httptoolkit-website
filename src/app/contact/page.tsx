import { StyledContactColumnContent, StyledContactPageColumns, StyledGradientLeft } from './contact.styles';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { GithubLogo } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { LandingLayout } from '@/components/layout/landing-layout';
import { ContentCard } from '@/components/modules/content-card';
import { ContactForm } from '@/components/sections/contact-form';

export default function ContactPage() {
  return (
    <LandingLayout>
      <Section>
        <StyledGradientLeft>
          <Gradient />
        </StyledGradientLeft>
        <Container>
          <StyledContactPageColumns>
            <StyledContactColumnContent>
              <Stack $gap="32px" $gapxl="24px">
                <Heading fontSize="l" color="textGradient">
                  Get in touch
                </Heading>
                <Text fontSize="m">
                  Interested in signing up for a Team account? Encountered a licensing question, or having billing issues? Send a message to discuss the topic directly.
                </Text>
              </Stack>
              <ContentCard
                title="Having issues with HTTP Toolkit?"
                text="If you have questions, ideas or issues related to HTTP Toolkit itself, it's best to head to the GitHub repo, as many topics are already covered there, and new bugs or feature requests posted there will get more feedback & support from the wider community."
                button={{
                  children: 'HTTP Toolkit on GitHub',
                  href: 'https://github.com/httptoolkit/httptoolkit/issues/new/choose',
                  icon: GithubLogo
                }}
              />
            </StyledContactColumnContent>

            <ContactForm />
          </StyledContactPageColumns>
        </Container>
      </Section>
    </LandingLayout>
  );
}
