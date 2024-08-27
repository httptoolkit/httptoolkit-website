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
        <HeadingBlock title="Related *content*" $align="center" $isContentCentered />
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
                excerpt={post.excerpt}
              />
            ))}
        </StyledRelatedPostsGrid>
      </Stack>
    </StyledRelatedPostWrapper>
  );
};
