import { Container } from '@/components/elements/container';
import { RelatedPosts } from '@/components/sections/blog/related-posts';
import { SinglePostHero } from '@/components/sections/blog/single-post-hero';
import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx';

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

type BlogPostPageProps = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  return (
    <Container>
      <SinglePostHero post={post} />
      <RelatedPosts tags={post.tags} currentPostSlug={post.slug} />
      {/* <div>{post.content}</div> */}
    </Container>
  );
}
