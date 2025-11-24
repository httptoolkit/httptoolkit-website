import { StyledTopBanner, StyledTopBannerContainer } from './top-banner.styles';
import type { TopBannerProps } from './top-banner.types';

export const TopBanner = ({ children }: TopBannerProps) => {
  return (
    <StyledTopBanner>
      <StyledTopBannerContainer>{children}</StyledTopBannerContainer>
    </StyledTopBanner>
  );
};
