import type { MDXComponents, MDXProps } from 'mdx/types';

import { defaultComponents } from './components';

export interface RichTextProps {
  content(props: MDXProps): JSX.Element;
  components?: MDXComponents;
}

export const RichText = ({ content: Content, components = {} }: RichTextProps) => {
  return <Content components={{ ...defaultComponents, ...components }} />;
};
