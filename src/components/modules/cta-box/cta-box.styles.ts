'use client';

import { styled } from '@/styles';

export const StyledCTABoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow:
    0px 0px 24px 0px ${({ theme }) => theme.shadow.innerBox} inset,
    0 0 0 1px ${({ theme }) => theme.colors.button.border};

  background-image: ${({ theme }) => theme.backgroundImages.backgroundDots},
    ${({ theme }) => theme.backgroundImages.backgroundGradient};
  background-size:
    250px auto,
    200% 200%;
  background-repeat: repeat, no-repeat;
  background-position:
    top 0 center,
    top 10% center;

  & * {
    text-align: center;
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    gap: 24px;
    padding: 32px;
    align-items: initial;
    & * {
      text-align: inherit;
    }
  }
`;

export const StyledCTABoxSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.label.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.6;
  color: ${({ theme }) => theme.colors.text.darkGrey};
  text-transform: uppercase;
`;

export const StyledCTABoxContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledCTABoxButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
