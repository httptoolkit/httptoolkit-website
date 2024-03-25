import { DocumentationLayout } from '@/components/layout/documentation';
import { getDocBySlug, ROOT_DOC_SLUG, ROOT_DOCS_DIRECTORY } from '@/lib/mdx/docs';
import { findFile } from '@/lib/utils/find-file';
import { getHeadingLinks } from '@/lib/utils/get-heading-links';

// TODO: remove when we can do the redirect at production level
export default async function DocsPage() {
  const { title, content: Content } = await getDocBySlug(ROOT_DOC_SLUG);
  const [filePath] = findFile(ROOT_DOCS_DIRECTORY, ROOT_DOC_SLUG, '.mdx', true);
  const links = await getHeadingLinks(filePath);
  return (
    <DocumentationLayout title={title} links={links}>
      {Content}
    </DocumentationLayout>
  );
}
