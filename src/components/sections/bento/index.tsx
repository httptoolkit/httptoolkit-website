import chunk from 'lodash/chunk';

import { styled } from '@linaria/react';

import type { BentoProps } from './bento.types';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { FluidCard } from '@/components/modules/fluid-card';
import { screens } from '@/styles/tokens';

const StyledBentoWrapper = styled.section`
  padding-top: 64px;
  padding-bottom: 64px;
  position: relative;
  overflow: hidden;

  @media (min-width: ${screens.lg}) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;

const StyledBentoGradientWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  height: 579px;
`;

const StyledBentoTitle = styled.div`
  max-width: 548px;
  margin: 0 auto 32px;

  @media (min-width: ${screens.lg}) {
    margin: 0 auto 64px;
  }
`;

const StyledBentoContent = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

const StyledBentoColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    gap: 20px;
  }
`;

export const Bento = ({ title, cards }: BentoProps) => {
  const formattedCards = chunk(cards, 2);

  return (
    <StyledBentoWrapper>
      <StyledBentoGradientWrapper>
        <Gradient />
      </StyledBentoGradientWrapper>
      <Container>
        <StyledBentoTitle>
          <Heading as="h2" fontSize="m" color="textGradient" textAlign="center">
            {title}
          </Heading>
        </StyledBentoTitle>
        <StyledBentoContent>
          {Array.isArray(formattedCards) &&
            formattedCards.length > 0 &&
            formattedCards.map(cardsChunk => (
              <StyledBentoColumn>
                {Array.isArray(cardsChunk) &&
                  cardsChunk.length > 0 &&
                  cardsChunk.map(card => <FluidCard $variant="dark" {...card} />)}
              </StyledBentoColumn>
            ))}
        </StyledBentoContent>
      </Container>
    </StyledBentoWrapper>
  );
};
