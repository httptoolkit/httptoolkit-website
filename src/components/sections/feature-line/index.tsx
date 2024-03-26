import {
  StyledFeatureLineContentWrapper,
  StyledFeatureLineImage,
  StyledFeatureLineTextWrapper,
  StyledFeatureLineWrapper,
} from './feature-line.styles';
import type { FeatureLineProps } from './feature-line.types';

import { Badge } from '@/components/elements/badge';
import { Heading } from '@/components/elements/heading';
import type { HeadingProps } from '@/components/elements/heading/heading.types';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';
import { TextList } from '@/components/modules/text-list';

export const FeatureLine = ({ $align, title, text, icon, list, badge, image }: FeatureLineProps) => {
  const headingColor: HeadingProps['color'] = icon ? 'white' : 'lightGrey';
  return (
    <StyledFeatureLineWrapper $align={$align}>
      <StyledFeatureLineContentWrapper>
        {icon && <SquareIcon icon={icon} />}
        {badge && (
          <Badge variant="primary" icon={badge.icon}>
            {badge.text}
          </Badge>
        )}
        <StyledFeatureLineTextWrapper>
          <Heading as="h3" color={headingColor} fontSize="m">
            {title}
          </Heading>
          {text && (
            <Text fontSize="m" color="darkGrey">
              {text}
            </Text>
          )}
          {list && <TextList list={list} />}
        </StyledFeatureLineTextWrapper>
      </StyledFeatureLineContentWrapper>
      {image && (
        <StyledFeatureLineImage
          width={662}
          height={570}
          darkSrc={image.darkSrc}
          lightSrc={image.lightSrc}
          alt={image.alt || title}
          withBorder
        />
      )}
    </StyledFeatureLineWrapper>
  );
};
