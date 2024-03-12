import {
  StyledBlogCardButtonWrapper,
  StyledBlogCardContentWrapper,
  StyledBlogCardFigure,
  StyledBlogCardImage,
  StyledBlogCardTag,
  StyledBlogCardWrapper,
} from './blog-card.styles';
import type { BlogCardProps } from './blog-card.types';

import { Badge } from '@/components/elements/badge';
import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import { ArrowRight } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { formatDateLongMonthYear } from '@/lib/utils/formatMonthYearDate';

export const BlogCard = ({ title, text, image, date, tag, slug }: BlogCardProps) => {
  return (
    <StyledBlogCardWrapper>
      <StyledBlogCardFigure>
        <StyledBlogCardImage width={386} height={217} src={image.src} alt={image.alt ?? title} loading="lazy" />
        <StyledBlogCardTag>
          <Badge>{tag}</Badge>
        </StyledBlogCardTag>
      </StyledBlogCardFigure>
      <StyledBlogCardContentWrapper>
        <Text fontSize="m" color="darkGrey">
          <time dateTime={date}>{formatDateLongMonthYear(date)}</time>
        </Text>
        <Heading as="h3" color="white" fontSize="xs" fontWeight="medium">
          {title}
        </Heading>
        <Text fontSize="m" color="darkGrey">
          {text}
        </Text>
        <StyledBlogCardButtonWrapper>
          <Button
            as="link"
            href={`/blog/${slug}`}
            aria-label={`Read more about ${title}`}
            $variant="secondary"
            $small
            icon={ArrowRight}
          >
            Read more
          </Button>
        </StyledBlogCardButtonWrapper>
      </StyledBlogCardContentWrapper>
    </StyledBlogCardWrapper>
  );
};
