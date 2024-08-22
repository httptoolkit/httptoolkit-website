import {
  StyledIntegrationTextVideoGradient,
  StyledIntegrationTextVideoGradientWrapper,
  StyledIntegrationTextVideoHeading,
  StyledIntegrationTextVideoWrapper,
} from './text-video.styles';

import { VideoKey } from '@/content/data/video-dictionary';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { AppWindow } from '@/components/elements/app-window';
import { VideoPlayer } from '@/components/elements/video-player';
import { AltHeadingBlock } from '@/components/modules/alt-heading-block';

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

          <AppWindow aspectRatio='16/9'>
            <VideoPlayer
              videoId={video.id}
              aspectRatio='16/9'
            />
          </AppWindow>
        </StyledIntegrationTextVideoWrapper>
      </Container>
    </StyledIntegrationTextVideoGradientWrapper>
  );
};
