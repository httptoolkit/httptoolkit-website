import { Container } from '@/components/elements/container';
import { OverviewBlogContent } from '@/components/sections/blog/overview-content';
import { OverviewHero } from '@/components/sections/blog/overview-hero';
import { getAllPostsMeta } from '@/lib/mdx/blog';

export default async function Blog() {
  const posts = await getAllPostsMeta();
  const featurePost = posts.find(post => post.isFeatured);

  return (
    <Container>
      {featurePost && <OverviewHero featuredPost={featurePost} />}
      <OverviewBlogContent />
    </Container>
  );
}
