import { StyledCardImage, StyledCardImageWrapper, StyledCardTextWrapper, StyledCardWrapper } from './card.styles';
import type { CardProps } from './card.types';

import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';

export const Card = ({ title, text, darkImage, lightImage, imageAlt }: CardProps) => {
  return (
    <StyledCardWrapper>
      <StyledCardImageWrapper>
        <StyledCardImage withoutStyles lightSrc={lightImage} darkSrc={darkImage} alt={imageAlt} />
      </StyledCardImageWrapper>
      <StyledCardTextWrapper>
        <Heading textAlign="center" fontSize="m" color="lightGrey" as="h3">
          {title}
        </Heading>
        <Text fontSize="m" textAlign="center" color="darkGrey">
          {text}
        </Text>
      </StyledCardTextWrapper>
    </StyledCardWrapper>
  );
};
