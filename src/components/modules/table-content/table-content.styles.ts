'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { keyframes } from 'styled-components';

import { Link } from '@/components/elements/link';
import { css, styled, fontWeight } from '@/styles';

export const StyledTableContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  padding: 16px;
  max-height: calc(100vh - 32px);
  overflow: auto;
  background: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0px 0px 24px 0px var(--shadow-inner-box) inset;

  scrollbar-width: thin;
  scrollbar-color: var(--light-grey) transparent;
  scrollbar-gutter: stable;
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

  &:focus,
  &:focus-within {
    background-color: var(--ink-grey);
  }

  @media (hover: hover) {
    &:hover {
      background-color: var(--ink-grey);
    }
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

  & a {
    transition: color ease-in 300ms;
    &.active {
      color: var(--electric-light-blue);

      p {
        transition: color ease-in 300ms;
        color: var(--electric-light-blue);
      }
    }
  }
`;

export const StyledTableContentItemTrigger = styled(Accordion.Trigger)`
  &&& {
    ${TriggerStyles}

    &[data-state=open] svg {
      transform: rotate(180deg);
    }

    & svg {
      transition: transform 0.5s;
      color: var(--text-white);
    }
  }
`;

export const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`;

export const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
`;

export const StyledTableContentContent = styled(Accordion.Content)`
  &&& {
    overflow: hidden;
    &[data-state='open'] {
      animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
    &[data-state='closed'] {
      animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
  }
`;

export const StyledTableContentSubitem = styled(Link)<{ $isAccordionFixed?: boolean }>`
  &&& {
    display: inline-block;
    width: 100%;
    font-weight: ${fontWeight.normal};
    color: var(--text-light-grey);
    transition: all 0.1s;
    outline: none;
    border-radius: 8px;

    &.active {
      span,
      p {
        color: var(--text-electric-light-blue);
      }
    }

    ${({ $isAccordionFixed }) =>
      $isAccordionFixed
        ? css`
            padding: 8px 16px;

            &:focus,
            &:focus-within {
              background-color: var(--ink-grey);
            }

            @media (hover: hover) {
              &:hover {
                background-color: var(--ink-grey);
              }
            }
          `
        : css`
            padding: 8px 32px;

            &:focus {
              color: var(--text-dark-grey);
            }

            @media (hover: hover) {
              &:hover {
                color: var(--text-dark-grey);
              }
            }
          `}

    &[data-active='true'] {
      color: var(--electric-light-blue);
    }
  }
`;

export const TableOfContentFixedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;