import { styled } from '@linaria/react';
import type { ExportedImageProps } from 'next-image-export-optimizer';
import ExportedImage from 'next-image-export-optimizer';

export type ImageProps = ExportedImageProps & { forwardedWrapperAs?: any };

const StyledImageWrapper = styled.figure<Partial<ImageProps>>`
  position: relative;
  line-height: 0;
  /* width: fit-content; */
  height: 100%;
  object-fit: cover;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Image = ({ forwardedWrapperAs, ...props }: ImageProps) => {
  return (
    <StyledImageWrapper as={forwardedWrapperAs}>
      <ExportedImage {...props} />
    </StyledImageWrapper>
  );
};
