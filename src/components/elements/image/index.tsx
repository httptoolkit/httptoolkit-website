import type { ExportedImageProps } from 'next-image-export-optimizer';
import ExportedImage from 'next-image-export-optimizer';

import { StyledImageWrapper } from './image.styles';

export type ImageProps = ExportedImageProps & { forwardedWrapperAs?: any };

export const Image = ({ forwardedWrapperAs, ...props }: ImageProps) => {
  return (
    <StyledImageWrapper as={forwardedWrapperAs}>
      <ExportedImage {...props} />
    </StyledImageWrapper>
  );
};
