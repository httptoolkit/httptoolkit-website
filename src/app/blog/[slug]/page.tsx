import { Container } from '@/components/elements/container';
import { Logo } from '@/components/elements/icon';
import { RelatedPosts } from '@/components/sections/blog/related-posts';
import { SinglePostHero } from '@/components/sections/blog/single-post-hero';
import { ContentWithTable } from '@/components/sections/content-with-table';
import { CTA } from '@/components/sections/cta';
import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx/blog';
import { getBlogTitlesBySlug } from '@/lib/utils/get-titles-by-slug';

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
  const postNavigation = await getBlogTitlesBySlug(`/src/content/posts/${slug}.md`);

  return (
    <>
      <Container>
        <SinglePostHero post={post} />
      </Container>

      <ContentWithTable $bgVariant="darkGrey" links={[postNavigation]} parsedContent={post.content} />

      <Container>
        <CTA
          variant="cta-square"
          heading="Interested in OpenAPI?"
          excerpt="Try it out with HTTP Toolkit"
          icon={Logo}
          withDownload={false}
          cta={{
            title: 'Try it out',
            href: '/',
            $variant: 'primary',
          }}
        />
        <RelatedPosts tags={post.tags} currentPostSlug={post.slug} />
      </Container>
    </>
  );
}
