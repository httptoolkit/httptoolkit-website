import { Suspense } from 'react';

import { MasonryPosts } from './masonry-posts';

import Stack from '@/components/elements/stack';
import { getAllPostsMeta } from '@/lib/mdx/blog';

export const OverviewPostsGrid = async () => {
  const posts = await getAllPostsMeta();
  const postsWithoutFeatured = posts.filter(item => !item.isFeatured);

  return (
    <Stack gap="24px" gapxl="24px">
      {/* MasonryPosts reads useSearchParams, so it needs its own boundary. Keeping it
          here rather than around the whole page keeps the rest of the blog index in
          document order, so the footer isn't laid out before the content arrives. */}
      <Suspense>
        <MasonryPosts posts={postsWithoutFeatured} />
      </Suspense>
    </Stack>
  );
};
