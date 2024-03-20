'use client';

import { Drawer } from 'vaul';

import { styled } from '@/styles';

export const StyledDrawerContent = styled(Drawer.Content)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  width: 100%;
  max-height: calc(100vh - 30%);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding-bottom: 0;

  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
  background: ${({ theme }) => theme.colors.inkBlack};
`;

export const StyledMobileTrigger = styled(Drawer.Trigger)`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.darkGrey};
`;

export const StyledMobileDrawerHeading = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.darkGrey};
  box-shadow: 0 1px 0 1px ${({ theme }) => theme.colors.button.border};
`;

export const StyledMobileNavigationWrapper = styled.ul`
  overflow-y: auto;
  padding: 8px 0 0 24px;
  /* width */
  ::-webkit-scrollbar {
    width: 16px;
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

  & li {
    padding: 12px;
  }
`;
