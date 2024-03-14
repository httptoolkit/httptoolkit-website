'use client';

import { StyledTextSection } from '../text-section/text-section.styles';

import { styled } from '@/styles';

export const StyledHeadingSectionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 130px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGrey};

  & > ${StyledTextSection} {
    padding-left: 32px;
    padding-right: 24px;
  }
`;
