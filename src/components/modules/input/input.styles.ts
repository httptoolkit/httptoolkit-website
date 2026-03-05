import { styled } from '@linaria/react';

import { fontSizes, fontWeight } from '@/styles/tokens';

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const StyledInputBorder = styled.span`
  width: 100%;
  display: inline-block;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  padding: 1px;
  height: auto;

  background: var(--border-gradient);

  &[data-styled-as="textarea"] {
    height: 124px;
  }

  @media (hover: hover) {
    &:hover {
      background: var(--blue-gradient);
    }

    &[data-has-error="true"]:hover {
      background: var(--orange-gradient);
    }
  }

  &[data-has-error="true"] {
    background: var(--orange-gradient);
  }
`;

export const StyledSearchButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 12px;
  margin: auto;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--text-always-white);
`;

export const StyledInput = styled.input`
  padding: 14px 14px;
  border: none;
  font-size: ${fontSizes.text.s};
  line-height: 150%;
  color: var(--text-light-grey);
  outline: 0;
  width: 100%;
  height: 46px;
  resize: none;

  border-radius: 6px;
  background-color: var(--ink-grey);

  box-shadow:
    0px 1.5px 4px -1px rgba(10, 9, 11, 0.07),
    0px 3px 1px 0px rgba(24, 25, 28, 0.5) inset;

  &[data-as="textarea"] {
    height: 100%;
  }

  &[data-type="search"] {
    background-color: var(--dark-grey);
  }

  &[data-has-error="true"] {
    color: var(--text-cinnabar-red);
    background-color: var(--ink-black);
  }

  &::placeholder {
    color: var(--text-dark-grey);
  }

  &[data-has-error="true"]::placeholder {
    color: var(--text-cinnabar-red);
  }

  &:focus {
    background-color: var(--ink-black);
  }
`;

export const STyledLabel = styled.label`
  font-weight: ${fontWeight.bold};
  color: var(--text-dark-grey);
`;
