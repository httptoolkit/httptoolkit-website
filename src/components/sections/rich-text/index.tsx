import type { RichTextProps } from './rich-text.types';
import { policiesComponents } from './themes/policies';

const COMPONENT_DICTIONARY: Record<RichTextProps['theme'], any> = {
  policies: policiesComponents,
};

export const RichText = ({ content: Content, theme }: RichTextProps) => {
  return <Content components={COMPONENT_DICTIONARY[theme]} />;
};
