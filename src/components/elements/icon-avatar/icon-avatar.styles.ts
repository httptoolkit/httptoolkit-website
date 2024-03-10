'use client';

import { styled } from '@/styles';

export const StyledAvatar = styled.div`
  min-width: 48px;
  height: 48px;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.inkBlack};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    font-size: 1.5rem;
    width: 25px;
    height: 25px;
    fill: ${({ theme }) => theme.colors.electricLightBlue};
  }
`;
