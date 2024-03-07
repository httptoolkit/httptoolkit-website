'use client';

import { Link } from '@/components/elements/link';
import { css, styled } from '@/styles';

export const StyledBreadcrumbsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledBreadcrumbItem = styled.div`
  display: flex;
  gap: 8px;

  & svg {
    color: ${({ theme }) => theme.colors.text.darkGrey};
  }
`;

const StyledBreadcrumbLinkActive = css`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
`;

export const StyledBreadcrumbLink = styled(Link)<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.label.l};
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text.darkGrey};
  letter-spacing: 0.6px;
  transition: all 0.1s;
  text-transform: uppercase;
  flex-shrink: 0;

  ${({ $active }) => $active && StyledBreadcrumbLinkActive}
`;
