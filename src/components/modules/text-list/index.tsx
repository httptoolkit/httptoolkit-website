import { StyledTextListItem, StyledTextListWrapper } from './text-list.styles';
import type { TextListProps } from './text-list.types';

import { CheckIcon } from '@/components/elements/check-icon';
import { Text } from '@/components/elements/text';

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
