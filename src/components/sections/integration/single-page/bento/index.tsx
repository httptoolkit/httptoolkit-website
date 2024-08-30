import {
  StyledIntegrationBentoCTAWrapper,
  StyledIntegrationBentoCardsColumn,
  StyledIntegrationBentoContentWrapper,
  StyledIntegrationBentoGradientWrapper,
  StyledIntegrationBentoHeadingWrapper,
  StyledIntegrationBentoWrapper,
  StyledPhoneWindow,
  StyledThemedImage
} from './bento.styles';
import type { IntegrationBentoProps } from './bento.types';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { StyledHideElementOn } from '@/components/elements/hide-on/hide-on';
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
          <StyledHideElementOn $hideBelow="lg">
            <StyledPhoneWindow aspectRatio='445/914'>
              <StyledThemedImage
                darkSrc='/images/product/android-dark.png'
                lightSrc='/images/product/android-light.png'
                width={445}
                height={914}
              />
            </StyledPhoneWindow>
          </StyledHideElementOn>
          <StyledIntegrationBentoCTAWrapper $mobile>
            <FluidCard {...cards[3]} />
          </StyledIntegrationBentoCTAWrapper>
        </StyledIntegrationBentoContentWrapper>
      </Container>
    </StyledIntegrationBentoWrapper>
  );
};
