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
  ...props
}: Component<TextProps>) => {
  const isLabel = as === 'label';
  const asTag = as === 'label' ? 'span' : as;

  return (
    <StyledText
      as={asTag}
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      className={className}
      textAlign={textAlign}
      $isLabel={isLabel}
      {...props}
    >
      {children}
    </StyledText>
  );
};

Text.displayName = 'Text';
