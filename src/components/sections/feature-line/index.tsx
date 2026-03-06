import type { Icon } from '@phosphor-icons/react';

import { styled } from '@linaria/react';

import type { CustomIcon } from '@/components/elements/icon/custom/types';
import type { ThemeImageProps } from '@/components/elements/themed-image';
import { screens } from '@/styles/tokens';

import { Badge } from '@/components/elements/badge';
import { Heading, type HeadingProps } from '@/components/elements/heading';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { TextList } from '@/components/modules/text-list';

interface FeatureLineBadgeProps {
  text: string;
  icon: Icon;
}

export interface FeatureLineLayoutProps {
  align?: 'left' | 'right';
}

export interface FeatureLineProps extends FeatureLineLayoutProps {
  title: string;
  image?: ThemeImageProps;
  badge?: FeatureLineBadgeProps;
  icon?: Icon | CustomIcon;
  text?: string;
  list?: string[];
}

const StyledFeatureLineWrapper = styled.section`
  @media (min-width: ${screens.lg}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &[data-align="right"] {
    @media (min-width: ${screens.lg}) {
      flex-direction: row-reverse;
    }
  }

  & > *:nth-child(2) {
    @media (min-width: ${screens.lg}) {
      width: 50%;
    }
  }

  img {
    mask-image: linear-gradient(transparent 1%, #000 5%, #000 95%, transparent 98%)
  }
`;

const StyledFeatureLineContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 548px;

  @media (max-width: ${screens.lg}) {
    align-items: center;
    margin: 0 auto 32px;
    gap: 32px;
  }
`;

const StyledFeatureLineTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${screens.lg}) {
    gap: 32px;

    & > * {
      text-align: center;
    }
  }
`;

export const FeatureLine = ({ align, title, text, icon, list, badge, image }: FeatureLineProps) => {
  const headingColor: HeadingProps['color'] = icon ? 'white' : 'lightGrey';
  return (
    <StyledFeatureLineWrapper data-align={align}>
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
        <ThemedImage
          width={662}
          height={570}
          darkSrc={image.darkSrc}
          lightSrc={image.lightSrc}
          sizes="100vw"
          alt={image.alt || ''}
          withBorder
        />
      )}
    </StyledFeatureLineWrapper>
  );
};
