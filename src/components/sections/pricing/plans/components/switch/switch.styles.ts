'use client';

import { styled, fontSizes, fontWeight } from '@/styles';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  gap: 2px;
`;

export const StyledOption = styled.span`
  padding: 8px 16px;
  color: var(--text-dark-grey);
  font-size: ${fontSizes.text.s};
  line-height: 1.5;

  &[data-is-active='true'] {
    border-radius: 24px;
    color: var(--text-light-grey);
    font-weight: ${fontWeight.medium};
    background-color: var(--ink-black);
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
  background: var(--dark-grey);
  border-radius: 40px;
  padding: 2px;
  transition: 350ms all ease-in;
  border: none;
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0 0 8px 0 var(--shadow-default);

  cursor: pointer;
`;