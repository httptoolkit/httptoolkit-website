import {
  StyledIntegrationBentoCTAWrapper,
  StyledIntegrationBentoCardsColumn,
  StyledIntegrationBentoContentWrapper,
  StyledIntegrationBentoGradientWrapper,
  StyledIntegrationBentoHeadingWrapper,
  StyledIntegrationBentoPhone,
  StyledIntegrationBentoWrapper,
} from './bento.styles';
import type { IntegrationBentoProps } from './bento.types';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';
import { FluidCard } from '@/components/modules/fluid-card';

export const IntegrationBento = ({ title, subtitle, cards }: IntegrationBentoProps) => {
  return (
    <StyledIntegrationBentoWrapper>
      <StyledIntegrationBentoGradientWrapper>
        <Gradient $shape="full" />
      </StyledIntegrationBentoGradientWrapper>
      <Container>
        <StyledIntegrationBentoHeadingWrapper>
          <AltHeadingBlock title={title} subtitle={subtitle} mediumHeading />
        </StyledIntegrationBentoHeadingWrapper>
        <StyledIntegrationBentoContentWrapper>
          <StyledIntegrationBentoCardsColumn>
            <FluidCard {...cards[0]} />
            <FluidCard {...cards[1]} />
          </StyledIntegrationBentoCardsColumn>
          <StyledIntegrationBentoCardsColumn>
            <FluidCard {...cards[2]} />
            <StyledIntegrationBentoCTAWrapper>
              <FluidCard {...cards[3]} />
            </StyledIntegrationBentoCTAWrapper>
          </StyledIntegrationBentoCardsColumn>
          <StyledIntegrationBentoPhone
            src="/images/phone-placeholder.svg"
            alt="A smartphone screen displaying an HTTP Toolkit interface"
            fill
          />
          <StyledIntegrationBentoCTAWrapper $mobile>
            <FluidCard {...cards[3]} />
          </StyledIntegrationBentoCTAWrapper>
        </StyledIntegrationBentoContentWrapper>
      </Container>
    </StyledIntegrationBentoWrapper>
  );
};
