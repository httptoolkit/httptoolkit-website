'use client';

import * as Accordion from '@radix-ui/react-accordion';

import type { StyledAccordionProps } from './accordion.types';
import { slideDown, slideUp } from '../table-content/table-content.styles';

import { css, styled } from '@/styles';

export const StyledAccordionWrapper = styled(Accordion.Root)<StyledAccordionProps>`
  border-radius: 8px;
  width: 100%;

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
        return css`
          padding: 32px 16px;
          background-color: ${({ theme }) => theme.colors.inkBlack};

          @media (min-width: ${({ theme }) => theme.screens.lg}) {
            max-width: 780px;
            padding: 32px;
          }
        `;
    }
  }}
`;

export const StyledAccordionItem = styled(Accordion.Item)<StyledAccordionProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGrey};

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
        return css`
          padding-top: 32px;
          padding-bottom: 32px;
        `;
      case 'transparent':
        return css`
          padding-top: 24px;
          padding-bottom: 24px;
        `;
    }
  }}

  &:first-child {
    padding-top: 0px;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const StyledAccordionTrigger = styled(Accordion.Trigger)`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  width: 100%;
  border: none;
  padding: 0;
  cursor: pointer;

  &[data-state='open'] h3 {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.lightGrey};
  }

  & svg {
    transition: transform 300ms;
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`;

export const StyledAccordionTransparentTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.text.l};
  color: ${({ theme }) => theme.colors.text.lightGrey};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: left;
  line-height: 1.5;
`;

export const StyledAccordionContent = styled(Accordion.Content)`
  overflow: hidden;
  padding-top: 16px;
  padding-right: 48px;

  & * {
    font-size: ${({ theme }) => theme.fontSizes.text.m};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text.darkGrey};
  }

  & a {
    text-decoration: underline;

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.lightGrey};
    }
  }

  &[data-state='open'] {
    animation: ${slideDown} 300ms ease-out;
  }
  &[data-state='closed'] {
    animation: ${slideUp} 300ms ease-out;
  }
`;
