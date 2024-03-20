import { Suspense } from 'react';

import { StyledExplorerContainer, StyledExplorerSection, StyledSearchWrapper } from './overview-explorer.styled';
import { TagsMobileNavigation } from './tags-mobile-navigation';
import { TagsNavigation } from './tags-navigation';

export const OverviewExplorer = () => {
  return (
    <StyledExplorerSection>
      <StyledExplorerContainer>
        <Suspense fallback={'loading tags...'}>
          <TagsNavigation />
          <TagsMobileNavigation />
        </Suspense>
        <StyledSearchWrapper>Search box</StyledSearchWrapper>
      </StyledExplorerContainer>
    </StyledExplorerSection>
  );
};
