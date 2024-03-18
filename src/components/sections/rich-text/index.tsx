import type { MDXComponents } from 'mdx/types';

import { defaultComponents } from './components';
import type { RichTextProps } from './rich-text.types';

export const RichText = ({ content: Content, components = {} }: RichTextProps) => {
  return <Content components={{ ...defaultComponents, ...components } as MDXComponents} />;
};
