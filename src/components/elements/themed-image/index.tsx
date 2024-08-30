'use client';

import ExportedImage from 'next-image-export-optimizer';
import type { DetailedHTMLProps, ImgHTMLAttributes, RefObject } from 'react';

import { StyledThemedImage, ThemedImageMovingBorder } from './themed-image';

export interface ThemeImageProps
  extends Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'> {
  lightSrc: string;
  darkSrc: string;
  withBorderAnimation?: boolean;
  withBorder?: boolean;
  withoutStyles?: boolean;
  ref?: RefObject<HTMLImageElement>;
  height?: number;
  width?: number;
}

export const ThemedImage = ({
  lightSrc,
  darkSrc,
  withBorderAnimation,
  withBorder,
  withoutStyles,
  loading,
  height,
  width,
  alt = 'image',
  ...props
}: ThemeImageProps) => {
  const imageProps = {
    priority: loading == 'eager',
    loading: loading ?? 'lazy',
    ...props,
  };

  const FinalImage = () => {
    return (
      <>
        <ExportedImage
          {...imageProps}
          alt={alt}
          height={height}
          width={width}
          src={lightSrc}
          data-hide-on-theme="dark"
        />
        <ExportedImage
          {...imageProps}
          alt={alt}
          height={height}
          width={width}
          src={darkSrc}
          data-hide-on-theme="light"
        />
      </>
    );
  };

  if (withBorderAnimation || withBorder) {
    return (
      <ThemedImageMovingBorder $withBorder={Boolean(withBorder)}>
        <FinalImage />
      </ThemedImageMovingBorder>
    );
  }

  if (withoutStyles) {
    return <FinalImage />;
  }

  return (
    <StyledThemedImage>
      <FinalImage />
    </StyledThemedImage>
  );
};
