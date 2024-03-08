import type { ButtonProps } from '@/components/elements/button/button.types';

export interface StyledIntegrationCTAProps {
  $variant: 'hero' | 'cta';
}

export interface IntegrationCTAProps extends StyledIntegrationCTAProps {
  title: string;
  text: string;
  button?: ButtonProps;
}
