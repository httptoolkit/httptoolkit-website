import { Suspense } from 'react';

import { StyledExplorerContainer, StyledExplorerSection, StyledSearchWrapper } from './overview-explorer.styled';
import { TagsMobileNavigation } from './tags-mobile-navigation';
import { TagsNavigation } from './tags-navigation';

import { SiteSearch } from '@/components/modules/site-search';

export const OverviewExplorer = () => {
  return (
    <StyledExplorerSection>
      <StyledExplorerContainer>
        <Suspense fallback={'loading tags...'}>
          <TagsNavigation />
          <TagsMobileNavigation />
        </Suspense>
        <StyledSearchWrapper>
          <SiteSearch />
        </StyledSearchWrapper>
      </StyledExplorerContainer>
    </StyledExplorerSection>
  );
};
