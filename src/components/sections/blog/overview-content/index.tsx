import { Suspense } from 'react';

import { StyledBlogOverviewSection, StyledSubscriberBox } from './index.styles';
import { NewsletterBox } from '../newsletter-box';
import { OverviewPostsGrid } from '../overview-posts-grid';

export const OverviewBlogContent = () => {
  return (
    <StyledBlogOverviewSection>
      <StyledSubscriberBox>
        <NewsletterBox />
      </StyledSubscriberBox>
      <Suspense fallback={'loading posts...'}>
        <OverviewPostsGrid />
      </Suspense>
    </StyledBlogOverviewSection>
  );
};
