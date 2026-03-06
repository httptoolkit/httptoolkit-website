import { styled } from '@linaria/react';

import { CheckIcon } from '@/components/elements/check-icon';
import { Text } from '@/components/elements/text';
import { screens, fontWeight } from '@/styles/tokens';

const StyledCompatibilityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 24px;
  background: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0px 1.66px 0.83px 0px rgba(201, 212, 251, 0.1) inset,
    0px -0.83px 0.83px 0px rgba(16, 46, 151, 0.1) inset;

  @media (min-width: ${screens.lg}) {
    padding: 8px 16px;
  }

  @media (max-width: ${screens.lg}) {
    & > p {
      font-weight: ${fontWeight.normal};
    }
  }
`;

export const CompatibilityBadge = ({ children }: Component) => {
  return (
    <StyledCompatibilityBadge>
      <CheckIcon small />
      <Text fontSize="m" color="lightGrey" fontWeight="medium">
        {children}
      </Text>
    </StyledCompatibilityBadge>
  );
};
