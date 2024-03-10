'use client';

import { styled } from '@/styles';

export const StyledTestimonialsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 62px 0;
  padding-bottom: 0;
  gap: 61px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 96px 0;
  }
`;

export const StyledTestimonialCard = styled.blockquote`
  background: ${({ theme }) => theme.colors.inkBlack};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
  border-radius: 12px;
  padding: 32px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 16px;

  & p {
    text-wrap: wrap;
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    max-width: 480px;
  }
`;

export const StyledAuthorWrapper = styled.footer`
  display: flex;
  gap: 16px;
`;

export const StyledAuthorDetails = styled.cite`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledTestimonialGrid = styled.div`
  --grid-items: 34;
  display: grid;
  grid-template-columns: repeat(var(--grid-items), 343px);
  gap: 16px;
  margin-right: 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
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
    color: ${({ theme }) => theme.colors.text.darkGrey};
    font-weight: ${({ theme }) => theme.fontWeight.normal};

    & strong {
      color: ${({ theme }) => theme.colors.text.lightGrey};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
    }
  }
`;
