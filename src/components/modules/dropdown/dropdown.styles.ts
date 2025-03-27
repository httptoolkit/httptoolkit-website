'use client';

import type { DropdownOptionProps, DropdownProps } from './dropdown.types';

import { Link } from '@/components/elements/link';
import { css, screens, styled } from '@/styles';

const openDropdown = css`
  padding: 4px;
  max-height: fit-content;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
  opacity: 1;
  visibility: visible;
`;

export const DropdownOptionsWrapper = styled.div<Pick<DropdownProps, '$direction'>>`
  display: grid;
  position: absolute;
  top: ${({ $direction }) => ($direction === 'bottom' ? 'calc(100% + 4px)' : 'auto')};
  bottom: ${({ $direction }) => ($direction === 'top' ? 'calc(100% + 4px)' : 'auto')};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.inkBlack};
  padding: 4px;
  gap: 4px;
  min-width: 100%;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  overflow: hidden;
  z-index: 33;
  box-shadow: '0px 0px 8px 0px rgba(230, 232, 242, 0.05)';

  @media (hover: hover) {
    &:hover {
      ${openDropdown}
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: -5px;
    background: transparent;
    width: 100%;
    height: 5px;
  }
`;

export const DropdownWrapper = styled.div<Pick<DropdownProps, '$variant'>>`
  position: relative;
  width: 100%;
  border-radius: 12px;
  justify-content: center;

  &:focus-within ${DropdownOptionsWrapper} {
    ${openDropdown}
  }

  @media (hover: hover) {
    &:hover ${DropdownOptionsWrapper} {
      ${openDropdown}
    }
  }

  @media (min-width: ${screens['lg']}) {
    justify-content: start;
    width: fit-content;
  }
`;

export const DropdownHr = styled.hr`
  width: 80%;
  opacity: 0.5;
`;

const baseOption = css<DropdownOptionProps>`
  background-color: transparent;
  border: none;
  border-radius: 10px;
  padding: 14px;
  color: ${({ theme }) => theme.colors.text.lightGrey};
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  line-height: 1;
  text-align: center;
  text-decoration: none;
  outline: none;

  @media (min-width: ${screens['lg']}) {
    text-align: left;
  }

  &:focus {
    background: ${({ theme }) => theme.colors.inkGrey};
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.inkGrey};
    }
  }
`;

export const DropdownOptionLink = styled(Link)<DropdownOptionProps>`
  ${baseOption}
`;

export const DropdownOptionButton = styled.button<DropdownOptionProps>`
  ${baseOption}
`;

export const DropdownOptionSubtext = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.text.xs};
  margin-top: 5px;
`;