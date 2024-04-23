import { MasonryPosts } from './masonry-posts';

import Stack from '@/components/elements/stack';
import { getAllPostsMeta } from '@/lib/mdx/blog';

export const OverviewPostsGrid = async () => {
  const posts = await getAllPostsMeta();
  const postsWithoutFeatured = posts.filter(item => !item.isFeatured);

  return (
    <Stack $gap="24px" $gapxl="24px">
      <MasonryPosts posts={postsWithoutFeatured} />
    </Stack>
  );
};
