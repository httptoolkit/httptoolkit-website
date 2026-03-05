import {
  StyledIntegrationCompatibilityWrapper,
  StyledIntegrationCompatibilityGradientLimits,
  StyledIntegrationCompatibilityGradientWrapper,
  StyledIntegrationCompatibilityContentWrapper,
  StyledIntegrationCompatibilityContent,
  StyledIntegrationCompatibilityContentTitle,
  StyledIntegrationCompatibilityLabel,
} from './compatibility.styles';
import { BadgesWrapper } from './badges-wrapper';
import type { IntegrationCompatibilityProps } from './compatibility.types';

import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { DownloadButton } from '@/components/modules/download-button';

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
