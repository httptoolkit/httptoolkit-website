import { StyledFullGradient, StyledGradientMobile, StyledSuccessWrapper } from './success-hero.styles';
import type { SuccessHeroProps } from './sucess-hero.types';

import { Button } from '@/components/elements/button';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { CheckFat } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';

export const SuccessHero = ({ heading, excerpt, callToAction }: SuccessHeroProps) => {
  return (
    <>
      <StyledGradientMobile>
        <Gradient />
      </StyledGradientMobile>
      <StyledSuccessWrapper>
        <SquareIcon icon={CheckFat} />
        <Heading fontSize="l">{heading}</Heading>

        {typeof excerpt === 'string' ? <Text fontSize="m">{excerpt}</Text> : <>{excerpt}</>}

        {callToAction ? (
          callToAction
        ) : (
          <Button href="/" $variant="secondary" $small>
            Go to the Homepage
          </Button>
        )}

        <StyledFullGradient>
          <Gradient $shape="full" />
        </StyledFullGradient>
      </StyledSuccessWrapper>
    </>
  );
};
