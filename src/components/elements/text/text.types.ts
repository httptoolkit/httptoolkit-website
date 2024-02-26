import type { FontSize, FontWeigth, TextColor } from '@/styles';

export interface StyledTextProps {
  $isLabel?: boolean;
}

export interface TextProps extends StyledTextProps {
  as?: 'span' | 'p' | 'label';
  color?: TextColor;
  fontSize?: FontSize;
  fontWeight?: FontWeigth;
  textAlign?: CanvasTextAlign;
}
