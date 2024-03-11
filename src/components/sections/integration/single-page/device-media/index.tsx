import {
  StyledIntegrationDeviceMediaDesktop,
  StyledIntegrationDeviceMediaDesktopImage,
  StyledIntegrationDeviceMediaDesktopWrapper,
  StyledIntegrationDeviceMediaPhone,
  StyledIntegrationDeviceMediaPhoneImage,
  StyledIntegrationDeviceMediaPhoneWrapper,
  StyledIntegrationDeviceMediaWrapper,
} from './device-media.styles';
import type { IntegrationDeviceMediaProps } from './device-media.types';

export const IntegrationDeviceMedia = ({ mobileImage, desktopImage }: IntegrationDeviceMediaProps) => {
  return (
    <StyledIntegrationDeviceMediaWrapper>
      <StyledIntegrationDeviceMediaPhoneWrapper>
        <StyledIntegrationDeviceMediaPhone src="/images/phone-mockup.svg" alt="" fill />
        <StyledIntegrationDeviceMediaPhoneImage withoutStyles {...mobileImage} />
      </StyledIntegrationDeviceMediaPhoneWrapper>
      <StyledIntegrationDeviceMediaDesktopWrapper>
        <StyledIntegrationDeviceMediaDesktop src="/images/desktop-mockup.svg" alt="" fill />
        <StyledIntegrationDeviceMediaDesktopImage withoutStyles {...desktopImage} />
      </StyledIntegrationDeviceMediaDesktopWrapper>
    </StyledIntegrationDeviceMediaWrapper>
  );
};
