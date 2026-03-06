import { marked } from 'marked';

import { styled } from '@linaria/react';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { screens, fontSizes } from '@/styles/tokens';

const StyledHeroPointsWrapper = styled.div`
  background-image: var(--background-dots);
  background-size: 450px;
  background-repeat: repeat;
  padding-top: 32px;
  padding-bottom: 32px;
  border-top: 1px solid var(--dark-grey);
  border-bottom: 1px solid var(--dark-grey);

  @media (min-width: ${screens.lg}) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;

const StyledHeroPointsContent = styled.div`
  margin-top: 24px;
  font-size: ${fontSizes.text.l};
  color: var(--text-dark-grey);
  line-height: 1.5;

  & p {
    margin-bottom: 1.25rem;
  }

  & a {
    text-decoration: underline;
  }
`;

interface HeroPointsProps {
  title: string;
  text: string;
}

export const HeroPoints = ({ title, text }: HeroPointsProps) => {
  return (
    <StyledHeroPointsWrapper>
      <Container size="content">
        <Heading fontSize="l" color="textGradient">
          {title}
        </Heading>
        <StyledHeroPointsContent dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />
      </Container>
    </StyledHeroPointsWrapper>
  );
};
