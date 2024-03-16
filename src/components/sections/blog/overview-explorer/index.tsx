import { Suspense } from 'react';

import { StyledExplorerContainer, StyledExplorerSection, StyledSearchWrapper } from './overview-explorer.styled';
import { TagsNavigation } from './tags-navigation';

export const OverviewExplorer = () => {
  return (
    <StyledExplorerSection>
      <StyledExplorerContainer>
        <Suspense fallback={'loading tags...'}>
          <TagsNavigation />
        </Suspense>
        <StyledSearchWrapper>Search box</StyledSearchWrapper>
      </StyledExplorerContainer>
    </StyledExplorerSection>
  );
};
