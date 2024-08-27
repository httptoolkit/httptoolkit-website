import { TryYourselfWrapper } from './wrapper';

import { Logo, RocketLaunch } from '@/components/elements/icon';
import { ResponsiveLineBreak } from '@/components/elements/responsive-line-break';
import { CTA } from '@/components/sections/cta';
import type { CTAProps } from '@/components/sections/cta/cta.types';

interface TryItForYourselfCTAProps {
  variant?: CTAProps['variant'];
  isFooterClose?: CTAProps['$isFooterClose'];
}

export const TryItForYourselfCTA = ({ variant = 'cta-square', isFooterClose = false }: TryItForYourselfCTAProps) => {
  return (
    <TryYourselfWrapper>
      <CTA
        variant={variant}
        icon={Logo}
        textAppearance="small"
        heading="Get started now"
        excerpt={<>
          Download HTTP Toolkit to intercept, inspect, <ResponsiveLineBreak />and modify any HTTP traffic in seconds.
        </>}
        $isFooterClose={isFooterClose}
      />
    </TryYourselfWrapper>
  );
};
