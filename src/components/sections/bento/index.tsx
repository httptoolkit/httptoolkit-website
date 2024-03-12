import { chunk } from 'lodash';

import {
  StyledBentoColumn,
  StyledBentoContent,
  StyledBentoGradientWrapper,
  StyledBentoTitle,
  StyledBentoWrapper,
} from './bento.styles';
import type { BentoProps } from './bento.types';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { FluidCard } from '@/components/modules/fluid-card';

export const Bento = ({ title, cards }: BentoProps) => {
  const formattedCards = chunk(cards, 2);

  return (
    <StyledBentoWrapper>
      <StyledBentoGradientWrapper>
        <Gradient />
      </StyledBentoGradientWrapper>
      <Container>
        <StyledBentoTitle forwardedAs="h2" fontSize="m" color="textGradient" textAlign="center">
          {title}
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
