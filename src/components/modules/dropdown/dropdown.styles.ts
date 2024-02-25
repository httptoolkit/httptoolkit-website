'use client';

import type { DropdownOptionProps } from './dropdown.types';

import { Link } from '@/components/elements/link';
import { css, screens, styled } from '@/styles';
import { adjustOpacity } from '@/styles/helpers/adjust-opacity';

const openDropdown = css`
  padding: 4px;
  max-height: 300px;
  border: 1px solid ${({ theme }) => adjustOpacity(theme.colors.white, 0.12)};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.borderGradient};
`;

export const DropdownOptionsWrapper = styled.div`
  display: grid;
  position: absolute;
  top: calc(100% + 4px);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.inkBlack};
  padding: 0 4px;
  gap: 4px;
  min-width: 100%;
  max-height: 0;
  transition: all 0.5s linear;
  overflow: hidden;
  z-index: 33;
  box-shadow: 0px 0px 8px 0px rgba(230, 232, 242, 0.05);

  &:hover {
    ${openDropdown}
  }
`;

export const DropdownWrapper = styled.div`
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

const baseOption = css`
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

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }
`;
export const LinkDropdownOption = styled(Link)<DropdownOptionProps>`
  ${baseOption}
`;

export const DropdownOption = styled.button<DropdownOptionProps>`
  ${baseOption}
`;
