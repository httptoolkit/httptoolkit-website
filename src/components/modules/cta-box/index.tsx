import {
  StyledCTABoxButtonWrapper,
  StyledCTABoxContentWrapper,
  StyledCTABoxSubtitle,
  StyledCTABoxWrapper,
} from './cta-box.styles';
import type { CTABoxProps } from './cta-box.types';

import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import type { HeadingProps } from '@/components/elements/heading/heading.types';
import { Text } from '@/components/elements/text';

export const CTABox = ({
  title,
  buttonText,
  subtitle,
  text,
  textOverButton,
  buttonHref,
  buttonIcon,
  $variant = 'blog',
}: CTABoxProps) => {
  const HeadingColor: HeadingProps['color'] = $variant === 'blog' ? 'textGradient' : 'white';
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
          $small={$variant === 'faq'}
          target="_blank"
          $variant="secondary"
          href={buttonHref}
          icon={buttonIcon}
        >
          {buttonText}
        </Button>
      </StyledCTABoxButtonWrapper>
    </StyledCTABoxWrapper>
  );
};
