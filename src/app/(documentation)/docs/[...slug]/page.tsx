import type { Metadata } from 'next/types';

import { EditOnGithub } from '../docs.styles';

import { PencilSimple } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';
import { DocumentationLayout } from '@/components/layout/documentation';
import { ROOT_DOCS_DIRECTORY, getAllDocsMeta, getDocBySlug } from '@/lib/mdx/docs';
import { findFile } from '@/lib/mdx/utils/find-file';
import { getHeadingLinks } from '@/lib/mdx/utils/get-heading-links';
import { optimizeExcerptToMetaDescription } from '@/lib/utils';
import { buildMetadata } from '@/lib/utils/build-metadata';

type DocPageProps = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const slug = params.slug;
  const realSlug = slug[slug.length - 1];
  const doc = await getDocBySlug(realSlug);

  const metaDescription = doc.excerpt ? optimizeExcerptToMetaDescription(doc.excerpt) : undefined;

  const doctMetadata = buildMetadata({
    title: doc.title,
    description: metaDescription,
  });

  return doctMetadata;
}

export async function generateStaticParams() {
  const docs = await getAllDocsMeta();

  return docs.map(doc => ({
    slug: doc.parent ? [doc.parent, doc.slug] : [doc.slug],
  }));
}

const githubDocsUrl = 'https://github.com/httptoolkit/httptoolkit-website/blob/main/src/docs';

export default async function DocsPage({ params }: DocPageProps) {
  const { slug } = params;
  const realSlug = slug[slug.length - 1];
  const { title, content: Content } = await getDocBySlug(realSlug);
  const [filePath] = findFile(ROOT_DOCS_DIRECTORY, realSlug, '.mdx', true);
  const links = await getHeadingLinks(filePath);
  // Links to the raw markdown -> click the edit pencil, and it forks & starts an editor.
  const editUrl = `${githubDocsUrl}/${slug.join('/').replace(/\/$/, '')}.md`;

  return (
    <DocumentationLayout title={title} links={links}>
      {Content}
      <EditOnGithub>
        <PencilSimple /> Edit this page
        <Link href={editUrl} target="_blank">
          on GitHub
        </Link>
      </EditOnGithub>
    </DocumentationLayout>
  );
}
