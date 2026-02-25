import type { FontSize, FontWeight, TextColor } from '@/styles';

export interface StyledTextProps extends Omit<TextProps, 'textAlign'> {
  $textAlign?: CanvasTextAlign;
  $fontStyle?: 'normal' | 'italic';
}

export interface TextProps {
  as?: 'span' | 'p' | 'label';
  color?: TextColor;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textAlign?: CanvasTextAlign;
  fontStyle?: 'normal' | 'italic';
  $isLabel?: boolean;
}
