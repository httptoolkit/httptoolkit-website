import Link from 'next/link';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Book } from '@/components/elements/icon';
import { OverviewHero } from '@/components/sections/blog/overview-hero';
import { getAllPostsMeta } from '@/lib/mdx';

export default async function Blog() {
  const posts = await getAllPostsMeta();
  const featurePost = posts.find(post => post.isFeatured);

  return (
    <Container>
      {featurePost && <OverviewHero featuredPost={featurePost} />}
      {posts?.map((post, i) => (
        <Link
          key={i}
          href={`/blog/${post.slug}`}
          style={{ marginBottom: 10, display: 'block', textDecoration: 'none' }}
        >
          <Heading as="h3" fontSize="xs" key={post.slug}>
            <Book /> {i + 1}. {post.title}
          </Heading>
        </Link>
      ))}
    </Container>
  );
}
