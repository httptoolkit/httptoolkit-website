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
                  Encountering a licensing, billing, or technical concern? Providing feedback on a beta feature?
                  Inquiring about specifics regarding our Business plan? Feel free to inform us, and we&apos;ll assist
                  you promptl
                </Text>
              </Stack>
              <ContentCard
                title="Having issues?"
                text="Head to the GitHub issue repo, as many questions and bugs already have answers there, and new bugs or feature requests posted there get more feedback & support from the wider community."
                button={{
                  children: 'Github HTTP Toolkit',
                  href: 'https://github.com/httptoolkit/httptoolkit-website',
                  icon: GithubLogo,
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
