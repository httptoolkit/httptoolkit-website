import { Suspense } from 'react';

import { CapturePurchaseEvent } from './capture-purchase-event';
import {
  StyledThankYouColumnContent,
  StyledThankYouColumns,
  StyledGradientBottom,
  StyledTextContent,
  StyledThankYouSection,
  StyledSectionCTAWrapper,
} from './thank-you.styles';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { StyledHideElementOn } from '@/components/elements/hide-on/hide-on';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { LandingLayout } from '@/components/layout/landing-layout';
import { ContentCard } from '@/components/modules/content-card';
import { DownloadButton } from '@/components/modules/download-button';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';
import { CTA } from '@/components/sections/cta';

export default function WebPurchaseThankYouPage() {
  return (
    <LandingLayout>
      <Suspense>
        <CapturePurchaseEvent />
      </Suspense>
      <div>
        <StyledHideElementOn $hideOn="desktop">
          <StyledSectionCTAWrapper>
            <CTA
              heading="Thanks for your purchase!"
              withDownload={false}
              image={{
                darkSrc: '/images/product/explore-dark.png',
                lightSrc: '/images/product/explore-light.png',
                withBorderAnimation: true,
                loading: 'eager',
              }}
            />
          </StyledSectionCTAWrapper>
        </StyledHideElementOn>
        <StyledThankYouSection>
          <Container>
            <StyledThankYouColumns>
              <StyledThankYouColumnContent>
                <StyledTextContent>
                  <Stack $gapxl="48px">
                    <Stack $gapxl="32px">
                      <Stack $gapxl="24px">
                        <StyledHideElementOn $hideOn="mobile">
                          <Heading fontSize="l" color="textGradient">
                            Thanks for your purchase!
                          </Heading>
                        </StyledHideElementOn>
                        <Text fontSize="m" fontWeight="normal" color="darkGrey">
                          To get started, download & launch HTTP Toolkit, click &apos;Get Pro&apos; then &apos;Log into
                          existing account&apos;, and enter your email.
                        </Text>
                      </Stack>
                      <DownloadButton $withBorder $variant="primary" />
                    </Stack>

                    <ContentCard
                      title="Join the mailing list now, so you don't miss new features & releases"
                      text="There's a lot of new HTTP Toolkit features coming soon, like full scripting support, gRPC & GraphQL integration, and request diffing tools. Keep yourself up to date:"
                      $isNewsletter
                      action={NEWSLETTER_URLS.download}
                    />
                  </Stack>
                </StyledTextContent>
              </StyledThankYouColumnContent>
              <StyledHideElementOn $hideOn="mobile">
                <ThemedImage
                  withBorder
                  alt="Frida Mobile Interception Scripts"
                  darkSrc="/images/product/explore-dark.png"
                  lightSrc="/images/product/explore-light.png"
                  loading="eager"
                  width={662}
                  height={450}
                />
              </StyledHideElementOn>
            </StyledThankYouColumns>
          </Container>
        </StyledThankYouSection>
        <StyledGradientBottom />
      </div>
    </LandingLayout>
  );
}
