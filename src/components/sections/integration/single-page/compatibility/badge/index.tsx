import { StyledCompatibilityBadge } from './badge.styles';

import { CheckIcon } from '@/components/elements/check-icon';
import { Text } from '@/components/elements/text';

export const CompatibilityBadge = ({ children }: Component) => {
  return (
    <StyledCompatibilityBadge>
      <CheckIcon $small />
      <Text fontSize="m" color="lightGrey" fontWeight="medium">
        {children}
      </Text>
    </StyledCompatibilityBadge>
  );
};
