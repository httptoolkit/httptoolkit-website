import { StyledText } from './text.styles';
import type { TextProps } from './text.types';

export const Text = ({
  children,
  className,
  as = 'p',
  fontSize = 'xl',
  fontWeight,
  color,
  textAlign,
}: Component<TextProps>) => {
  return (
    <StyledText
      as={as}
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      className={className}
      textAlign={textAlign}
    >
      {children}
    </StyledText>
  );
};

Text.displayName = 'Text';
