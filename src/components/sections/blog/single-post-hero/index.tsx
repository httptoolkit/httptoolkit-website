import {
  StyledGoBack,
  StyledPostMeta,
  StyledSinglePost,
  StyledSinglePostDetails,
  StyledSinglePostImageWrapper,
  StyledTags,
} from './single-post-hero.styles';

import { Badge } from '@/components/elements/badge';
import { Heading } from '@/components/elements/heading';
import { CaretLeft } from '@/components/elements/icon';
import { Image } from '@/components/elements/image';
import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { formatDateLongMonthYear } from '@/lib/utils/formatMonthYearDate';

interface SinglePostHeroProps {
  post: Post;
}

const GoBack = ({ $displayOn }: { $displayOn: 'desktop' | 'mobile' }) => {
  return (
    <StyledGoBack $displayOn={$displayOn}>
      <Link href="/blog">
        <CaretLeft weight="fill" />
        <Text as="label" fontSize="m" fontWeight="bold">
          GO BACK TO BLOG
        </Text>
      </Link>
    </StyledGoBack>
  );
};

export const SinglePostHero = ({ post }: SinglePostHeroProps) => {
  const formatteDate = formatDateLongMonthYear(post.date);

  return (
    <StyledSinglePost>
      <StyledSinglePostDetails>
        <GoBack $displayOn="desktop" />
        <Stack $gap="16px">
          <StyledTags>{post.tags.length && post.tags.map((tag: string) => <Badge>{tag}</Badge>)}</StyledTags>
          <Heading fontSize="l" fontWeight="normal" color="white">
            {post.title}
          </Heading>
        </Stack>
        <StyledPostMeta>
          <Text as="span" fontSize="l" color="darkGrey">
            {formatteDate}
          </Text>
          {post.author && (
            <Text as="span" fontSize="l" color="darkGrey">
              Author: {post.author.name}
            </Text>
          )}
        </StyledPostMeta>
      </StyledSinglePostDetails>

      <StyledSinglePostImageWrapper>
        <GoBack $displayOn="mobile" />
        <Image width={607} height={296} src={`images/${post.coverImage}`} alt={post.title} priority />
      </StyledSinglePostImageWrapper>
    </StyledSinglePost>
  );
};
