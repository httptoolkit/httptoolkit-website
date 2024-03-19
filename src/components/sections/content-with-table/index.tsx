import {
  StyledContentRichText,
  StyledContentWithTableContentWrapper,
  StyledContentWithTableLowerGradientWrapper,
  StyledContentWithTableTableWrapper,
  StyledContentWithTableUpperGradientWrapper,
  StyledContentWithTableWrapper,
} from './content-with-table.styles';
import type { ContentWithTableProps } from './content-with-table.type';
import { RichText } from '../rich-text';

import { Gradient } from '@/components/elements/gradient';
import { TableContent } from '@/components/modules/table-content';

export const ContentWithTable = ({ content: Content, links }: ContentWithTableProps) => {
  return (
    <StyledContentWithTableWrapper>
      <StyledContentWithTableUpperGradientWrapper>
        <Gradient />
      </StyledContentWithTableUpperGradientWrapper>
      <StyledContentWithTableLowerGradientWrapper>
        <Gradient />
      </StyledContentWithTableLowerGradientWrapper>
      <StyledContentWithTableContentWrapper>
        <StyledContentWithTableTableWrapper>
          <TableContent isCollapsible={false} links={links} />
        </StyledContentWithTableTableWrapper>
        <StyledContentRichText>
          <RichText content={Content} />
        </StyledContentRichText>
      </StyledContentWithTableContentWrapper>
    </StyledContentWithTableWrapper>
  );
};
