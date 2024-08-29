import { StyledFeaturesWrapper, StyledGradientLeft, StyledGradientRight } from './http-toolkit-features.styles';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { Sparkle } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import { FeatureLine } from '@/components/sections/feature-line';

export const HttpToolkitFeatures = () => {
  return (
    <Section>
      <StyledGradientRight>
        <Gradient />
      </StyledGradientRight>
      <Container>
        <StyledFeaturesWrapper>
          <FeatureLine
            $align="right"
            image={{
              darkSrc: '/images/product/intercept-dark.png',
              lightSrc: '/images/product/intercept-light.png',
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
              darkSrc: '/images/product/explore-dark.png',
              lightSrc: '/images/product/explore-light.png',
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
              darkSrc: '/images/product/breakpoint-dark.png',
              lightSrc: '/images/product/breakpoint-light.png',
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
          <FeatureLine
            $align="left"
            image={{
              darkSrc: '/images/product/send-dark.png',
              lightSrc: '/images/product/send-light.png',
            }}
            title="Send your own custom requests"
            badge={{
              text: 'Send',
              icon: Sparkle,
            }}
            list={[
              'Skim through traffic with highlighting by content type, status & source, or use powerful filtering tools to precisely match the messages that matter to you.',
              'Examine the URL, status, headers & body of each request or response, with inline explanations & docs from MDN.',
              'Dig into message bodies with highlighting & autoformatting for JSON, HTML, JS, hex and others, all using the power of Monaco, the editor from Visual Studio Code.',
            ]}
          />
        </StyledFeaturesWrapper>
      </Container>
      <StyledGradientLeft>
        <Gradient />
      </StyledGradientLeft>
    </Section>
  );
};
