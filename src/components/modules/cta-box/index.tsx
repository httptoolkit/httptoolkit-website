import { styled } from '@linaria/react';
import type { Icon } from '@phosphor-icons/react';

import { Button } from '@/components/elements/button';
import { Heading, type HeadingProps } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';
import { screens, fontSizes, fontWeight } from '@/styles/tokens';

export interface CTABoxVariantProps {
  variant?: 'blog' | 'faq';
}

export interface CTABoxProps extends CTABoxVariantProps {
  title: string;
  subtitle?: string;
  text?: string;
  textOverButton?: string;
  buttonText: string;
  buttonHref: string;
  buttonIcon?: Icon;
}

const StyledCTABoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--ink-black);
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow:
    0px 0px 24px 0px var(--shadow-inner-box) inset,
    0 0 0 1px var(--button-border);

  background-image: var(--background-dots),
    var(--background-gradient);
  background-size:
    250px auto,
    200% 200%;
  background-repeat: repeat, no-repeat;
  background-position:
    top 0 center,
    top 10% center;
  margin: 48px 0;

  & * {
    text-align: center;
  }

  @media (min-width: ${screens.lg}) {
    gap: 24px;
    padding: 32px;
    align-items: initial;
    & * {
      text-align: inherit;
    }
  }
`;

const StyledCTABoxSubtitle = styled.p`
  font-size: ${fontSizes.label.l};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.6;
  color: var(--text-dark-grey);
  text-transform: uppercase;
`;

const StyledCTABoxContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledCTABoxButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CTABox = ({
  title,
  buttonText,
  subtitle,
  text,
  textOverButton,
  buttonHref,
  buttonIcon,
  variant = 'blog',
}: CTABoxProps) => {
  const HeadingColor: HeadingProps['color'] = variant === 'blog' ? 'textGradient' : 'white';
  return (
    <StyledCTABoxWrapper>
      {subtitle && <StyledCTABoxSubtitle>{subtitle}</StyledCTABoxSubtitle>}
      <StyledCTABoxContentWrapper>
        <Heading fontSize="m" as="h3" color={HeadingColor}>
          {title}
        </Heading>
        {text && (
          <Text fontSize="m" color="lightGrey">
            {text}
          </Text>
        )}
      </StyledCTABoxContentWrapper>
      <StyledCTABoxButtonWrapper>
        {textOverButton && (
          <Text fontSize="m" color="lightGrey">
            {textOverButton}
          </Text>
        )}
        <Button
          as="link"
          small={variant === 'faq'}
          target="_blank"
          variant="secondary"
          href={buttonHref}
          icon={buttonIcon}
        >
          {buttonText}
        </Button>
      </StyledCTABoxButtonWrapper>
    </StyledCTABoxWrapper>
  );
};
