import {
  StyledBlogCardButtonWrapper,
  StyledBlogCardContentWrapper,
  StyledBlogCardFigure,
  StyledBlogCardImage,
  StyledBlogCardTag,
  StyledBlogCardWrapper,
} from './blog-card.styles';
import type { BlogCardProps } from './blog-card.types';

import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import { ArrowRight } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { formatDateLongMonthYear } from '@/lib/utils/formatMonthYearDate';

export const BlogCard = ({ title, text, image, date, tag }: BlogCardProps) => {
  return (
    <StyledBlogCardWrapper>
      <StyledBlogCardFigure>
        <StyledBlogCardImage src={image.src} alt={image.alt} />
        <StyledBlogCardTag>{tag}</StyledBlogCardTag>
      </StyledBlogCardFigure>
      <StyledBlogCardContentWrapper>
        <Text fontSize="m" color="darkGrey">
          {formatDateLongMonthYear(date)}
        </Text>
        <Heading color="white" fontSize="xs" fontWeight="medium">
          {title}
        </Heading>
        <Text fontSize="m" color="darkGrey">
          {text}
        </Text>
        <StyledBlogCardButtonWrapper>
          <Button $variant="secondary" $small icon={ArrowRight}>
            Read more
          </Button>
        </StyledBlogCardButtonWrapper>
      </StyledBlogCardContentWrapper>
    </StyledBlogCardWrapper>
  );
};
