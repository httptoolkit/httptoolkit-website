'use client';

import { styled, screens } from '@/styles';

export const StyledIntegrationHeroWrapper = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    padding-top: 64px;
    padding-bottom: 64px;
    gap: 96px;

    & > * {
      width: 50%;
    }
  }
`;

export const StyledIntegrationHeroContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const StyledIntegrationHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${screens.lg}) {
    & > * {
      text-align: center;
    }
  }
`;

export const StyledIntegrationHeroImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 190px;
  border-radius: 16px;
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0 0 24px 0 var(--shadow-inner-box);
  background-color: var(--ink-black);
  background-image: var(--background-gradient),
    var(--background-func-gradient),
    var(--background-dots);
  background-position:
    center -250px,
    center,
    center;
  background-size:
    602px 384.19px,
    100% 100%,
    524px 248px;
  background-repeat: no-repeat, no-repeat, repeat;
`;

export const StyledIntegrationHeroImageMultiple = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 37px;
  align-items: center;
  padding: 80px 0;

  @media (min-width: ${screens.lg}) {
    padding: 0;
  }

  & svg:first-child {
    color: var(--cinnabar-red);
  }
`;

export const MainLogo = styled.div`
  & svg {
    width: 109px;
    color: var(--cinnabar-red);
  }
`;

export const StyledIntegrationHeroImage = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (min-width: ${screens.lg}) {
    gap: 64px;
  }

  & > * {
    flex-shrink: 0;
    width: 64px;
    height: 64px;

    @media (min-width: ${screens.lg}) {
      width: 116px;
      height: 116px;
    }
  }

  & > *:nth-child(1) {
    color: var(--electric-blue);
  }

  & > *:nth-child(2) {
    width: 26px;
    height: 26px;
    color: var(--light-grey);

    @media (min-width: ${screens.lg}) {
      width: 48px;
      height: 48px;
    }
  }

  & > *:nth-child(3) {
    color: var(--cinnabar-red);
  }
`;