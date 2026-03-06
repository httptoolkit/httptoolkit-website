import { Suspense } from 'react';

import { styled } from '@linaria/react';

import { CapturePurchaseEvent } from './capture-purchase-event';
import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { StyledHideElementOn } from '@/components/elements/hide-on/hide-on';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { LandingLayout } from '@/components/layout/landing-layout';
import { ContentCard } from '@/components/modules/content-card';
import { DownloadButton } from '@/components/modules/download-button';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';
import { CTA } from '@/components/sections/cta';
import { screens } from '@/styles/tokens';

export const StyledThankYouSection = styled(Section)`
  padding-top: 16px;
  padding-bottom: calc(64px + 32px);

  @media (min-width: ${screens['2xl']}) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;

export const StyledThankYouColumns = styled.div`
  display: flex;
  gap: 64px;

  @media (min-width: ${screens['lg']}) {
    gap: 96px;
  }
`;

export const StyledThankYouColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${screens['lg']}) {
    max-width: 586px;
    width: 100%;
    flex-shrink: 0;
  }
`;

export const StyledGradientBottom = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: -1;
  transform: rotate(180deg);
  pointer-events: none;
  user-select: none;

  &:before {
    content: '';
    position: absolute;
    top: calc(-100vh);
    bottom: 0;
    right: 0;
    width: 100%;
    height: auto;
    background: radial-gradient(circle at left, var(--circle-gradient) 0%, transparent 30%),
      radial-gradient(ellipse 70% 45% at left, var(--ellipse-gradient) 0%, transparent 70%);
    background-size: contain;
    opacity: 0.22;
  }

  display: none;

  & > div {
    opacity: 0.2;
  }

  @media (min-width: ${screens['lg']}) {
    display: block;
  }
`;

export const StyledSectionCTAWrapper = styled.div`
  & section[data-cta='true'] {
    padding-bottom: 0 !important;

    h1 {
      margin-bottom: 19px;
    }
  }
`;

export const StyledTextContent = styled.div`
  text-align: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  gap: 8px;

  @media (min-width: ${screens['lg']}) {
    text-align: left;
  }
`;

export default function WebPurchaseThankYouPage() {
  return (
    <LandingLayout>
      <Suspense>
        <CapturePurchaseEvent />
      </Suspense>
      <div>
        <StyledHideElementOn data-hide-above="md">
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
                  <Stack gapxl="48px">
                    <Stack gapxl="32px">
                      <Stack gapxl="24px">
                        <StyledHideElementOn data-hide-below="md">
                          <Heading fontSize="l" color="textGradient">
                            Thanks for your purchase!
                          </Heading>
                        </StyledHideElementOn>
                        <Text fontSize="m" fontWeight="normal" color="darkGrey">
                          To get started, download & launch HTTP Toolkit, click &apos;Get Pro&apos; then &apos;Log into
                          existing account&apos;, and enter your email.
                        </Text>
                      </Stack>
                      <DownloadButton withBorder variant="primary" />
                    </Stack>

                    <ContentCard
                      title="Join the mailing list now, so you don't miss new features & releases"
                      text="There's a lot of new HTTP Toolkit features coming soon, like full scripting support, gRPC & GraphQL integration, and request diffing tools. Keep yourself up to date:"
                      newsletter={{ action: NEWSLETTER_URLS.default, source: 'web-purchase-thank-you' }}
                    />
                  </Stack>
                </StyledTextContent>
              </StyledThankYouColumnContent>
              <StyledHideElementOn data-hide-below="md">
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
