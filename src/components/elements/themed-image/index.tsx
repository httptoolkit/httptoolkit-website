'use client';

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
}

export const ThemedImage = ({
  lightSrc,
  darkSrc,
  withBorderAnimation,
  withBorder,
  withoutStyles,
  loading,
  alt = 'image',
  ...props
}: ThemeImageProps) => {
  const imageProps = {
    loading: loading ?? 'lazy',
    ...props,
  };

  // TODO: Refactor to Image element
  const FinalImage = () => {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={alt} src={lightSrc} data-hide-on-theme="dark" {...imageProps} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={alt} src={darkSrc} data-hide-on-theme="light" {...imageProps} />
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
