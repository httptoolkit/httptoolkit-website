'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { styled, fontSizes, fontWeight } from '@/styles';

export const StyledButtonTrigger = styled.button`
  background: transparent;
  border: none;
  color: var(--text-light-grey);
  font-size: ${fontSizes.text.m};

  cursor: pointer;
  transition: color ease-in 200ms;

  display: flex;
  align-items: center;
  gap: 8px;

  @media (hover: hover) {
    &:hover {
      color: var(--text-electric-light-blue);
    }
  }
`;

export const StyledDropdownMenuContent = styled(DropdownMenu.Content)`
  &&& {
    background: var(--ink-black);
    border-radius: 16px;
    box-shadow: 0 0 0 1px var(--button-border);
    max-height: 296px;
    min-width: 343px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 16px;

    & .tagItem {
      border-radius: 8px;
      padding: 8px 16px;
      cursor: pointer;
      transition: background 200ms ease-in;

      &:focus-visible {
        outline: none;
        background: var(--ink-grey);
      }
      @media (hover: hover) {
        &:hover {
          background: var(--ink-grey);
        }
      }
    }
    /* width */
    ::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: var(--ink-grey);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      height: 94px;
      background: var(--light-grey);
      border-radius: 40px;
      border: 2px solid var(--ink-grey);
    }
  }
`;

export const StyledDropdownContentWrapper = styled.ul`
  overflow-y: auto;
  height: 100%;
  border-radius: 16px;
  padding: 16px 8px 16px 16px;
  box-shadow: 0px 0px 24px 0px var(--shadow-inner-box) inset;

  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-dmSans);

  & li a {
    display: block;
  }
`;

export const StyledDropdownItem = styled.span`
  color: var(--text-light-grey);
  font-size: ${fontSizes.text.m};
  text-transform: capitalize;
  font-weight: ${fontWeight.bold};
`;