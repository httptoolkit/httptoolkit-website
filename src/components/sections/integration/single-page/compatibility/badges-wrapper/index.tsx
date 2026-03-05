'use client';

import { styled } from '@linaria/react';

import { CompatibilityBadge } from '../badge';
import type { IntegrationCompatibilityProps } from '..';

import { screens } from '@/styles/tokens';

const StyledCompatibilityBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;

  @media (min-width: ${screens.lg}) {
    justify-content: end;
    gap: 12px;
    max-width: 630px;
  }
`;

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
