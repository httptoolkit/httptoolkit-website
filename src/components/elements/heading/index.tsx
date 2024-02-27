import { StyledHeading } from './heading.styles';
import type { HeadingProps } from './heading.types';

export const Heading = ({
  as = 'h1',
  children,
  className,
  color,
  fontSize = 'xl',
  fontWeight,
  textAlign,
}: Component<HeadingProps>) => {
  return (
    <StyledHeading
      as={as}
      textAlign={textAlign}
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      className={className}
    >
      {children}
    </StyledHeading>
  );
};
