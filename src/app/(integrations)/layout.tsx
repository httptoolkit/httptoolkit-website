import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { Layout } from '@/components/layout';

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
      <TryItForYourselfCTA variant="cta-fluid" />
    </Layout>
  );
}
