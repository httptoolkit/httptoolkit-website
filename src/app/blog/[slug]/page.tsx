import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
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
      <Heading>{post.title}</Heading>
      <div>{post.content}</div>
    </Container>
  );
}
