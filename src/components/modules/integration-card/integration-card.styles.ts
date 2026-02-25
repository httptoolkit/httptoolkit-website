'use client';

import type { StyledIntegrationCardProps } from './integration-card.types';

import { Link } from '@/components/elements/link';
import { styled, screens, fontSizes, fontWeight } from '@/styles';

export const StyledIntegrationCardBorder = styled(Link)<StyledIntegrationCardProps>`
  &&& {
    display: block;
    background: var(--button-border);
    padding: 1px;
    border-radius: 12px;
    box-shadow: 0px 0px 8px 0px var(--shadow-default);

    @media (hover: hover) {
      &:hover {
        background: var(--blue-gradient);
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
  background-color: var(--ink-black);

  @media (min-width: ${screens.lg}) {
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
  font-size: ${fontSizes.button.small};
  font-weight: ${fontWeight.medium};
  color: var(--light-grey);
`;