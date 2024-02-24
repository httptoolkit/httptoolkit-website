'use client';

import type { IconProps } from '@phosphor-icons/react';
import { Moon, Sun } from '@phosphor-icons/react';

import { styled, css } from '@/styles';

const iconStyles = css`
  fill: ${({ theme }) => theme.colors.text.darkGrey};

  &[data-is-active='true'] {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export const StyledLabel = styled.label`
  --icon-size: 48px;
  max-width: 98px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.shadowDefault};
`;

export const StyledMoon = styled(Moon)<IconProps>`
  ${iconStyles};
`;

export const StyledSun = styled(Sun)<IconProps>`
  ${iconStyles};
`;

export const StyledSwitch = styled.div`
  position: relative;
  width: 98px;
  height: 50px;
  background: ${({ theme }) => theme.colors.inkBlack};
  border-radius: 12px;
  padding: 4px;
  transition: 350ms all ease-in;
  border: 1px solid ${({ theme }) => theme.colors.mediumGrey};

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--icon-size);
    height: var(--icon-size);
    border-radius: 11px;
    background: ${({ theme }) => theme.colors.darkGrey};
    transform: translate(0, -50%);
    transition: 300ms transform cubic-bezier(0.25, 0.1, 0.52, 0.95);
  }
`;

export const StyledInput = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${StyledSwitch} {
    background: ${({ theme }) => theme.colors.inkBlack};

    &:before {
      transform: translate(var(--icon-size), -50%);
    }
  }
`;

export const StyledIconsWrapper = styled.span`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 96px;
`;
