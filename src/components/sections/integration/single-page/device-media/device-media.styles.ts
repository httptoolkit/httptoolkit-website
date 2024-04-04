'use client';

import { Container } from '@/components/elements/container';
import { Image } from '@/components/elements/image';
import { ThemedImage } from '@/components/elements/themed-image';
import { styled } from '@/styles';

export const StyledIntegrationDeviceMediaWrapper = styled(Container)`
  &&& {
    display: flex;
    flex-wrap: nowrap;
    gap: 6px;
    padding-top: 64px;
    padding-bottom: 64px;

    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      gap: 24px;
      padding-top: 96px;
      padding-bottom: 96px;
    }
  }
`;

export const StyledIntegrationDeviceMediaPhoneWrapper = styled.figure`
  position: relative;
`;

export const StyledIntegrationDeviceMediaPhone = styled(Image)`
  &&& {
    position: static !important;
  }
`;

export const StyledIntegrationDeviceMediaPhoneImage = styled(ThemedImage)`
  &&& {
    position: absolute;
    border-radius: 8px;
    top: 4px !important;
    left: 4px !important;
    z-index: -1;
    margin: 0;
    width: calc(100% - 8px) !important;
    height: calc(100% - 8px) !important;
    object-fit: cover;

    @media (min-width: ${({ theme }) => theme.screens.sm}) {
      border-radius: 12px;
      top: 8px !important;
      left: 8px !important;
      width: calc(100% - 16px) !important;
      height: calc(100% - 16px) !important;
    }

    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      top: 12px !important;
      left: 12px !important;
      border-radius: 24px;
      width: calc(100% - 24px) !important;
      height: calc(100% - 24px) !important;
    }
  }
`;

export const StyledIntegrationDeviceMediaDesktopWrapper = styled.figure`
  position: relative;
`;

export const StyledIntegrationDeviceMediaDesktop = styled(Image)`
  &&& {
    position: static !important;
  }
`;

export const StyledIntegrationDeviceMediaDesktopImage = styled(ThemedImage)`
  &&& {
    position: absolute;
    border-radius: 0 0 16px 16px;
    top: unset !important;
    bottom: 1px !important;
    left: 1px !important;
    z-index: -1;
    margin: 0;
    width: calc(100% - 2px) !important;
    height: calc(100% - 8px) !important;
    object-fit: cover;

    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      width: calc(100% - 2px) !important;
      height: calc(100% - 24px) !important;
    }
  }
`;
