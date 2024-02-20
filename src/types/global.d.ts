type Component<T = unknown> = T & {
  children?: React.ReactNode;
  className?: string;
};
