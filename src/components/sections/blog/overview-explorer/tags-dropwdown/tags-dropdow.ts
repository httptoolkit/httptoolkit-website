'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { styled } from '@/styles';

export const StyledButtonTrigger = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.lightGrey};
  font-size: ${({ theme }) => theme.fontSizes.text.m};

  cursor: pointer;
  transition: color ease-in 200ms;

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.text.electricLightBlue};
  }
`;

export const StyledDropdownMenuContent = styled(DropdownMenu.Content)`
  background: ${({ theme }) => theme.colors.inkBlack};
  border-radius: 16px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
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
      background: ${({ theme }) => theme.colors.darkGrey};
    }

    &:hover {
      background: ${({ theme }) => theme.colors.darkGrey};
    }
  }
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.darkGrey};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    height: 94px;
    background: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 40px;
    border: 2px solid ${({ theme }) => theme.colors.darkGrey};
  }
`;

export const StyledDropdownContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  border-radius: 16px;
  padding: 16px 8px 16px 16px;
  box-shadow: 0px 0px 24px 0px ${({ theme }) => theme.shadow.innerBox} inset;

  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: ${({ theme }) => theme.fontFamily.dmSans};
`;

export const StyledDropdownItem = styled.span`
  color: ${({ theme }) => theme.colors.text.lightGrey};
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  text-transform: capitalize;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
