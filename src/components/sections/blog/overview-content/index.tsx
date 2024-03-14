import { Suspense } from 'react';

import { StyledBlogOverviewSection, StyledSubscriberBox } from './overview-content.styles';
import { OverviewPostsGrid } from '../overview-posts-grid';

export const OverviewBlogContent = () => {
  return (
    <StyledBlogOverviewSection>
      <StyledSubscriberBox>HTTP Toolkit Newsletter</StyledSubscriberBox>
      <Suspense fallback={'loading posts...'}>
        <OverviewPostsGrid />
      </Suspense>
    </StyledBlogOverviewSection>
  );
};
