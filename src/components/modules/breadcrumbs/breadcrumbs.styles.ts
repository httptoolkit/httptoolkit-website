'use client';

import { Link } from '@/components/elements/link';
import { css, styled, fontSizes, fontWeight } from '@/styles';

export const StyledBreadcrumbsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledBreadcrumbItem = styled.div`
  display: flex;
  gap: 8px;

  & svg {
    color: var(--text-dark-grey);
  }
`;

const StyledBreadcrumbLinkActive = css`
  font-weight: ${fontWeight.bold};
  color: var(--text-white);
`;

export const StyledBreadcrumbLink = styled(Link)<{ $active: boolean }>`
  &&& {
    font-size: ${fontSizes.label.l};
    line-height: 1.1;
    color: var(--text-dark-grey);
    letter-spacing: 0.6px;
    transition: all 0.1s;
    text-transform: uppercase;
    flex-shrink: 0;

    ${({ $active }) => $active && StyledBreadcrumbLinkActive}
  }
`;