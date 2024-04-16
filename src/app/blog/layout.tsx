import { Suspense } from 'react';

import { Container } from '@/components/elements/container';
import { Layout } from '@/components/layout';
import { Newsletter } from '@/components/modules/newsletter';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout withoutNewsletter>
      <Suspense>{children}</Suspense>
      <Container>
        <Newsletter
          action={NEWSLETTER_URLS.blog}
          $variant="with-gradient"
          title="Blog newsletter"
          text="Become an HTTP & debugging expert by subscribing to receive new posts like these emailed straight to your inbox:"
          supportText="No spam, just new blog posts hot off the press."
        />
      </Container>
    </Layout>
  );
}
