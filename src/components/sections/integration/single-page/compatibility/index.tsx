import { styled } from '@linaria/react';

import { BadgesWrapper } from './badges-wrapper';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { DownloadButton } from '@/components/modules/download-button';
import { screens, fontSizes, fontWeight } from '@/styles/tokens';

export interface IntegrationCompatibilityProps {
  subtitle: string;
  title: string;
  tools?: string[];
}

const StyledIntegrationCompatibilityWrapper = styled.section`
  position: relative;
  background-color: var(--ink-black);
  box-shadow: 1px 0 1px 0 var(--button-border);

  @media (max-width: ${screens.lg}) {
    background-image: var(--background-dots);
    background-repeat: repeat;
    background-size: 450px;
  }
`;

const StyledIntegrationCompatibilityGradientLimits = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const StyledIntegrationCompatibilityGradientWrapper = styled.div`
  position: absolute;
  width: 1474.5px;
  height: 941px;
  right: -550px;
  top: -350px;

  @media (min-width: ${screens.lg}) {
    top: -150px;
    right: -500px;
  }

  & > div {
    z-index: 0;
  }
`;

const StyledIntegrationCompatibilityContentWrapper = styled(Container)`
  &&& {
    display: flex;
    padding: 32px 16px;
    flex-direction: column;
    gap: 32px;
    position: relative;

    @media (min-width: ${screens.lg}) {
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      padding: 96px 90px;
    }
  }
`;

const StyledIntegrationCompatibilityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex-shrink: 0;
`;

const StyledIntegrationCompatibilityContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  @media (min-width: ${screens.lg}) {
    text-align: left;
    max-width: 440px;
  }
`;

const StyledIntegrationCompatibilityLabel = styled.p`
  font-size: ${fontSizes.label.l};
  font-weight: ${fontWeight.bold};
  color: var(--cinnabar-red);
  line-height: 1.1;
  letter-spacing: 0.6px;
  text-transform: uppercase;
`;

export const IntegrationCompatibility = ({
  title,
  subtitle,
  tools = []
}: IntegrationCompatibilityProps) => {
  return (
    <StyledIntegrationCompatibilityWrapper>
      <StyledIntegrationCompatibilityGradientLimits>
        <StyledIntegrationCompatibilityGradientWrapper>
          <Gradient $shape="full" />
        </StyledIntegrationCompatibilityGradientWrapper>
      </StyledIntegrationCompatibilityGradientLimits>
      <StyledIntegrationCompatibilityContentWrapper>
        <StyledIntegrationCompatibilityContent>
          <StyledIntegrationCompatibilityContentTitle>
            <StyledIntegrationCompatibilityLabel>{subtitle}</StyledIntegrationCompatibilityLabel>
            <Heading as="h2" fontSize="l" color="textGradient">
              {title}
            </Heading>
          </StyledIntegrationCompatibilityContentTitle>
          <DownloadButton $small $variant="secondary" />
        </StyledIntegrationCompatibilityContent>
        <BadgesWrapper tools={tools} />
      </StyledIntegrationCompatibilityContentWrapper>
    </StyledIntegrationCompatibilityWrapper>
  );
};
