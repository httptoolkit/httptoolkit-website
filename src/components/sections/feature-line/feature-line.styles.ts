import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const StyledFeatureLineWrapper = styled.section`
  @media (min-width: ${screens.lg}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &[data-align="right"] {
    @media (min-width: ${screens.lg}) {
      flex-direction: row-reverse;
    }
  }

  & > *:nth-child(2) {
    @media (min-width: ${screens.lg}) {
      width: 50%;
    }
  }

  img {
    mask-image: linear-gradient(transparent 1%, #000 5%, #000 95%, transparent 98%)
  }
`;

export const StyledFeatureLineContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 548px;

  @media (max-width: ${screens.lg}) {
    align-items: center;
    margin: 0 auto 32px;
    gap: 32px;
  }
`;

export const StyledFeatureLineTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${screens.lg}) {
    gap: 32px;

    & > * {
      text-align: center;
    }
  }
`;
