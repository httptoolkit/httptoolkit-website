import type { Metadata } from 'next';

import { Breadcrumbs } from '../components/breadcrumbs';
import { Steps } from '../components/steps';
import type { WillItCorsSteps } from '../data';
import { willItCorsSteps } from '../data';
import { StyledWillItCorsContainer, StyledWillItCorsWrapper } from '../will-it-cors.styles';

import Stack from '@/components/elements/stack';
import { LandingLayout } from '@/components/layout/landing-layout';
import { buildMetadata } from '@/lib/utils/build-metadata';

export async function generateStaticParams() {
  return willItCorsSteps.map(step => ({
    step: step,
  }));
}

type WillItCorsStepsPageProps = {
  params: { step: WillItCorsSteps };
};

export const metadata: Metadata = buildMetadata({
  title: 'Will It CORS? - a CORS debugging tool that actually works.',
  description: 'Literally nobody understands CORS, except this one magic web page',
  robots: {
    //prevent step pages to being indexed
    index: false,
  },
});

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
