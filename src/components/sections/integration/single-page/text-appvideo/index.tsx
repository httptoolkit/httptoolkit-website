import { styled } from '@linaria/react';

import { VideoKey } from '@/content/data/video-dictionary';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';
import { PhoneAppVideoPair } from '@/components/modules/phone-app-video-pair';
import { screens } from '@/styles/tokens';

const StyledIntegrationTextVideoGradientWrapper = styled.section`
  position: relative;
`;

const StyledIntegrationTextVideoGradient = styled.div`
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

const StyledIntegrationTextVideoWrapper = styled.div`
  padding: 64px 16px;

  @media (min-width: ${screens.lg}) {
    padding: 96px 150px 48px;
  }
`;

const StyledIntegrationTextVideoHeading = styled.div`
  max-width: 656px;
  margin: 0 auto 64px;

  @media (min-width: ${screens.lg}) {
    margin: 0 auto calc(48px + 96px);
  }
`;

/**
 * @param title: This string can have highlighted text on the segments that are between \`\*content\*\`
 */
export const IntegrationTextAppVideo = ({ title, subtitle, video }: {
  title: string;
  subtitle: string;
  video: { id: VideoKey };
}) => {
  return (
    <StyledIntegrationTextVideoGradientWrapper>
      <StyledIntegrationTextVideoGradient>
        <Gradient />
      </StyledIntegrationTextVideoGradient>
      <Container>
        <StyledIntegrationTextVideoWrapper>
          <StyledIntegrationTextVideoHeading>
            <AltHeadingBlock title={title} subtitle={subtitle} mediumHeading />
          </StyledIntegrationTextVideoHeading>

          <PhoneAppVideoPair
            videoId={video.id}
          />
        </StyledIntegrationTextVideoWrapper>
      </Container>
    </StyledIntegrationTextVideoGradientWrapper>
  );
};
