import { styled } from '@linaria/react';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { ThemedImage } from '@/components/elements/themed-image';
import type { ThemeImageProps } from '@/components/elements/themed-image';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';
import { screens } from '@/styles/tokens';

interface IntegrationTextImageProps {
  title: string;
  subtitle: string;
  image: Omit<ThemeImageProps, 'withBorderAnimation' | 'withBorder' | 'withoutStyles'>;
}

const StyledIntegrationTextImageGradientWrapper = styled.section`
  position: relative;
`;

const StyledIntegrationTextImageGradient = styled.div`
  position: absolute;
  width: 80%;
  top: -17%;
  right: 0;
  transform: rotate(180deg);
  z-index: -1;

  @media (max-width: ${screens.lg}) {
    display: none;
  }
`;

const StyledIntegrationTextImageWrapper = styled.div`
  padding: 64px 16px;

  @media (min-width: ${screens.lg}) {
    padding: 96px 150px 48px;
  }
`;

const StyledIntegrationTextImageHeading = styled.div`
  max-width: 656px;
  margin: 0 auto 64px;

  @media (min-width: ${screens.lg}) {
    margin: 0 auto calc(48px + 96px);
  }
`;

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
          <ThemedImage {...image} width={image?.width ?? 1040} height={image.height ?? 893} withBorderAnimation />
        </StyledIntegrationTextImageWrapper>
      </Container>
    </StyledIntegrationTextImageGradientWrapper>
  );
};
