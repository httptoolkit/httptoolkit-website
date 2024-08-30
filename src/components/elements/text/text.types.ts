import type { FontSize, FontWeigth, TextColor } from '@/styles';

export interface StyledTextProps extends Omit<TextProps, 'textAlign'> {
  $textAlign?: CanvasTextAlign;
  $fontStyle?: 'normal' | 'italic';
}

export interface TextProps {
  as?: 'span' | 'p' | 'label';
  color?: TextColor;
  fontSize?: FontSize;
  fontWeight?: FontWeigth;
  textAlign?: CanvasTextAlign;
  fontStyle?: 'normal' | 'italic';
  $isLabel?: boolean;
}
