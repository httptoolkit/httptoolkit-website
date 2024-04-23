import type { ButtonProps } from '@/components/elements/button/button.types';

export interface StyledTextSlotProps {
  $textCenteredOnMobile?: boolean;
}

export interface TextSlotProps extends Component, StyledTextSlotProps {
  title: string;
  texts: string[];
  buttons: ButtonProps[];
  copy?: {
    command: string;
    subtitle: string;
  };
}
