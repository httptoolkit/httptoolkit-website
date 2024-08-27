import { StyledFeaturesWrapper, StyledGradientLeft, StyledGradientRight } from './mock-features.styles';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { ArrowsLeftRight, Gear, ShieldCheck, Sparkle } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { HeadingBlock } from '@/components/modules/heading-block';
import { FeatureLine } from '@/components/sections/feature-line';

export const MockResponseFeatures = () => {
  return (
    <Section>
      <StyledGradientRight>
        <Gradient />
      </StyledGradientRight>
      <Container>
        <Stack $gap="32px" $gapxl="64px">
          <HeadingBlock
            title="Test with *fully automated* mock responses"
            badgeTitle="Pro Feature"
            badgeAdditionalText="MOCK"
            badgeIcon={Sparkle}
            $align="center"
            $isContentCentered
          />
          <StyledFeaturesWrapper>
            <FeatureLine
              image={{
                darkSrc: '/images/mockup-image.webp',
                lightSrc: '/images/mockup-image-light.webp',
              }}
              title="Customize Responses with Prototyping Rules for Endpoints"
              text="Create rules to match requests and respond with your own content, to quickly prototype against new endpoints or services."
              icon={Gear}
            />
            <FeatureLine
              image={{
                darkSrc: '/images/mockup-image.webp',
                lightSrc: '/images/mockup-image-light.webp',
              }}
              title="Endpoint Management for Testing Edge Cases & Error Handling"
              text="Define new endpoints, override existing ones, or replace external services, to reproduce tricky edge cases and test your error handling."
              icon={ShieldCheck}
            />
            <FeatureLine
              image={{
                darkSrc: '/images/mockup-image.webp',
                lightSrc: '/images/mockup-image-light.webp',
              }}
              title="Shareable Mock Rulesets: Import & Export for Team Collaboration"
              text="Import & export your mock rulesets, to build complex setups and share them with your team."
              icon={ArrowsLeftRight}
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
