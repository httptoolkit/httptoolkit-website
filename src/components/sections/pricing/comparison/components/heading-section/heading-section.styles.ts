'use client';

import { styled } from '@/styles';

export const StyledHeadingSectionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: minmax(130px, fit-content);
  border-bottom: 1px solid var(--dark-grey);

  position: sticky;
  top: 0;
  background-color: var(--ink-grey);
  padding-top: 26px;

  & > *[data-text-section='true'] {
    padding-left: 32px;
    padding-right: 24px;
  }
`;
