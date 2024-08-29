'use client';

import { ThemedImage } from '@/components/elements/themed-image';
import { PhoneWindow } from '@/components/elements/phone-window';
import { styled } from '@/styles';

export const StyledIntegrationBentoWrapper = styled.section`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  background-image: ${({ theme }) => theme.backgroundImages.backgroundDots};
  background-repeat: repeat;
  background-size: 450px;
  padding: 64px 0 16px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 96px 0;
  }
`;

export const StyledIntegrationBentoGradientWrapper = styled.div`
  transform: rotate(90deg);
  position: absolute;
  width: 100%;
  top: -50%;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

export const StyledIntegrationBentoHeadingWrapper = styled.div`
  max-width: 656px;
  margin: 0 auto 64px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    margin: 0 auto 96px;
  }
`;

export const StyledIntegrationBentoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: row;
  }
  display: grid;
  gap: 24px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr) 334px;
  }
`;

export const StyledIntegrationBentoCardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
`;

export const StyledPhoneWindow = styled(PhoneWindow)`
  border-color: var(--button-border);
`;

export const StyledThemedImage = styled(ThemedImage)`
  && {
    border-radius: 0;
    border: none;
  }
`;

export const StyledIntegrationBentoCTAWrapper = styled.div<{ $mobile?: boolean }>`
  display: ${({ $mobile }) => ($mobile ? 'block' : 'none')};

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    display: ${({ $mobile }) => (!$mobile ? 'block' : 'none')};
  }
`;
