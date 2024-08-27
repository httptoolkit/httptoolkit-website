'use client';

import { styled } from '@/styles';

export const StyledCopy = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 24px;
  padding: 8px 16px;
  border-radius: 6px;
  border: 0;
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.fontSizes.text.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 150%;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.borderDark},
    0px 0px 8px 0px ${({ theme }) => theme.colors.shadowDefault};

  & svg {
    color: ${({ theme }) => theme.colors.text.white};
  }
`;

export const StyledCopyButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  width: fit-content;
  padding: 0;

  & svg {
    color: ${({ theme }) => theme.colors.text.white};

    &:hover:not(:active) {
      color: var(--cinnabar-red);
    }
  }
`;
