import { StyledContainer } from './container.styles';

export interface ContainerVariantProps {
  size?: 'default' | 'content';
}

export interface ContainerProps extends Component, ContainerVariantProps {
  as?: React.ElementType;
}

export const Container = ({ children, as, size = 'default', ...props }: ContainerProps) => {
  return (
    <StyledContainer as={as} data-size={size !== 'default' ? size : undefined} {...props}>
      {children}
    </StyledContainer>
  );
};
