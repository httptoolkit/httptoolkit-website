'use client';

import { CompatibilityBadge } from '../badge';
import { StyledCompatibilityBadgeWrapper } from '../compatibility.styles';
import type { IntegrationCompatibilityProps } from '../compatibility.types';

import { useIsMobile } from '@/lib/hooks/use-is-mobile';

export const BadgesWrapper = ({
  tools,
  mobileTools,
}: Pick<Required<IntegrationCompatibilityProps>, 'tools' | 'mobileTools'>) => {
  const isMobile = useIsMobile();
  const filteredTools = isMobile ? mobileTools : tools;

  return (
    <StyledCompatibilityBadgeWrapper>
      {Array.isArray(filteredTools) &&
        filteredTools.length > 0 &&
        filteredTools.map(tool => <CompatibilityBadge key={tool}>{tool}</CompatibilityBadge>)}
    </StyledCompatibilityBadgeWrapper>
  );
};
