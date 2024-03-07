import { StyledIntegrationGrid } from './grid.styles';
import type { IntegrationGridProps } from './grid.types';

import { Container } from '@/components/elements/container';
import { IntegrationCard } from '@/components/modules/integration-card';

export const IntegrationGrid = ({ integrations }: IntegrationGridProps) => {
  return (
    <Container as="section">
      <StyledIntegrationGrid>
        {Array.isArray(integrations) &&
          integrations.length > 0 &&
          integrations.map(card => <IntegrationCard key={card.title} {...card} />)}
      </StyledIntegrationGrid>
    </Container>
  );
};
