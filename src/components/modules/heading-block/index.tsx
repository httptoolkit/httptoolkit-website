import { StyledHeadingBlockWrapper, StyledHeadingBlockTitle } from './heading-block.styles';
import type { HeadingBlockProps } from './heading-block.types';

import { Badge } from '@/components/elements/badge';
import { HighlightedText } from '@/components/elements/highlighted-text';
import { Text } from '@/components/elements/text';

/**
 * @param title: This string can have highlighted text on the segments that are between \`\*content\*\`
 */

export const HeadingBlock = ({
  $align = 'center',
  $isContentCentered = false,
  title,
  text,
  badgeTitle,
  badgeAdditionalText,
  badgeIcon,
}: HeadingBlockProps) => {
  return (
    <StyledHeadingBlockWrapper $align={$align} $isContentCentered={$isContentCentered}>
      {badgeTitle && (
        <Badge variant="secondary" additionalText={badgeAdditionalText} icon={badgeIcon}>
          {badgeTitle}
        </Badge>
      )}
      <StyledHeadingBlockTitle forwardedAs="h2" fontSize="l" textAlign={$align} color="textGradient">
        <HighlightedText title={title} />
      </StyledHeadingBlockTitle>
      {text && (
        <Text fontSize="l" textAlign={$align}>
          {text}
        </Text>
      )}
    </StyledHeadingBlockWrapper>
  );
};
