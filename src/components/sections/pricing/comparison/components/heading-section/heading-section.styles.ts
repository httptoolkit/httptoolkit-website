'use client';

import { styled } from '@/styles';

export const StyledHeadingSectionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: minmax(130px, fit-content);
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGrey};

  & > *[data-text-section='true'] {
    padding-left: 32px;
    padding-right: 24px;
  }
`;
