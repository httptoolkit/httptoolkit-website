import { StyledRelatedPostWrapper, StyledRelatedPostsGrid } from './related-posts.styles';

import Stack from '@/components/elements/stack';
import { BlogCard } from '@/components/modules/blog-card';
import { HeadingBlock } from '@/components/modules/heading-block';
import { getRelatedPosts } from '@/lib/mdx/blog';

interface RelatedPostsProps {
  tags: string[];
  currentPostSlug: string;
}

export const RelatedPosts = async ({ tags, currentPostSlug }: RelatedPostsProps) => {
  const relatedPosts = await getRelatedPosts({ tags, currentPostSlug });

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <StyledRelatedPostWrapper>
      <Stack $gap="32px" $gapxl="48px">
        <HeadingBlock title="Related `*content*`" $align="center" $isContentCentered />
        <StyledRelatedPostsGrid>
          {relatedPosts.length &&
            relatedPosts.map(post => (
              <BlogCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                image={{ src: `/images/${post.coverImage}`, alt: post.title }}
                date={post.date}
                tag={post.tags[0]}
                // TODO(gerald): Replace with the excerpt when working on blog post content
                text="Sometimes things crash when they're running inside a Docker container though, and then all of a sudden it can get much more difficult to work out why, or what the hell to do next."
              />
            ))}
        </StyledRelatedPostsGrid>
      </Stack>
    </StyledRelatedPostWrapper>
  );
};
