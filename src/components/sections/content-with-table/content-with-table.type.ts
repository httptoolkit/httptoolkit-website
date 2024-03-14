import type { RichTextProps } from '../rich-text/rich-text.types';

import type { TableContentProps } from '@/components/modules/table-content/table-content.types';

export interface ContentWithTableProps {
  content: RichTextProps['content'];
  links: TableContentProps['links'];
}
