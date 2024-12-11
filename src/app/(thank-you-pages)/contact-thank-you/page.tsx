import { LandingLayout } from '@/components/layout/landing-layout';
import { SuccessHero } from '@/components/sections/success-hero';

import { Text } from '@/components/elements/text';
import { Link } from '@/components/elements/link';
import { Button } from '@/components/elements/button';
import Stack from '@/components/elements/stack';

export default function ContactThankYouPage() {
  return (
    <LandingLayout>
      <SuccessHero
        heading="Thanks for your message"
        excerpt={<>
          <Text>Keep an eye on your inbox for a response shortly.</Text>
          <Text>
            If you need help in the meantime, take a look at the documentation
            and the existing discussions on GitHub:
          </Text>
        </>}

        callToAction={
          <Stack $direction='row' $gapxl="24px" $alignItems="center">
            <Button
              href="/docs"
              $variant="secondary"
            >Read the docs</Button>
            <Button
              href="https://github.com/httptoolkit/httptoolkit/issues/"
              $variant="secondary"
            >Check out GitHub</Button>
          </Stack>
        }
      />
    </LandingLayout>
  );
}
