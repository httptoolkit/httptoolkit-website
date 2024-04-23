import {
  StyledAltHeadingBlockSubtitle,
  StyledAltHeadingBlockTitle,
  StyledAltHeadingBlockWrapper,
} from './alt-heading-block.styles';
import type { AltHeadingBlockProps } from './alt-heading-block.types';

import type { HeadingProps } from '@/components/elements/heading/heading.types';
import { HighlightedText } from '@/components/elements/highlighted-text';

/**
 * @param title: This string can have highlighted text on the segments that are between \`\*content\*\`
 */
export const AltHeadingBlock = ({ title, subtitle, mediumHeading = false }: AltHeadingBlockProps) => {
  const headingSize: HeadingProps['fontSize'] = mediumHeading ? 'm' : 'l';

  return (
    <StyledAltHeadingBlockWrapper>
      {subtitle && <StyledAltHeadingBlockSubtitle>{subtitle}</StyledAltHeadingBlockSubtitle>}
      <StyledAltHeadingBlockTitle forwardedAs="h2" fontSize={headingSize} color="textGradient" textAlign="center">
        <HighlightedText title={title} />
      </StyledAltHeadingBlockTitle>
    </StyledAltHeadingBlockWrapper>
  );
};
