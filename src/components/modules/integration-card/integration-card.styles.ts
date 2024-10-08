'use client';

import type { StyledIntegrationCardProps } from './integration-card.types';

import { Link } from '@/components/elements/link';
import { styled } from '@/styles';

export const StyledIntegrationCardBorder = styled(Link)<StyledIntegrationCardProps>`
  &&& {
    display: block;
    background: ${({ theme }) => theme.colors.button.border};
    padding: 1px;
    border-radius: 12px;
    box-shadow: 0px 0px 8px 0px ${({ theme }) => ` ${theme.colors.shadowDefault}`};

    @media (hover: hover) {
      &:hover {
        background: ${({ theme }) => theme.colors.blueGradient};
        box-shadow: none;
      }
    }
  }
`;

export const StyledIntegrationCardWrapper = styled.div<StyledIntegrationCardProps>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  padding: 15px 15px 23px;
  background-color: ${({ theme }) => theme.colors.inkBlack};

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 31px;
  }
`;

export const StyledIntegrationCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledIntegrationCardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  & *:nth-child(2) {
    flex-shrink: 0;
  }
`;

export const StyledIntegrationCardTitle = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const StyledIntegrationCardLink = styled.p`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.button.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.lightGrey};
`;
