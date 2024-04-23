import { StyledFeaturesHeadingWrapper, StyledGradientLeft, StyledGradientRight } from './http-toolkit-features.styles';
import { FeatureLine } from '../../feature-line';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { Sparkle } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';

export const HttpToolkitFeatures = () => {
  return (
    <Section>
      <StyledGradientRight>
        <Gradient />
      </StyledGradientRight>
      <Container>
        <StyledFeaturesHeadingWrapper>
          <AltHeadingBlock
            subtitle="what is http toolkit?"
            title="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
            mediumHeading
          />
        </StyledFeaturesHeadingWrapper>
        <Stack $gapxl="96px" $gap="32px">
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
              'Precisely match requests, jump to them when they appear, and edit anything: the target URL, method, headers or body.',
              'Manually respond directly to requests as they arrive, or pass them upstream, and pause & edit the real response on the way back.',
              'Step through HTTP traffic request by request, or manually mock endpoints and errors.',
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
        </Stack>
      </Container>
      <StyledGradientLeft>
        <Gradient />
      </StyledGradientLeft>
    </Section>
  );
};
