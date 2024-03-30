import type { FontSize, FontWeigth, TextColor } from '@/styles';

export interface StyledTextProps extends Omit<TextProps, 'textAlign'> {
  $textAlign?: CanvasTextAlign;
}

export interface TextProps {
  as?: 'span' | 'p' | 'label';
  color?: TextColor;
  fontSize?: FontSize;
  fontWeight?: FontWeigth;
  textAlign?: CanvasTextAlign;
  $isLabel?: boolean;
}
