import { StyledFullGradient, StyledGradientMobile, StyledSuccessWrapper } from '../contact.styles';

import { Button } from '@/components/elements/button';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { CheckFat } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';
import { LandingLayout } from '@/components/layout/landing-layout';

export default function ContactSuccessPage() {
  return (
    <LandingLayout>
      <StyledGradientMobile>
        <Gradient />
      </StyledGradientMobile>
      <StyledSuccessWrapper>
        <SquareIcon icon={CheckFat} />
        <Heading fontSize="l">Thank you for contacting us!</Heading>
        <Text fontSize="m">We will get back to you soon.</Text>
        <Button href="/" $variant="secondary" $small>
          Got to the Homepage
        </Button>
        <StyledFullGradient>
          <Gradient $shape="full" />
        </StyledFullGradient>
      </StyledSuccessWrapper>
    </LandingLayout>
  );
}
