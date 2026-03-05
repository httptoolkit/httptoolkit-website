import { styled } from '@linaria/react';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { StyledHideElementOn } from '@/components/elements/hide-on/hide-on';
import { PhoneWindow } from '@/components/elements/phone-window';
import { ThemedImage } from '@/components/elements/themed-image';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';
import { FluidCard } from '@/components/modules/fluid-card';
import type { FluidCardProps } from '@/components/modules/fluid-card';
import { screens } from '@/styles/tokens';

export interface IntegrationBentoProps {
  title: string;
  subtitle: string;
  phone?: any;
  cards: FluidCardProps[];
}

const StyledIntegrationBentoWrapper = styled.section`
  position: relative;
  overflow: hidden;
  background-color: var(--ink-black);
  background-image: var(--background-dots);
  background-repeat: repeat;
  background-size: 450px;
  padding: 64px 0 16px;

  @media (min-width: ${screens.lg}) {
    padding: 96px 0;
  }
`;

const StyledIntegrationBentoGradientWrapper = styled.div`
  transform: rotate(90deg);
  position: absolute;
  width: 100%;
  top: -50%;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const StyledIntegrationBentoHeadingWrapper = styled.div`
  max-width: 656px;
  margin: 0 auto 64px;

  @media (min-width: ${screens.lg}) {
    margin: 0 auto 96px;
  }
`;

const StyledIntegrationBentoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${screens.lg}) {
    flex-direction: row;
  }
  display: grid;
  gap: 24px;

  @media (min-width: ${screens.lg}) {
    grid-template-columns: repeat(2, 1fr) 334px;
  }
`;

const StyledIntegrationBentoCardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
`;

const StyledPhoneWindow = styled(PhoneWindow)`
  border-color: var(--button-border);
`;

const StyledThemedImage = styled(ThemedImage)`
  && {
    border-radius: 0;
    border: none;
  }
`;

const StyledIntegrationBentoCTAWrapper = styled.div`
  display: none;

  &[data-mobile] {
    display: block;
  }

  @media (min-width: ${screens.lg}) {
    display: block;

    &[data-mobile] {
      display: none;
    }
  }
`;

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
          <StyledHideElementOn data-hide-below="lg">
            <StyledPhoneWindow aspectRatio='445/914'>
              <StyledThemedImage
                darkSrc='/images/product/android-dark.png'
                lightSrc='/images/product/android-light.png'
                width={445}
                height={914}
              />
            </StyledPhoneWindow>
          </StyledHideElementOn>
          <StyledIntegrationBentoCTAWrapper data-mobile>
            <FluidCard {...cards[3]} />
          </StyledIntegrationBentoCTAWrapper>
        </StyledIntegrationBentoContentWrapper>
      </Container>
    </StyledIntegrationBentoWrapper>
  );
};
