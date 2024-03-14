import {
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
          {/* TODO: get the links by the content */}
          <TableContent isCollapsible={false} links={links} />
        </StyledContentWithTableTableWrapper>
        <div>
          <RichText content={Content} theme="policies" />
        </div>
      </StyledContentWithTableContentWrapper>
    </StyledContentWithTableWrapper>
  );
};
