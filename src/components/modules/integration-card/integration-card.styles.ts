'use client';

import type { StyledIntegrationCardProps } from './integration-card.types';

import { Link } from '@/components/elements/link';
import { styled } from '@/styles';

export const StyledIntegrationCardBorder = styled.div<StyledIntegrationCardProps>`
  background: ${({ theme, $showBadge }) => ($showBadge ? theme.colors.blueGradient : theme.colors.button.border)};
  padding: 1px;
  border-radius: 12px;
  ${({ theme, $showBadge }) => `box-shadow: 0px 0px 8px 0px ${!$showBadge && theme.colors.shadowDefault}`};
`;

export const StyledIntegrationCardWrapper = styled.div<StyledIntegrationCardProps>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  padding: 31px;
  background-color: ${({ theme }) => theme.colors.inkBlack};
`;

export const StyledIntegrationCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledIntegrationCardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & *:nth-child(2) {
    flex-shrink: 0;
  }
`;

export const StyledIntegrationCardTitle = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const StyledIntegrationCardLink = styled(Link)`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.button.default};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.lightGrey};
`;
