import { BadgesWrapper } from './badges-wrapper';
import {
  StyledIntegrationCompatibilityContent,
  StyledIntegrationCompatibilityContentTitle,
  StyledIntegrationCompatibilityContentWrapper,
  StyledIntegrationCompatibilityGradientWrapper,
  StyledIntegrationCompatibilityLabel,
  StyledIntegrationCompatibilityWrapper,
} from './compatibility.styles';
import type { IntegrationCompatibilityProps } from './compatibility.types';

import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { DownloadButton } from '@/components/modules/download-button';

const compatibilityTools = [
  'Docker',
  'Node.js containers',
  'Docker Compose',
  'Docker for Mac',
  'Docker for Windows',
  'Golang containers',
  'Apt-Get, Apk, Npm, and other build tools',
  'PHP+Apache containers',
  'Ruby containers',
  'Curl, Wget, Httpie, and other Bash clients',
  'Java containers',
  'Rust containers',
  'Python containers',
];

const mobileCompatibilityTools = [
  'Docker for Mac',
  'Node.js containers',
  'Docker',
  'Docker for Windows',
  'PHP+Apache containers',
  'Python containers',
  'Rust containers',
  'Docker Compose',
  'Java containers',
  'Golang containers',
  'Ruby containers',
  'Apt-Get, Apk, Npm, and other build tools',
  'Curl, Wget, Httpie, and other Bash clients',
];

export const IntegrationCompatibility = ({
  title,
  subtitle,
  tools = compatibilityTools,
  mobileTools = mobileCompatibilityTools,
}: IntegrationCompatibilityProps) => {
  return (
    <StyledIntegrationCompatibilityWrapper>
      <StyledIntegrationCompatibilityGradientWrapper>
        <Gradient $shape="full" />
      </StyledIntegrationCompatibilityGradientWrapper>
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
        <BadgesWrapper tools={tools} mobileTools={mobileTools} />
      </StyledIntegrationCompatibilityContentWrapper>
    </StyledIntegrationCompatibilityWrapper>
  );
};
