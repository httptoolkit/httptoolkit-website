import React from 'react';

import { StyledText } from './text.styles';

import type { FontSize, FontWeight, TextColor } from '@/styles/tokens';
import { fontSizes, fontWeight, textColors } from '@/styles/tokens';

export interface TextProps {
  as?: 'span' | 'p' | 'label';
  color?: TextColor;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  textAlign?: CanvasTextAlign;
  fontStyle?: 'normal' | 'italic';
  $isLabel?: boolean;
}

export const Text = ({
  children,
  className,
  as = 'p',
  fontSize = 'xl',
  fontWeight: fw,
  color,
  textAlign,
  fontStyle,
  $isLabel,
  ...props
}: Component<TextProps>) => {
  const isLabel = $isLabel || as === 'label';
  const asTag = as === 'label' ? 'span' : as;

  return (
    <StyledText
      as={asTag}
      data-text="true"
      data-is-label={isLabel ? 'true' : undefined}
      className={className}
      style={
        {
          '--text-font-size': fontSizes.text[fontSize || 'm'],
          '--text-color': textColors[(color || 'darkGrey') as keyof typeof textColors] || textColors.darkGrey,
          '--text-font-weight': fontWeight[fw || 'normal'],
          '--text-text-align': textAlign || undefined,
          '--text-font-style': fontStyle || undefined,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </StyledText>
  );
};

Text.displayName = 'Text';
