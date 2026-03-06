import { styled } from '@linaria/react';

import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';
import { screens } from '@/styles/tokens';

interface TextSectionProps {
  title: string;
  text: string;
}

const StyledTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: ${screens.lg}) {
    gap: 16px;
  }
`;

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
