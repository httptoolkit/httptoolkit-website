import { Breadcrumbs } from '../components/breadcrumbs';
import { Steps } from '../components/steps';
import type { WillItCorsSteps } from '../data';
import { willItCorsSteps } from '../data';
import { StyledWillItCorsContainer, StyledWillItCorsWrapper } from '../will-it-cors.styles';

import Stack from '@/components/elements/stack';
import { LandingLayout } from '@/components/layout/landing-layout';

export async function generateStaticParams() {
  return willItCorsSteps.map(step => ({
    step: step,
  }));
}

type WillItCorsStepsPageProps = {
  params: { step: WillItCorsSteps };
};

export default function WillItCorsStepsPage({ params }: WillItCorsStepsPageProps) {
  const { step } = params;

  return (
    <LandingLayout isNavigationEnabled={false}>
      <StyledWillItCorsWrapper>
        <StyledWillItCorsContainer>
          <Stack>
            <Breadcrumbs currentStep={step} />
            <Steps currentStep={step} />
          </Stack>
        </StyledWillItCorsContainer>
      </StyledWillItCorsWrapper>
    </LandingLayout>
  );
}
