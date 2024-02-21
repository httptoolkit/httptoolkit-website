import type { FontSize, FontWeigth, TextColor } from '@/styles';

export interface TextProps {
  as?: 'span' | 'p';
  color?: TextColor;
  fontSize?: FontSize;
  fontWeight?: FontWeigth;
  textAlign?: CanvasTextAlign;
}
