import { MasonryPosts } from './masonry-posts';

import Stack from '@/components/elements/stack';
import { getAllPostsMeta } from '@/lib/mdx/blog';

export const OverviewPostsGrid = async () => {
  const posts = await getAllPostsMeta();

  return (
    <Stack $gap="24px" $gapxl="24px">
      <MasonryPosts posts={posts} />
    </Stack>
  );
};
