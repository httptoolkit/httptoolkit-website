export interface StyledStackProps {
  $direction?: 'row' | 'row-reverse' | 'column' | ' column-reverse';
  $alignItems?: 'center' | 'self-start' | 'self-end' | 'normal';
  $gap?: string;
  $gapxl?: string;
}

export type StackProps = Component<StyledStackProps>;
