import type { ExportedImageProps } from 'next-image-export-optimizer';
import ExportedImage from 'next-image-export-optimizer';

import { StyledImageWrapper } from './image.styles';

export type ImageProps = ExportedImageProps & { wrapperAs?: React.ElementType };

export const Image = ({ wrapperAs, ...props }: ImageProps) => {
  return (
    <StyledImageWrapper as={wrapperAs}>
      <ExportedImage {...props} />
    </StyledImageWrapper>
  );
};
