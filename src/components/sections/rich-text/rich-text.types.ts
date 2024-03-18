import type { MDXComponents, MDXProps } from 'mdx/types';

export interface RichTextProps {
  content(props: MDXProps): JSX.Element;
  components?: MDXComponents;
}
