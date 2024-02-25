'use client';

import type { DropdownOptionProps, DropdownProps } from './dropdown.types';

import { Link } from '@/components/elements/link';
import { css, screens, styled } from '@/styles';

const openDropdown = css<Pick<DropdownProps, '$variant'>>`
  padding: 4px;
  max-height: 300px;
  box-shadow: 0 0 0 1px
    ${({ theme, $variant }) => ($variant === 'secondary' ? theme.colors.borderGradient : theme.colors.cinnarbarRed)};
`;

export const DropdownOptionsWrapper = styled.div<Pick<DropdownProps, '$variant'>>`
  display: grid;
  position: absolute;
  top: calc(100% + 4px);
  border-radius: 12px;
  background: ${({ theme, $variant }) =>
    $variant === 'secondary' ? theme.colors.inkBlack : theme.colors.orangeGradient};
  padding: 0 4px;
  gap: 4px;
  min-width: 100%;
  max-height: 0;
  transition: all 0.5s linear;
  overflow: hidden;
  z-index: 33;
  box-shadow: ${({ $variant }) =>
    $variant === 'secondary' ? '0px 0px 8px 0px rgba(230, 232, 242, 0.05)' : '0px 0px 8px 0px rgba(225, 66, 31, 0.05)'};

  &:hover {
    ${openDropdown}
  }
`;

export const DropdownWrapper = styled.div<Pick<DropdownProps, '$variant'>>`
  position: relative;
  width: 100%;
  border-radius: 12px;
  justify-content: center;

  &:hover ${DropdownOptionsWrapper}, &:focus-within ${DropdownOptionsWrapper} {
    ${openDropdown}
  }

  @media (min-width: ${screens['lg']}) {
    justify-content: start;
    width: fit-content;
  }
`;

const baseOption = css<DropdownOptionProps>`
  background-color: transparent;
  border: none;
  border-radius: 10px;
  padding: 14px;
  color: ${({ theme, $variant }) =>
    $variant === 'secondary' ? theme.colors.text.lightGrey : theme.colors.text.alwayWhite};
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  line-height: 1;
  text-align: center;
  text-decoration: none;
  outline: none;

  @media (min-width: ${screens['lg']}) {
    text-align: left;
  }

  &:hover,
  &:focus {
    background: ${({ theme, $variant }) =>
      $variant === 'secondary' ? theme.colors.darkGrey : theme.colors.cinnarbarRedDark};
  }
`;

export const LinkDropdownOption = styled(Link)<DropdownOptionProps>`
  ${baseOption}
`;

export const DropdownOption = styled.button<DropdownOptionProps>`
  ${baseOption}
`;
