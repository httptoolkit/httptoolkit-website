import type { FontWeigth, TextColor } from '@/styles';

type headingSize = 'xs' | 's' | 'l' | 'm' | 'xl';
type headingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  as?: headingLevel;
  color?: TextColor;
  fontSize?: headingSize;
  fontWeight?: FontWeigth;
  textAlign?: CanvasTextAlign;
}

export interface StyledHeadingProps extends Omit<HeadingProps, 'textAlign'> {
  $textAlign?: CanvasTextAlign;
}
