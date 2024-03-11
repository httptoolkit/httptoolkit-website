import { marked } from 'marked';

import { StyledHeroPointsContent, StyledHeroPointsWrapper } from './hero-points.styles';
import type { HeroPointsProps } from './hero-points.types';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';


export const HeroPoints = ({ title, text }: HeroPointsProps) => {
  return (
    <StyledHeroPointsWrapper>
      <Container $size="content">
        <Heading fontSize="l" color="textGradient">
          {title}
        </Heading>
        <StyledHeroPointsContent dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />
      </Container>
    </StyledHeroPointsWrapper>
  );
};
