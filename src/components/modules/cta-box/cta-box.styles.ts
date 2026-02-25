'use client';

import { styled, screens, fontSizes, fontWeight } from '@/styles';

export const StyledCTABoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--ink-black);
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow:
    0px 0px 24px 0px var(--shadow-inner-box) inset,
    0 0 0 1px var(--button-border);

  background-image: var(--background-dots),
    var(--background-gradient);
  background-size:
    250px auto,
    200% 200%;
  background-repeat: repeat, no-repeat;
  background-position:
    top 0 center,
    top 10% center;
  margin: 48px 0;

  & * {
    text-align: center;
  }

  @media (min-width: ${screens.lg}) {
    gap: 24px;
    padding: 32px;
    align-items: initial;
    & * {
      text-align: inherit;
    }
  }
`;

export const StyledCTABoxSubtitle = styled.p`
  font-size: ${fontSizes.label.l};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.6;
  color: var(--text-dark-grey);
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