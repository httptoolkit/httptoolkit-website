import {
  StyledThankYouColumnContent,
  StyledThankYouColumns,
  StyledGradientBottom,
  StyledTextContent,
  StyledThankYouSection,
  StyledSectionCTAWrapper,
} from '../web-purchase-thank-you/thank-you.styles';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { StyledHideElementOn } from '@/components/elements/hide-on/hide-on';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { LandingLayout } from '@/components/layout/landing-layout';
import { ContentCard } from '@/components/modules/content-card';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';
import { CTA } from '@/components/sections/cta';

export default function AppPurchaseThankYouPage() {
  return (
    <LandingLayout>
      <div>
        <StyledHideElementOn $hideAbove="md">
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
                  <Stack>
                    <Stack $gapxl="32px">
                      <Stack $gapxl="24px">
                        <StyledHideElementOn $hideBelow="md">
                          <Heading fontSize="l" color="textGradient">
                            Thanks for your purchase!
                          </Heading>
                        </StyledHideElementOn>
                        <Text fontSize="m" fontWeight="normal" color="darkGrey">
                          You&apos;re all done, just go back to the HTTP Toolkit app to get started with access to all
                          the advanced features HTTP Toolkit has to offer.
                        </Text>
                      </Stack>
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
              <StyledHideElementOn $hideBelow="md">
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
