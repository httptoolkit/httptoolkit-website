import type { ThemeImageProps } from '@/components/elements/themed-image';

export interface IntegrationTextImageProps {
  title: string;
  subtitle: string;
  image: Omit<ThemeImageProps, 'withBorderAnimation' | 'withBorder' | 'withoutStyles'>;
}
