import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { LandingLayout } from '@/components/layout/landing-layout';
import { SocialShare } from '@/components/modules/social-share';
import { SuccessHero } from '@/components/sections/success-hero';

export default function SendToComputerThanksPage() {
  return (
    <LandingLayout>
      <SuccessHero
        heading="Thanks!"
        excerpt={
          <Stack $gapxl="7px">
            <Text fontSize="m">
              We&apos;ve just sent a download link for <Link href="/">HTTP Toolkit</Link> to your inbox to check out on
              your desktop later.
            </Text>
            <Text fontSize="m">If you think this sounds amazing, tell your friends about it too:</Text>
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
