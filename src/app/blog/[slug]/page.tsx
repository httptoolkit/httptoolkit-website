import type { Metadata } from 'next/types';

import { SocialPostShare } from './post-share';

import { Container } from '@/components/elements/container';
import { RelatedPosts } from '@/components/sections/blog/related-posts';
import { SinglePostHero } from '@/components/sections/blog/single-post-hero';
import { ContentWithTable } from '@/components/sections/content-with-table';
import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx/blog';
import { getBlogTitlesBySlug } from '@/lib/mdx/utils/get-titles-by-slug';
import { siteMetadata } from '@/lib/site-metadata';
import { optimizeExcerptToMetaDescription } from '@/lib/utils';
import { buildMetadata } from '@/lib/utils/build-metadata';
import { Newsletter } from '@/components/modules/newsletter';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';
import { EditOnGithub } from '@/components/elements/edit-on-github';

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const slug = params.slug;
  const post = await getPostBySlug(slug);

  const metaDescription = post.excerpt ? optimizeExcerptToMetaDescription(post.excerpt) : undefined;
  const postImageMetadata = [`${siteMetadata.siteUrl}/images/${post.coverImage}`];

  const postMetadata = buildMetadata({
    title: post.title,
    description: metaDescription,
    openGraph: {
      type: 'article',
      images: postImageMetadata,
      section: 'Technology',
      tags: post.tags,
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      images: postImageMetadata,
    },
  });

  return postMetadata;
}

/**
 * For more info check out {@link https://nextjs.org/docs/app/api-reference/functions/generate-static-params Next static params docs}.
 */
export async function generateStaticParams() {
  const posts = await getAllPostsMeta();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

const githubBlogUrl = 'https://github.com/httptoolkit/httptoolkit-website/blob/main/src/content/posts';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  const postNavigation = await getBlogTitlesBySlug(slug);
  const editUrl = `${githubBlogUrl}/${slug}.mdx`;

  return (
    <>
      <Container>
        <SinglePostHero post={post} />
      </Container>

      <ContentWithTable
        $bgVariant="darkGrey"
        links={[postNavigation]}
        parsedContent={post.content}
        additionalContent={<>
          <EditOnGithub url={editUrl} />
          <SocialPostShare postTitle={post.title} postUrl={post.slug} socialLinks={post.socialLinks} />
        </>}
      />

      <Container>
        <Newsletter
          action={NEWSLETTER_URLS.blog}
          $variant="with-gradient"
          title="Blog newsletter"
          text="Become an HTTP & debugging expert, by subscribing to receive new posts like these emailed straight to your inbox:"
        />
      </Container>

      <Container>
        <RelatedPosts tags={post.tags} currentPostSlug={post.slug} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            image: [`${siteMetadata.siteUrl}/images/${post.coverImage}`],
            datePublished: new Date(post.date).toISOString(),
            dateModified: siteMetadata.latestSiteUpdate,
            author: [
              {
                '@type': 'Organization',
                name: 'HTTP Toolkit',
                url: 'https://httptoolkit.com/blog/',
                logo: 'https://httptoolkit.com/logo-square.png',
              },
              {
                '@type': 'Person',
                name: post.author?.name,
                url: post.author?.url,
              },
            ],
            publisher: {
              '@type': 'Organization',
              name: 'HTTP Toolkit',
              url: 'https://httptoolkit.com/blog/',
              logo: 'https://httptoolkit.com/logo-square.png',
            },
          }),
        }}
      />
    </>
  );
}
