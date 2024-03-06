'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

import { StyledThemedImage, ThemedImageMovingBorder } from './themed-image';

export interface ThemeImageProps extends Omit<ImageProps, 'src'> {
  lightSrc: string | StaticImport;
  darkSrc: string | StaticImport;
  withBorderAnimation?: boolean;
  withBorder?: boolean;
  withoutStyles?: boolean;
}

export const ThemedImage = ({
  lightSrc,
  darkSrc,
  withBorderAnimation,
  withBorder,
  withoutStyles,
  alt = 'image',
  width,
  height,
  ...props
}: ThemeImageProps) => {
  const hasSize = !!width && !!height;

  const imageProps = {
    fill: !hasSize,
    priority: false,
    width,
    height,
    ...props,
  };

  const FinalImage = () => {
    return (
      <>
        <Image alt={alt} src={lightSrc} {...imageProps} data-hide-on-theme="dark" />
        <Image alt={alt} src={darkSrc} {...imageProps} data-hide-on-theme="light" />
      </>
    );
  };

  if (withBorderAnimation || withBorder) {
    return (
      <ThemedImageMovingBorder style={{ minHeight: height }} $withBorder={Boolean(withBorder)}>
        <FinalImage />
      </ThemedImageMovingBorder>
    );
  }

  if (withoutStyles) {
    return <FinalImage />;
  }

  return (
    <StyledThemedImage style={{ minHeight: height }}>
      <FinalImage />
    </StyledThemedImage>
  );
};
