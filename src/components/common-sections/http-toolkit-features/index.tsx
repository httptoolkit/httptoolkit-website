import { StyledFeaturesWrapper, StyledGradientLeft, StyledGradientRight } from './http-toolkit-features.styles';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { Sparkle } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { HeadingBlock } from '@/components/modules/heading-block';
import { FeatureLine } from '@/components/sections/feature-line';

export const HttpToolkitFeatures = () => {
  return (
    <Section>
      <StyledGradientRight>
        <Gradient />
      </StyledGradientRight>
      <Container>
        <Stack $gap="32px" $gapxl="64px">
          <HeadingBlock
            title="What is *HTTP Toolkit*?"
            text="HTTP Toolkit is an open-source tool for debugging, testing and building with HTTP on Windows, Linux & Mac."
            $align="center"
            $isContentCentered
          />
          <StyledFeaturesWrapper>
            <FeatureLine
              $align="right"
              image={{
                darkSrc: '/images/mockup-image.webp',
                lightSrc: '/images/mockup-image-light.webp',
              }}
              title="Seamless Traffic Interception"
              badge={{
                text: 'Intercept',
                icon: Sparkle,
              }}
              list={[
                'Experience unmatched control with the Intercept feature, allowing you to seamlessly capture and analyze network traffic in real-time.',
                "Tailor your network's behavior by modifying requests and responses on the fly, ensuring thorough testing and debugging.",
                "Intercept offers a direct window into your application's communication, providing clarity and precision in your development process.",
              ]}
            />
            <FeatureLine
              $align="left"
              image={{
                darkSrc: '/images/mockup-image.webp',
                lightSrc: '/images/mockup-image-light.webp',
              }}
              title="Explore, search & examine HTTP"
              badge={{
                text: 'inspect',
                icon: Sparkle,
              }}
              list={[
                'Skim through traffic with highlighting by content type, status & source, or use powerful filtering tools to precisely match the messages that matter to you.',
                'Examine the URL, status, headers & body of each request or response, with inline explanations & docs from MDN.',
                'Dig into message bodies with highlighting & autoformatting for JSON, HTML, JS, hex and others, all using the power of Monaco, the editor from Visual Studio Code.',
              ]}
            />
            <FeatureLine
              $align="right"
              image={{
                darkSrc: '/images/mockup-image.webp',
                lightSrc: '/images/mockup-image-light.webp',
              }}
              title="Pause & edit live HTTP traffic"
              badge={{
                text: 'breakpoint',
                icon: Sparkle,
              }}
              list={[
                'Skim through traffic with highlighting by content type, status & source, or use powerful filtering tools to precisely match the messages that matter to you.',
                'Examine the URL, status, headers & body of each request or response, with inline explanations & docs from MDN.',
                'Dig into message bodies with highlighting & autoformatting for JSON, HTML, JS, hex and others, all using the power of Monaco, the editor from Visual Studio Code.',
              ]}
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
