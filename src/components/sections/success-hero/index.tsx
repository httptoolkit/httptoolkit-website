import { styled } from '@linaria/react';

import { Button } from '@/components/elements/button';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { CheckFat } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';
import { screens } from '@/styles/tokens';

const StyledSuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;

  max-width: 343px;
  margin: 32px auto;

  & a:not([data-button='true']) {
    text-decoration: underline;
    max-width: fit-content;
  }

  @media (min-width: ${screens.md}) {
    max-width: 624px;
    margin: 0 auto;
  }
`;

const StyledFullGradient = styled.div`
  z-index: -1;
  display: none;

  & div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  @media (min-width: ${screens.md}) {
    display: block;
    visibility: visible;
  }
`;

const StyledGradientMobile = styled.div`
  position: absolute;
  top: -100px;
  width: 100%;
  height: 700px;
  display: block;
  visibility: visible;
  z-index: -1;

  @media (min-width: ${screens.md}) {
    display: none;
    visibility: hidden;
  }
`;

interface SuccessHeroProps {
  heading: string;
  excerpt: React.ReactNode;
  callToAction?: React.ReactNode;
}

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
