export interface StyledContainerProps {
  $size?: 'default' | 'content';
}

export interface ContainerProps extends Component, StyledContainerProps {
  as?: string;
}
