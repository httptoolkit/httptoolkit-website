import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { LandingLayout } from '@/components/layout/landing-layout';
import { SocialShare } from '@/components/modules/social-share';
import { SuccessHero } from '@/components/sections/success-hero';

export default function ThankYouPage() {
  return (
    <LandingLayout>
      <SuccessHero
        heading="Thanks for signing up"
        excerpt="Watch your inbox for updates, there's a lot more new features coming soon! If you think this sounds great,
        tell your friends:"
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
