'use client';

import { styled, fontSizes, fontWeight } from '@/styles';

export const StyledCopy = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 24px;
  padding: 8px 16px;
  border-radius: 6px;
  border: 0;
  color: var(--text-white);
  font-size: ${fontSizes.text.l};
  font-weight: ${fontWeight.bold};
  line-height: 150%;
  background-color: var(--dark-grey);
  box-shadow:
    0 0 0 1px var(--border-dark),
    0px 0px 8px 0px var(--shadow-default);

  & svg {
    color: var(--text-white);
  }
`;

export const StyledCopyButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  width: fit-content;
  padding: 0;

  & svg {
    color: var(--text-white);

    &:hover:not(:active) {
      color: var(--cinnabar-red);
    }
  }
`;