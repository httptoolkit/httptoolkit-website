'use client';

import { styled, screens, fontWeight } from '@/styles';

export const StyledTestimonialsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 62px 0;
  padding-bottom: 32px;
  padding-bottom: 0;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    padding: 96px 0;
    padding-bottom: 0;
    gap: 61px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
  }
`;

export const StyledTestimonialCard = styled.blockquote`
  background: var(--ink-black);
  box-shadow: 0 0 0 1px var(--button-border);
  border-radius: 12px;
  padding: 24px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 12px;

  & p {
    text-wrap: wrap;
  }

  @media (min-width: ${screens.lg}) {
    max-width: 480px;
    padding: 32px;
    margin-bottom: 16px;
  }
`;

export const StyledAuthorWrapper = styled.footer`
  display: flex;
  gap: 16px;
`;

export const StyledAuthorDetails = styled.cite`
  display: flex;
  flex-direction: column;

  > a:hover {
    text-decoration: underline;
  }
`;

export const StyledTestimonialGrid = styled.div<{
  $columnsCount: number;
}>`
  --grid-items: ${({ $columnsCount }) => $columnsCount};
  display: grid;
  grid-template-columns: repeat(var(--grid-items), 343px);
  gap: 16px;
  margin-right: 16px;
  padding: 1px 16px;

  @media (min-width: ${screens.lg}) {
    padding: 1px 0;
    grid-template-columns: repeat(var(--grid-items), 1fr);
    /* Apply padding to every 9th item */
    & > *:nth-child(odd) {
      margin-top: 50px;
    }
  }
`;

export const StyledQuote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & p {
    color: var(--text-dark-grey);
    font-weight: ${fontWeight.normal};

    & strong {
      color: var(--text-white);
      font-weight: ${fontWeight.bold};
    }
  }
`;