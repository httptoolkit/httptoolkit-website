import type { ExportedImageProps } from 'next-image-export-optimizer';
import ExportedImage from 'next-image-export-optimizer';

import { StyledImageWrapper } from './image.styles';

export type ImageProps = ExportedImageProps;

export const Image = ({ ...props }: ImageProps) => {
  return (
    <StyledImageWrapper>
      <ExportedImage {...props} />
    </StyledImageWrapper>
  );
};
