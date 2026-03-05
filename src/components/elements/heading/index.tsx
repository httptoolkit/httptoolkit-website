import React from 'react';

import { StyledHeading } from './heading.styles';
import type { HeadingProps } from './heading.types';

import { fontSizes, fontWeight, textColors } from '@/styles/tokens';

const lineHeightMap: Record<string, number> = {
  xl: 1.2,
  l: 1.2,
  m: 1.3,
  s: 1.3,
  xs: 1.3,
};

export const Heading = ({
  as = 'h1',
  id,
  children,
  className,
  color,
  fontSize = 'xl',
  fontWeight: fw,
  textAlign,
  ...props
}: Component<HeadingProps>) => {
  const headingColor =
    color && color !== 'textGradient' && color !== 'textOrangeGradient'
      ? textColors[color as keyof typeof textColors]
      : textColors.lightGrey;

  return (
    <StyledHeading
      as={as}
      data-heading="true"
      data-color={color}
      className={className}
      id={id}
      style={
        {
          '--heading-font-size': fontSizes.heading.mobile[fontSize],
          '--heading-color': headingColor,
          '--heading-font-weight': fontWeight[fw || 'normal'],
          '--heading-line-height': lineHeightMap[fontSize],
          '--heading-text-align': textAlign || undefined,
          '--heading-font-size-xl': fontSizes.heading.desktop[fontSize],
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </StyledHeading>
  );
};
