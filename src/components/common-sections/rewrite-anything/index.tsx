import { StyledCardsWrapper } from './rewrite-anything.styles';

import { Container } from '@/components/elements/container';
import { Sparkle } from '@/components/elements/icon';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { Card } from '@/components/modules/card';
import { HeadingBlock } from '@/components/modules/heading-block';

export const RewriteAnything = () => {
  return (
    <Section>
      <Container>
        <Stack $gap="32px" $gapxl="64px">
          <HeadingBlock
            title="Rewrite *anything*"
            badgeTitle="Pro Feature"
            badgeAdditionalText="EDIT"
            badgeIcon={Sparkle}
            $align="center"
            $isContentCentered
          />
          <StyledCardsWrapper>
            <Card
              title="Simulate Network Issues & Redirect Traffic"
              text="Inject request timeouts, simulate connection failures, and silently redirect requests from one server to another. These features also ensure API stability and failover efficacy."
              darkImage="/images/illustration.svg"
              lightImage="/images/illustration-light.svg"
            />
            <Card
              title="Targeted Request Handling: Proxy & Mock Server Capabilities"
              text="Precise matching lets you target the requests you care about. Match any requests sent anywhere by using HTTP Toolkit as a proxy, send requests directly to use it as a mock server."
              darkImage="/images/illustration-1.svg"
              lightImage="/images/illustration-1-light.svg"
            />
          </StyledCardsWrapper>
        </Stack>
      </Container>
    </Section>
  );
};
