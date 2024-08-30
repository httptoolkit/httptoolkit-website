import { StyledFeaturesWrapper, StyledGradientLeft, StyledGradientRight } from './modify-features.styles';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { ArrowsLeftRight, Gear, NetworkSlash, Sparkle } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { HeadingBlock } from '@/components/modules/heading-block';
import { FeatureLine } from '@/components/sections/feature-line';

export const ModifyFeatures = () => {
  return (
    <Section>
      <StyledGradientRight>
        <Gradient />
      </StyledGradientRight>
      <Container>
        <Stack $gap="32px" $gapxl="64px">
          <HeadingBlock
            title="Test with *fully automated* rewrite rules"
            badgeTitle="Pro Feature"
            badgeAdditionalText="Modify"
            badgeIcon={Sparkle}
            $align="center"
            $isContentCentered
          />
          <StyledFeaturesWrapper>
            <FeatureLine
              image={{
                darkSrc: '/images/product/mock-dark.png',
                lightSrc: '/images/product/mock-light.png',
              }}
              title="Inject mock responses for prototyping and testing"
              text="Precisely match interesting requests, then define your own static response or map local files, to test clients against any endpoint behaviour you can imagine. Use it to override real responses, or even to simulate responses from endpoints or entire servers that don't exist yet."
              icon={Gear}
            />
            <FeatureLine
              image={{
                darkSrc: '/images/product/organize-dark.png',
                lightSrc: '/images/product/organize-light.png',
              }}
              title="Build, curate & share rulesets"
              text="Create rules in one click from intercepted traffic, tune to perfection, then use rule groups & custom aliases to quickly organize rules and toggle behaviours. Once they're perfect, export rules to share with your team or store as your own private library."
              icon={ArrowsLeftRight}
            />
            <FeatureLine
              image={{
                darkSrc: '/images/product/errors-dark.png',
                lightSrc: '/images/product/errors-light.png',
              }}
              title="Transform, redirect & inject errors"
              text="Redirect production sites to local test servers, or block requests with connection resets, timeouts & failing status codes. Want a real response from a target server, but different? Dynamically transform requests or response to inject headers (goodbye CORS errors), match/replace body content, patch JSON bodies, and more."
              icon={NetworkSlash}
            />
          </StyledFeaturesWrapper>
        </Stack>
      </Container>
      <StyledGradientLeft>
        <Gradient />
      </StyledGradientLeft>
    </Section>
  );
};
