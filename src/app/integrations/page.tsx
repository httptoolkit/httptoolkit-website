import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';

export default function IntegrationsPage() {
  return (
    <>
      <Container>
        <Heading color="textGradient">Integrations</Heading>
      </Container>
      <IntegrationCompatibility title="Supported by Docker" subtitle="compatibility" />
    </>
  );
}
