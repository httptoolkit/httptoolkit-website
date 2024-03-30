import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { LandingLayout } from '@/components/layout/landing-layout';
import { SocialShare } from '@/components/modules/social-share';
import { SuccessHero } from '@/components/sections/success-hero';

export default function BlogThankYouPage() {
  return (
    <LandingLayout>
      <SuccessHero
        heading="Thanks for signing up"
        excerpt={
          <Stack $gapxl="7px">
            <Text fontSize="m">Watch your inbox for new blog posts coming soon.</Text>
            <Text fontSize="m">
              Have you tried HTTP Toolkit out for yourself yet? <Link href="/">Download it now.</Link>
            </Text>
          </Stack>
        }
        callToAction={
          <Stack $gapxl="7px" $alignItems="center">
            <Text fontSize="s">Share HTTP Toolkit on:</Text>
            <SocialShare />
          </Stack>
        }
      />
    </LandingLayout>
  );
}
