import type { FontSize, FontWeight, TextColor } from '@/styles/tokens';

export interface TextProps {
  as?: 'span' | 'p' | 'label';
  color?: TextColor;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textAlign?: CanvasTextAlign;
  fontStyle?: 'normal' | 'italic';
  $isLabel?: boolean;
}
