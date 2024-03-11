import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { IntegrationCompatibility } from '@/components/sections/integration/single-page/compatibility';
import { IntegrationDeviceMedia } from '@/components/sections/integration/single-page/device-media';

export default function IntegrationsPage() {
  return (
    <>
      <Container>
        <Heading color="textGradient">Integrations</Heading>
      </Container>
      <IntegrationDeviceMedia
        mobileImage={{
          darkSrc: 'https://picsum.photos/id/1019/1024',
          lightSrc: 'https://picsum.photos/id/1035/1024',
          alt: 'example alt',
        }}
        desktopImage={{
          darkSrc: 'https://picsum.photos/id/1019/1024',
          lightSrc: 'https://picsum.photos/id/1035/1024',
          alt: 'example alt',
        }}
      />
      <IntegrationCompatibility title="Supported by Docker" subtitle="compatibility" />
    </>
  );
}
