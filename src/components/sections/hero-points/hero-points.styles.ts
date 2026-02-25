'use client';

import { styled, screens, fontSizes } from '@/styles';

export const StyledHeroPointsWrapper = styled.div`
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

export const StyledHeroPointsContent = styled.div`
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