import { TryItForYourselfCTA } from '@/components/common-sections/try-it-for-yourself';
import { Layout } from '@/components/layout';
import { IntegrationCTA } from '@/components/sections/integration/cta';
import { IntegrationsGrid } from '@/components/sections/integration/grid';

export default function IntegrationsPage() {
  return (
    <Layout>
      <IntegrationCTA
        $variant="hero"
        title="Automatic setup and powerful integration for all your tools"
        text="With deep integrations into a huge range of popular components & tools, HTTP Toolkit lets you intercept mobile apps, whole devices, bash scripts, entire Docker containers and more, so you can see & modify anything in just one click."
      />
      <IntegrationsGrid />
      <TryItForYourselfCTA />
    </Layout>
  );
}
