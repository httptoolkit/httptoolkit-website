import { FeatureLine } from '../../feature-line';

import { Container } from '@/components/elements/container';
import { Sparkle } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';

export const IntegrationHttpTookitFeatures = () => {
  return (
    <Section>
      <Container>
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
        </Stack>
      </Container>
    </Section>
  );
};
