'use client';

import type { StyledContentCardProps } from './content-card.types';

import { Text } from '@/components/elements/text';
import { styled, screens } from '@/styles';

export const StyledContentCardWrapper = styled.div<StyledContentCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ $isNewsletter }) => ($isNewsletter ? '16px' : '32px')};
  border-radius: 12px;
  padding: 16px;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border),
    0 0 8px 0 var(--shadow-default);

  @media (min-width: ${screens['lg']}) {
    padding: 32px;
    gap: ${({ $isNewsletter }) => ($isNewsletter ? '16px' : '43px')};
  }
`;

export const StyledContentCardTitle = styled(Text)`
  &&& {
    max-width: 452px;
  }
`;

export const StyledContentCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledContentCardForm = styled.form`
  display: flex;
  gap: 12px;
  flex-direction: column;

  @media (min-width: ${screens['lg']}) {
    flex-direction: row;
    align-items: center;
  }

  & button {
    flex-shrink: 0;
  }
`;