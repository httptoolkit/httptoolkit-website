import { CheckIcon } from '@/components/elements/check-icon';
import { Text } from '@/components/elements/text';
import { styled } from '@linaria/react';
import { screens } from '@/styles/tokens';

interface StyledTextListProps {
  $lighterText?: boolean;
}

export interface TextListProps extends StyledTextListProps {
  list: string[];
}

const StyledTextListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: start;

  @media (min-width: ${screens['2xl']}) {
    text-align: initial;
  }
`;

const StyledTextListItem = styled.li`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const TextList = ({ $lighterText = false, list }: TextListProps) => {
  return (
    <StyledTextListWrapper>
      {list.map(text => (
        <StyledTextListItem key={text}>
          <CheckIcon />
          <Text textAlign="left" fontSize="m" color={$lighterText ? 'white' : 'darkGrey'}>
            {text}
          </Text>
        </StyledTextListItem>
      ))}
    </StyledTextListWrapper>
  );
};
