'use client';

import { styled } from '@/styles';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  gap: 2px;
  cursor: pointer;
`;

export const StyledOption = styled.span`
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.text.darkGrey};
  font-size: ${({ theme }) => theme.fontSizes.text.s};
  line-height: 1.5;

  &[data-is-active='true'] {
    border-radius: 24px;
    color: ${({ theme }) => theme.colors.text.lightGrey};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    background-color: ${({ theme }) => theme.colors.inkBlack};
  }
`;

export const StyledInput = styled.input`
  opacity: 0;
  position: absolute;
`;

export const StyledOptionsWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${({ theme }) => theme.colors.darkGrey};
  border-radius: 40px;
  padding: 2px;
  transition: 350ms all ease-in;
  border: none;
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset,
    0 0 8px 0 ${({ theme }) => theme.colors.shadowDefault};
`;
