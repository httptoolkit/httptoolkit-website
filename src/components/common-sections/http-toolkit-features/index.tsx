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
            title="Intercept HTTP with zero setup"
            badge={{
              text: 'Capture',
              icon: Sparkle,
            }}
            list={[
              'Capture HTTP(S) with zero hassle, with one-click interception for a huge range of tools and platforms.',
              'Precisely target your interception, to capture all traffic from a single client without the noise and interference of intercepting your entire computer.',
              'Intercept individual Android or iOS apps, entire devices, Docker containers, browser windows, backend processes like Node.js, Java, Python or Ruby, terminal sessions...',
              'Alternatively, just connect any client manually to HTTP Toolkit as an HTTP proxy, fully compatible with HTTP requests from anywhere.'
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
              'Hunt through traffic quickly & effectively, with content-type and source categorization, plus powerful filtering tools to precisely match the messages that matter.',
              'Examine the URL, status, headers & body of each message, with built-in parsing of parameters, and explanations & docs from MDN for all standard headers.',
              'Dig into message bodies with highlighting & autoformatting for JSON, Protobuf, Base64, HTML, XML, JS, hex and more, all built on top of Monaco - the editing tools from Visual Studio Code.',
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
              'Use breakpoints to pause in-flight HTTP traffic for manual editing.',
              'Configure fine-grained matching logic to jump to exactly the cases you care about.',
              'Redirect requests to another URL, update the method, headers or status, or edit the body.',
              'Or get more involved and respond to requests without forwarding them, or even just hard-close connections directly.',
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
              'Send your own requests directly, to explore APIs or test out different request parameters.',
              'Use the fully featured HTTP client to define every aspect of your request, with automatic handling of details like body compression and message framing.',
              'Explore sent requests & their responses with all the tools & power HTTP Toolkit offers for debugging intercepted traffic.',
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
