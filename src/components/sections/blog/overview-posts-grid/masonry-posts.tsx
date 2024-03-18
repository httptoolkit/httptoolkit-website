'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Masonry } from 'react-plock';

import {
  StyledHeadingTag,
  StyledLoadMoreWrapper,
  StyledNoResultsWrapper,
  StyledSelectedTag,
} from './overview-posts-grid.styles';

import { Button } from '@/components/elements/button';
import { ArrowRight } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { BlogCard } from '@/components/modules/blog-card';

const POST_ITEMS_PER_PAGE = 6;

export const MasonryPosts = ({ posts }: { posts: Post[] }) => {
  const [visibleItems, setVisibleItems] = useState(POST_ITEMS_PER_PAGE);
  const params = useSearchParams();
  const currentTag = params.get('tags');

  const filteredPosts = useMemo(() => {
    if (currentTag) {
      return posts.filter(post => post.tags.includes(currentTag));
    }
    return posts;
  }, [currentTag, posts]);

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + POST_ITEMS_PER_PAGE);
  };

  if (!filteredPosts.length) {
    return (
      <StyledNoResultsWrapper>
        <Text fontSize="m">
          Sorry, there are currently no posts with
          <StyledSelectedTag>{currentTag}</StyledSelectedTag>
          tag
        </Text>
        <Button icon={ArrowRight} as="link" $variant="secondary" $small href="/blog">
          Back to all posts
        </Button>
      </StyledNoResultsWrapper>
    );
  }

  return (
    <>
      <StyledHeadingTag>{currentTag ? currentTag : 'All posts'}</StyledHeadingTag>
      <Masonry
        items={filteredPosts.slice(0, visibleItems)}
        config={{
          columns: [1, 2, 2],
          gap: [24, 24, 24],
          media: [640, 1024, 1440],
        }}
        render={post => (
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
        )}
      />
      {visibleItems < filteredPosts.length && (
        <StyledLoadMoreWrapper>
          <Button $variant="secondary" onClick={handleLoadMore}>
            Load More
          </Button>
        </StyledLoadMoreWrapper>
      )}
    </>
  );
};
