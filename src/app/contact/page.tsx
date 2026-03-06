import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';
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

const StyledContactPageColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;

  @media (min-width: ${screens['lg']}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 96px;
  }
`;

const StyledContactColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;

  @media (min-width: ${screens['lg']}) {
    gap: 64px;
  }
`;

const StyledGradientLeft = styled.div`
  position: absolute;
  max-width: 100%;
  top: -180px;
  left: 0;
  height: 780px;

  pointer-events: none;

  @media (min-width: ${screens['lg']}) {
    top: -7px;
  }
`;

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
              <Stack gap="32px" gapxl="24px">
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
