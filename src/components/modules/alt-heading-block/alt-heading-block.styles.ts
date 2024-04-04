'use client';

import { Heading } from '@/components/elements/heading';
import { styled } from '@/styles';

export const StyledAltHeadingBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledAltHeadingBlockTitle = styled(Heading)`
  &&& {
    & span {
      -webkit-text-fill-color: ${({ theme }) => theme.colors.cinnarbarRed};
    }
  }
`;

export const StyledAltHeadingBlockSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.label.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.cinnarbarRed};
  letter-spacing: 0.6px;
  text-align: center;
  text-transform: uppercase;
`;
