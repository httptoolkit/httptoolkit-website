import type { ButtonProps } from '@/components/elements/button/button.types';
import type { IconType } from '@/components/elements/square-icon/square-icon.types';
import type { ThemeImageProps } from '@/components/elements/themed-image';

export type CTA = Pick<ButtonProps, 'icon' | 'href' | 'onClick' | '$withBorder' | '$small' | '$variant' | 'as'> & {
  title: string;
};

export type CTAVariant = 'cta-hero' | 'cta-square' | 'cta-fluid' | 'cta-narrow';
export type TextAppearance = 'small' | 'large';
export type bgVariant =
  | 'default'
  | 'left-bottom-to-top-right'
  | 'rigth-bottom-to-top-left'
  | 'left-top-to-bottom-right';

export interface CTAProps extends Component {
  variant?: CTAVariant;
  $bgVariant?: bgVariant;
  heading: string;
  textAppearance?: TextAppearance;
  subHeading?: {
    text: string;
    icon?: IconType;
  };
  excerpt?: React.ReactNode;
  withDownload?: boolean;
  cta?: CTA;
  icon?: IconType;
  image?: ThemeImageProps;
}
