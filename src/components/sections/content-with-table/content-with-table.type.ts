import type { JSXElementConstructor, ReactElement } from 'react';

import type { RichTextProps } from '../rich-text/rich-text.types';

import type { TableContentProps } from '@/components/modules/table-content/table-content.types';

export interface StyledContentWithTableProps {
  $bgVariant?: 'inkBlack' | 'darkGrey';
}

export interface ContentWithTableProps extends StyledContentWithTableProps {
  links: TableContentProps['links'];
  richTextContent?: RichTextProps['content'];

  // Content that is already parsed by remoteMdx
  parsedContent?: ReactElement<any, string | JSXElementConstructor<any>>;
  additionalContent?: React.ReactNode;
}
