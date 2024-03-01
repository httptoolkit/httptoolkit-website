'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { StyledThemedImage, ThemedImageMovingBorder } from './themed-image';

import { useMounted } from '@/lib/hooks/use-mounted';

interface ThemeImageProps extends Omit<ImageProps, 'src'> {
  lightSrc: string | StaticImport;
  darkSrc: string | StaticImport;
  withBorderAnimation?: boolean;
  withoutStyles?: boolean;
}

export const ThemedImage = ({
  lightSrc,
  darkSrc,
  withBorderAnimation,
  withoutStyles,
  alt = 'image',
  ...props
}: ThemeImageProps) => {
  const { resolvedTheme } = useTheme();
  const { isMounted } = useMounted();
  let src;
  const imageProps = {
    fill: true,
    ...props,
  };

  if (!isMounted) {
    return null;
  }

  switch (resolvedTheme) {
    case 'light':
      src = lightSrc;
      break;
    case 'dark':
      src = darkSrc;
      break;
    default:
      src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      break;
  }

  if (withBorderAnimation) {
    return (
      <ThemedImageMovingBorder>
        <Image alt={alt} src={src} {...imageProps} />
      </ThemedImageMovingBorder>
    );
  }

  if (withoutStyles) {
    return <Image alt={alt} src={src} {...imageProps} />;
  }

  return (
    <StyledThemedImage>
      <Image alt={alt} src={src} {...imageProps} />
    </StyledThemedImage>
  );
};
