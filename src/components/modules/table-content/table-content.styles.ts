'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { keyframes } from 'styled-components';

import { Link } from '@/components/elements/link';
import { css, styled } from '@/styles';

export const StyledTableContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset,
    0px 0px 24px 0px ${({ theme }) => theme.shadow.innerBox} inset;
`;

const TriggerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  width: 100%;

  &:hover,
  &:focus,
  &:focus-within {
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }

  & > p,
  & > p > a {
    display: inline-block;
    width: 100%;
    text-align: left;
  }
`;

export const StyledTableContentItemLink = styled.div`
  ${TriggerStyles}
`;

export const StyledTableContentItemTrigger = styled(Accordion.Trigger)`
  ${TriggerStyles}

  &[data-state=open] svg {
    transform: rotate(180deg);
  }

  & svg {
    transition: transform 0.5s;
    color: ${({ theme }) => theme.colors.text.white};
  }
`;

const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`;

const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
`;

export const StyledTableContentContent = styled(Accordion.Content)`
  overflow: hidden;
  &[data-state='open'] {
    animation: ${slideDown} 300ms ease-out;
  }
  &[data-state='closed'] {
    animation: ${slideUp} 300ms ease-out;
  }
`;

export const StyledTableContentSubitem = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 8px 32px;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.lightGrey};
  transition: all 0.1s;
  outline: none;

  &:hover,
  &:focus {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.electricLightBlue};
  }
`;
