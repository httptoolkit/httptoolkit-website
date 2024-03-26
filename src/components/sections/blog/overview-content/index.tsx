import { Suspense } from 'react';

import { StyledBlogOverviewSection, StyledSubscriberBox } from './overview-content.styles';
import { OverviewPostsGrid } from '../overview-posts-grid';

import { Newsletter } from '@/components/modules/newsletter';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';

export const OverviewBlogContent = () => {
  return (
    <StyledBlogOverviewSection>
      <StyledSubscriberBox>
        <Newsletter
          action={NEWSLETTER_URLS.blog}
          $variant="blog-short"
          title="HTTP Toolkit Newsletter"
          text="Become an HTTP & debugging expert by subscribing to receive new posts like these emailed straight to your inbox:"
          buttonText="Submit"
        />
      </StyledSubscriberBox>
      <Suspense fallback={'loading posts...'}>
        <OverviewPostsGrid />
      </Suspense>
    </StyledBlogOverviewSection>
  );
};
