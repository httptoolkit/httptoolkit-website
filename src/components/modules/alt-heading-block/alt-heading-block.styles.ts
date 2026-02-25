'use client';

import { Heading } from '@/components/elements/heading';
import { styled, fontSizes, fontWeight } from '@/styles';

export const StyledAltHeadingBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledAltHeadingBlockTitle = styled(Heading)`
  &&& {
    & span {
      -webkit-text-fill-color: var(--cinnabar-red-light);
    }
  }
`;

export const StyledAltHeadingBlockSubtitle = styled.p`
  font-size: ${fontSizes.label.l};
  font-weight: ${fontWeight.bold};
  color: var(--cinnabar-red-light);
  letter-spacing: 0.6px;
  text-align: center;
  text-transform: uppercase;
`;