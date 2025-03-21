import type { Metadata } from 'next/types';

import {
  StyledButtonsWrapper,
  StyledFridaColumnContent,
  StyledFridaColumns,
  StyledGradientBottom,
  StyledMobileText,
  StyledSectionCTAWrapper,
  StyledTextContent,
  StyledFridaSection,
} from './frida.styles';

import { Button } from '@/components/elements/button';
import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { StyledHideElementOn } from '@/components/elements/hide-on/hide-on';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { LandingLayout } from '@/components/layout/landing-layout';
import { CTA } from '@/components/sections/cta';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Frida scripts to directly MitM all HTTPS traffic from a target mobile application.',
});

export default async function FridaPage() {
  return (
    <LandingLayout>
      <div>
        <StyledHideElementOn $hideAbove="md">
          <StyledSectionCTAWrapper>
            <CTA
              heading="Frida Mobile Interception Scripts"
              withDownload={false}
              image={{
                darkSrc: '/images/frida-repo-dark.png',
                lightSrc: '/images/frida-repo-light.png',
                withBorderAnimation: true,
                loading: 'eager',
              }}
            >
              <StyledMobileText>
                <Text fontSize="m" fontWeight="bold">
                  Frida scripts to directly MitM all HTTPS traffic from a target mobile application.
                </Text>
              </StyledMobileText>
            </CTA>
          </StyledSectionCTAWrapper>
        </StyledHideElementOn>
        <StyledFridaSection>
          <Container>
            <StyledFridaColumns>
              <StyledFridaColumnContent>
                <StyledHideElementOn $hideBelow="md">
                  <Stack $gapxl="24px">
                    <Heading fontSize="l" color="textGradient">
                      Frida Mobile Interception Scripts
                    </Heading>
                    <Text fontSize="m" fontWeight="bold">
                      Frida scripts to directly MitM all HTTPS traffic from a target mobile application.
                    </Text>
                  </Stack>
                </StyledHideElementOn>
                <StyledTextContent>
                  <Text fontSize="m" fontWeight="bold">
                    This repo contains Frida scripts designed to do everything required for fully automated HTTPS MitM
                    interception on mobile devices.
                  </Text>
                  <Text fontSize="m">
                    This set of scripts can be used all together, to handle interception, manage certificate trust &
                    disable certificate pinning & transparency checks, for MitM interception of HTTP(S) traffic on
                    Android and iOS, or they can be used and tweaked independently to hook just specific features.
                  </Text>
                </StyledTextContent>
                <StyledButtonsWrapper>
                  <Button
                    target="_blank"
                    href="https://github.com/httptoolkit/frida-interception-and-unpinning/#readme"
                  >
                    Get Started
                  </Button>
                </StyledButtonsWrapper>
              </StyledFridaColumnContent>
              <StyledHideElementOn $hideBelow="md">
                <ThemedImage
                  withBorder
                  alt="Frida Mobile Interception Scripts"
                  darkSrc="/images/frida-repo-dark.png"
                  lightSrc="/images/frida-repo-light.png"
                  loading="eager"
                  width={662}
                  height={450}
                  sizes="(max-width: 600px) 50vw, 75vw"
                />
              </StyledHideElementOn>
            </StyledFridaColumns>
          </Container>
        </StyledFridaSection>
        <StyledGradientBottom />
      </div>
    </LandingLayout>
  );
}
