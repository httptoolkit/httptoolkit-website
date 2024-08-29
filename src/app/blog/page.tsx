import type { Metadata } from 'next';

import { Container } from '@/components/elements/container';
import { OverviewBlogContent } from '@/components/sections/blog/overview-content';
import { OverviewExplorer } from '@/components/sections/blog/overview-explorer';
import { OverviewHero } from '@/components/sections/blog/overview-hero';
import { getAllPostsMeta } from '@/lib/mdx/blog';
import { siteMetadata } from '@/lib/site-metadata';
import { buildMetadata } from '@/lib/utils/build-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Read the HTTP Toolkit Blog',
  description: 'Dig into HTTP in depth, hear about new HTTP Toolkit features & development, and explore a world of debugging & reverse engineering topics.',
  alternates: {
    canonical: `${siteMetadata.blogUrl}`,
  },
});

export default async function Blog() {
  const posts = await getAllPostsMeta();
  const featuredPost = posts.find(post => post.isFeatured);

  return (
    <>
      <Container>{featuredPost && <OverviewHero featuredPost={featuredPost} />}</Container>
      <OverviewExplorer />
      <Container>
        <OverviewBlogContent />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            publisher: {
              '@type': 'Organization',
              name: 'HTTP Toolkit',
              url: 'https://httptoolkit.com/blog/',
              logo: 'https://httptoolkit.com/logo-square.png',
            },
          }),
        }}
      ></script>
    </>
  );
}
