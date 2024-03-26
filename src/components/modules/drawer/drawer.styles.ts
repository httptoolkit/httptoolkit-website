import type { StyledDrawerProps } from './drawer.types';

import { styled } from '@/styles';

export const DrawerContainer = styled.div<StyledDrawerProps>`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 100%;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  transition: left 0.3s ease-in-out;
  box-shadow: ${({ $isOpen }) => ($isOpen ? ' 0 0 10px rgba(0, 0, 0, 0.1)' : 'initial')};
  z-index: 1000;
`;

export const DrawerHeader = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGradient};
`;

export const DrawerContent = styled.div`
  padding: 16px;
  height: calc(100dvh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;
