import {
  StyledButtonsWrapper,
  StyledFridaColumnContent,
  StyledFridaColumns,
  StyledGradientBottom,
} from './frida.styles';

import { Button } from '@/components/elements/button';
import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { GithubLogo } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { LandingLayout } from '@/components/layout/landing-layout';

export default async function FridaPage() {
  return (
    <LandingLayout>
      <Section>
        <Container>
          <StyledFridaColumns>
            <StyledFridaColumnContent>
              <Heading fontSize="l" color="textGradient">
                Frida Mobile Interception Scripts
              </Heading>
              <Text fontSize="m" fontWeight="bold">
                Frida scripts to directly MitM all HTTPS traffic from a target mobile application.
              </Text>
              <Stack $gapxl="8px">
                <Text fontSize="m" fontWeight="bold">
                  This repo contains Frida scripts designed to do everything required for fully automated HTTPS MitM
                  interception on mobile devices.
                </Text>
                <Text fontSize="m">
                  This set of scripts can be used all together, to handle interception, manage certificate trust &
                  disable certificate pinning & transparency checks, for MitM interception of HTTP(S) traffic on Android
                  and iOS, or they can be used and tweaked independently to hook just specific features.
                </Text>
              </Stack>
              <StyledButtonsWrapper>
                <Button
                  target="_blank"
                  href="https://github.com/httptoolkit/frida-js/tree/3a0b4f95a953058420c5e118dd73e33f465358ed?tab=readme-ov-file#getting-started"
                >
                  Get Started
                </Button>
                <Button
                  target="_blank"
                  $variant="secondary"
                  icon={GithubLogo}
                  href="https://github.com/httptoolkit/frida-js/tree/3a0b4f95a953058420c5e118dd73e33f465358ed?tab=readme-ov-file#getting-started"
                >
                  Getting Started Guide
                </Button>
              </StyledButtonsWrapper>
            </StyledFridaColumnContent>
            <ThemedImage
              withBorder
              alt="Frida Mobile Interception Scripts"
              darkSrc="/images/hero-placeholder-dark.webp"
              lightSrc="/images/hero-placeholder-light.webp"
              loading="eager"
            />
          </StyledFridaColumns>
        </Container>
      </Section>
      <StyledGradientBottom />
    </LandingLayout>
  );
}
