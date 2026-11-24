import { styled } from '@linaria/react';

import { Container } from '@/components/elements/container';
import { textColors } from '@/styles/tokens';

const StyledTopBanner = styled.div`
  background-color: #000;
  color: ${textColors.alwaysWhite};
  width: 100%;

  & a {
    color: inherit;
    text-decoration: underline;
  }
`;

const StyledTopBannerContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
`;

export const TopBanner = ({ children }: Component) => {
  return (
    <StyledTopBanner>
      <StyledTopBannerContainer>{children}</StyledTopBannerContainer>
    </StyledTopBanner>
  );
};
