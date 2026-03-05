import { styled } from '@linaria/react';

import { screens, fontSizes, fontWeight } from '@/styles/tokens';

export const StyledTextSlotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
`;

export const StyledTextSlotTitle = styled.div`
  &[data-text-centered="true"] {
    text-align: center;
  }

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }
`;

export const StyledTextSlotText = styled.div`
  font-size: ${fontSizes.text.m};
  line-height: 1.5;
  color: var(--text-dark-grey);

  &[data-text-centered="true"] {
    text-align: center;
  }

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }

  & p {
    margin-bottom: 4px;
  }

  & strong {
    font-weight: ${fontWeight.bold};
  }

  & a {
    text-decoration: underline;
  }
`;

export const StyledTextSlotCopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledTextSlotInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  & [data-copy-wrapper="true"] {
    width: fit-content;
  }

  @media (max-width: ${screens.lg}) {
    &[data-text-centered="true"] {
      align-items: center;
    }
  }
`;

export const StyledTextSlotButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
  }
`;
