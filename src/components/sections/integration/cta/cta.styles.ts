import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const StyledIntegrationCTAWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 32px 16px 0;
  gap: 32px;

  &[data-variant="cta"] {
    background-color: var(--ink-black);
    box-shadow: var(--border-gradient);
    gap: 42px;
  }

  &::before {
    content: '';
    background: linear-gradient(0deg, var(--ink-grey) 13%, rgba(30, 32, 40, 0) 93.25%);
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 130px;
  }

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    padding: 96px 0;
    gap: 35px;

    &[data-variant="cta"] {
      padding: 128px 0;
      gap: 99px;
    }

    &::before, &::after {
      content: '';
      position: absolute;
      background: linear-gradient(90deg, var(--ink-grey) 13%, rgba(30, 32, 40, 0) 93.25%);
      width: 200px;
      height: 100%;
      top: 0;
      bottom: unset;
    }

    &::before {
      left: 0;
      right: unset;
      transform: unset;
    }

    &::after {
      right: 0;
      left: unset;
      transform: rotate(180deg);
    }
  }
`;

export const StyledIntegrationCTAContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  > p {
    max-width: 740px;
  }
`;
