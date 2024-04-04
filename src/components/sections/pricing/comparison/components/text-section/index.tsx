import { StyledTextSection } from './text-section.styles';
import type { TextSectionProps } from './text-section.types';

import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';

export const TextSection = ({ title, text }: TextSectionProps) => {
  return (
    <StyledTextSection data-text-section="true">
      <Heading as="h2" fontSize="xs" color="lightGrey" fontWeight="medium">
        {title}
      </Heading>
      <Text fontSize="m" color="darkGrey">
        {text}
      </Text>
    </StyledTextSection>
  );
};
