import { Badge, type BadgeProps } from '@/components/elements/badge';
import { Heading } from '@/components/elements/heading';
import { HighlightedText } from '@/components/elements/highlighted-text';
import { Text } from '@/components/elements/text';
import { styled } from '@linaria/react';

export interface HeadingBlockLayoutProps {
  align: CanvasTextAlign;
  isContentCentered?: boolean;
}

export interface HeadingBlockProps extends HeadingBlockLayoutProps {
  title: string;
  text?: string;
  badgeTitle?: string;
  badgeAdditionalText?: BadgeProps['additionalText'];
  badgeIcon?: BadgeProps['icon'];
  badgeVariant?: BadgeProps['variant'];
}

const alignDictionary: Record<CanvasTextAlign, string> = {
  right: 'end',
  left: 'start',
  center: 'center',
  end: 'end',
  start: 'start',
};

const StyledHeadingBlockWrapper = styled.section`
  max-width: 656px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledHeadingBlockTitle = styled.div`
  span {
    -webkit-text-fill-color: var(--cinnabar-red-light);
  }
`;

/**
 * @param title: This string can have highlighted text on the segments that are between \`\*content\*\`
 */

export const HeadingBlock = ({
  align = 'center',
  isContentCentered = false,
  title,
  text,
  badgeTitle,
  badgeAdditionalText,
  badgeIcon,
  badgeVariant = 'secondary',
}: HeadingBlockProps) => {
  return (
    <StyledHeadingBlockWrapper style={{
      textAlign: align,
      alignItems: alignDictionary[align],
      margin: isContentCentered ? '0 auto' : undefined,
    }}>
      {badgeTitle && (
        <Badge variant={badgeVariant} additionalText={badgeAdditionalText} icon={badgeIcon}>
          {badgeTitle}
        </Badge>
      )}
      <StyledHeadingBlockTitle>
        <Heading as="h2" fontSize="l" textAlign={align} color="textGradient">
          <HighlightedText title={title} />
        </Heading>
      </StyledHeadingBlockTitle>
      {text && (
        <Text fontSize="l" textAlign={align}>
          {text}
        </Text>
      )}
    </StyledHeadingBlockWrapper>
  );
};
