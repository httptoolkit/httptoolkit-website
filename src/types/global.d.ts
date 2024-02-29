type Component<T = unknown> = T & {
  children?: React.ReactNode;
  className?: string;
};

interface Image {
  src: string;
  alt?: string;
}
