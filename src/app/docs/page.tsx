import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Layout } from '@/components/layout';
import { getAllDocsMeta } from '@/lib/mdx/docs';

export default async function DocsPage() {
  const docs = await getAllDocsMeta();

  return (
    <Layout>
      <Container>
        <Heading color="textGradient">Docs</Heading>
        {docs[2].content}
      </Container>
    </Layout>
  );
}
