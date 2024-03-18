import Content from './content.mdx';

import { Container } from '@/components/elements/container';
import { RichText } from '@/components/sections/rich-text';

export default function Faq() {
  return (
    <Container>
      <RichText content={Content} />
    </Container>
  );
}
