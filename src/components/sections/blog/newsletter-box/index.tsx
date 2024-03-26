import { Newsletter } from '@/components/modules/newsletter';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';

export const NewsletterBox = () => {
  return (
    <Newsletter
      action={NEWSLETTER_URLS.blog}
      $variant="blog-short"
      title="HTTP Toolkit Newsletter"
      text="Become an HTTP & debugging expert by subscribing to receive new posts like these emailed straight to your inbox:"
      buttonText="Submit"
    />
  );
};
