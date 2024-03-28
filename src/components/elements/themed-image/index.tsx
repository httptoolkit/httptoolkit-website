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
    loading: loading ?? 'lazy',
    ...props,
  };

  const FinalImage = () => {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <ExportedImage
          alt={alt}
          height={height}
          width={width}
          src={lightSrc}
          data-hide-on-theme="dark"
          {...imageProps}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <ExportedImage
          alt={alt}
          height={height}
          width={width}
          src={darkSrc}
          data-hide-on-theme="light"
          {...imageProps}
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
