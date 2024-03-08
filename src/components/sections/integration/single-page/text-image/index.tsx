import {
  StyledIntegrationTextImageGradient,
  StyledIntegrationTextImageGradientWrapper,
  StyledIntegrationTextImageHeading,
  StyledIntegrationTextImageWrapper,
} from './text-image.styles';
import type { IntegrationTextImageProps } from './text-image.types';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { ThemedImage } from '@/components/elements/themed-image';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';

/**
 * @param title: This string can have highlighted text on the segments that are between \`\*content\*\`
 */
export const IntegrationTextImage = ({ title, subtitle, image }: IntegrationTextImageProps) => {
  return (
    <StyledIntegrationTextImageGradientWrapper>
      <StyledIntegrationTextImageGradient>
        <Gradient />
      </StyledIntegrationTextImageGradient>
      <Container>
        <StyledIntegrationTextImageWrapper>
          <StyledIntegrationTextImageHeading>
            <AltHeadingBlock title={title} subtitle={subtitle} mediumHeading />
          </StyledIntegrationTextImageHeading>
          <ThemedImage {...image} withBorderAnimation />
        </StyledIntegrationTextImageWrapper>
      </Container>
    </StyledIntegrationTextImageGradientWrapper>
  );
};
