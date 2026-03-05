import { styled } from '@linaria/react';

import { Heading } from '@/components/elements/heading';
import type { HeadingProps } from '@/components/elements/heading/heading.types';
import { HighlightedText } from '@/components/elements/highlighted-text';
import { fontSizes, fontWeight } from '@/styles/tokens';

interface AltHeadingBlockProps {
  title: string;
  subtitle?: string;
  mediumHeading?: boolean;
}

const StyledAltHeadingBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledAltHeadingBlockTitle = styled.div`
  span {
    -webkit-text-fill-color: var(--cinnabar-red-light);
  }
`;

const StyledAltHeadingBlockSubtitle = styled.p`
  font-size: ${fontSizes.label.l};
  font-weight: ${fontWeight.bold};
  color: var(--cinnabar-red-light);
  letter-spacing: 0.6px;
  text-align: center;
  text-transform: uppercase;
`;

/**
 * @param title: This string can have highlighted text on the segments that are between \`\*content\*\`
 */
export const AltHeadingBlock = ({ title, subtitle, mediumHeading = false }: AltHeadingBlockProps) => {
  const headingSize: HeadingProps['fontSize'] = mediumHeading ? 'm' : 'l';

  return (
    <StyledAltHeadingBlockWrapper>
      {subtitle && <StyledAltHeadingBlockSubtitle>{subtitle}</StyledAltHeadingBlockSubtitle>}
      <StyledAltHeadingBlockTitle>
        <Heading as="h2" fontSize={headingSize} color="textGradient" textAlign="center">
          <HighlightedText title={title} />
        </Heading>
      </StyledAltHeadingBlockTitle>
    </StyledAltHeadingBlockWrapper>
  );
};
