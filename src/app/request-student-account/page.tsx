import type { Metadata } from 'next/types';

import { Container } from '@/components/elements/container';
import { Section } from '@/components/elements/section';
import { Layout } from '@/components/layout';
import { LoginModal } from '@/components/modules/login-modal';
import { buildMetadata } from '@/lib/utils/build-metadata';
import { StudentAccountContent } from './student-account-content';

export const metadata: Metadata = buildMetadata({
  title: 'Student Discount | HTTP Toolkit',
  description:
    'HTTP Toolkit Pro is free for students and faculty at accredited universities and colleges. Renew each year while you study.',
});

export default function RequestStudentAccountPage() {
  return (
    <Layout>
      <LoginModal />
      <Section>
        <Container>
          <StudentAccountContent />
        </Container>
      </Section>
    </Layout>
  );
}
