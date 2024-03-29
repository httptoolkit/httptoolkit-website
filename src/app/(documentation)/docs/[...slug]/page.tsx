import type { Metadata } from 'next/types';

import { DocumentationLayout } from '@/components/layout/documentation';
import { ROOT_DOCS_DIRECTORY, getAllDocsMeta, getDocBySlug } from '@/lib/mdx/docs';
import { findFile } from '@/lib/mdx/utils/find-file';
import { getHeadingLinks } from '@/lib/mdx/utils/get-heading-links';
import { optimizeExerptToMetaDescription } from '@/lib/utils';
import { buildMetadata } from '@/lib/utils/build-metadata';

type DocPageProps = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const slug = params.slug;
  const realSlug = slug[slug.length - 1];
  const doc = await getDocBySlug(realSlug);

  const metaDescription = doc.excerpt ? optimizeExerptToMetaDescription(doc.excerpt) : undefined;

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

export default async function DocsPage({ params }: DocPageProps) {
  const { slug } = params;
  const realSlug = slug[slug.length - 1];
  const { title, content: Content } = await getDocBySlug(realSlug);
  const [filePath] = findFile(ROOT_DOCS_DIRECTORY, realSlug, '.mdx', true);
  const links = await getHeadingLinks(filePath);

  return (
    <DocumentationLayout title={title} links={links}>
      {Content}
    </DocumentationLayout>
  );
}
