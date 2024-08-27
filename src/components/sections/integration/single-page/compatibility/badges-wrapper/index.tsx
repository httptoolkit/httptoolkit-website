'use client';

import { CompatibilityBadge } from '../badge';
import { StyledCompatibilityBadgeWrapper } from '../compatibility.styles';
import type { IntegrationCompatibilityProps } from '../compatibility.types';

export const BadgesWrapper = ({
  tools
}: Pick<Required<IntegrationCompatibilityProps>, 'tools'>) => {
  return (
    <StyledCompatibilityBadgeWrapper>
      {Array.isArray(tools) &&
        tools.length > 0 &&
        tools.map(tool => <CompatibilityBadge key={tool}>{tool}</CompatibilityBadge>)}
    </StyledCompatibilityBadgeWrapper>
  );
};
