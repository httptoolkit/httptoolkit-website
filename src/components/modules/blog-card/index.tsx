import { styled } from '@linaria/react';

import { Badge } from '@/components/elements/badge';
import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import { ArrowRight } from '@/components/elements/icon';
import { Image } from '@/components/elements/image';
import { Text } from '@/components/elements/text';
import { screens } from '@/styles/tokens';
import { formatDateLongMonthYear } from '@/lib/utils/formatMonthYearDate';

interface BlogCardProps {
  tag: string;
  image: Image;
  date: string;
  title: string;
  excerpt?: string;
  slug: string;
}

const StyledBlogCardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  padding: 16px;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0px 0px 8px 0px var(--shadow-default);

  @media (min-width: ${screens.lg}) {
    padding: 24px;
  }
`;

const StyledBlogCardFigure = styled.div`
  height: 174px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  @media (min-width: ${screens.lg}) {
    height: 217px;
  }

  & img {
    width: 100%;
    height: 100%;
  }
`;

const StyledBlogCardTag = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const StyledBlogCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledBlogCardButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const StyledExcerpt = styled(Text)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  padding: 3px 0;
  text-overflow: ellipsis;

  display: -webkit-box;
`;

export const BlogCard = ({ title, excerpt, image, date, tag, slug }: BlogCardProps) => {
  return (
    <StyledBlogCardWrapper>
      <StyledBlogCardFigure>
        <Image width={386} height={217} src={image.src} alt="" loading="lazy" />
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
        {excerpt ? (
          <StyledExcerpt fontSize="m" color="darkGrey">
            {excerpt}
          </StyledExcerpt>
        ) : null}

        <StyledBlogCardButtonWrapper>
          <Button
            as="link"
            href={`/blog/${slug}`}
            title={`Read more about ${title}`}
            aria-label={`Read more about ${title}`}
            variant="secondary"
            small
            icon={ArrowRight}
          >
            Read more
          </Button>
        </StyledBlogCardButtonWrapper>
      </StyledBlogCardContentWrapper>
    </StyledBlogCardWrapper>
  );
};
