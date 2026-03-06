'use client';

import { useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { Masonry } from 'react-plock';

import { styled } from '@linaria/react';

import { NewsletterBox } from '../newsletter-box';

import { Button } from '@/components/elements/button';
import { ArrowRight } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { BlogCard } from '@/components/modules/blog-card';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import { isSSR } from '@/lib/utils';
import { screens, fontSizes } from '@/styles/tokens';

const StyledLoadMoreWrapper = styled.div`
  justify-content: center;

  @media (min-width: ${screens.lg}) {
    display: flex;
    justify-content: center;
    margin-top: 26px;
  }
`;

const StyledHeadingTag = styled.h2`
  font-size: ${fontSizes.heading.mobile.m};
  color: var(--text-light-grey);
  text-transform: capitalize;
  line-height: 1.5;

  @media (min-width: ${screens.lg}) {
    font-size: ${fontSizes.heading.desktop.m};
  }
`;

const StyledNoResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: self-start;
`;

const StyledSelectedTag = styled.span`
  font-size: ${fontSizes.text.m};
  color: var(--text-cinnabar-red);
  margin: 0 6px;
  text-transform: capitalize;
  display: inline-block;
`;

const POST_ITEMS_PER_PAGE = 6;

export const MasonryPosts = ({ posts }: { posts: Post[] }) => {
  const [visibleItems, setVisibleItems] = useState(POST_ITEMS_PER_PAGE);
  const isMobile = useIsMobile();
  const params = useSearchParams();
  const currentTag = params.get('tags');

  const filteredPosts = useMemo(() => {
    if (currentTag) {
      const tagId = !isSSR && window?.document?.querySelector(`#tag-heading`);
      if (tagId) {
        tagId.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }

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
        <Button icon={ArrowRight} as="link" variant="secondary" small href="/blog">
          Back to all posts
        </Button>
      </StyledNoResultsWrapper>
    );
  }

  return (
    <>
      <StyledHeadingTag id="tag-heading">{currentTag ? currentTag : 'All posts'}</StyledHeadingTag>
      <Masonry
        items={filteredPosts.slice(0, visibleItems)}
        config={{
          columns: [1, 2, 2],
          gap: [24, 24, 24],
          media: [640, 1024, 1440],
        }}
        render={(post, idx) => {
          const shouldRenderNewsletterBox = idx === 2 && isMobile;
          return (
            <React.Fragment key={post.slug}>
              <BlogCard
                title={post.title}
                slug={post.slug}
                image={{ src: `/images/${post.coverImage}`, alt: post.title }}
                date={post.date}
                tag={post.tags[0]}
                excerpt={post.excerpt}
              />
              {shouldRenderNewsletterBox ? <NewsletterBox /> : null}
            </React.Fragment>
          );
        }}
      />
      {visibleItems < filteredPosts.length && (
        <StyledLoadMoreWrapper>
          <Button variant="secondary" onClick={handleLoadMore}>
            Load More
          </Button>
        </StyledLoadMoreWrapper>
      )}
    </>
  );
};
