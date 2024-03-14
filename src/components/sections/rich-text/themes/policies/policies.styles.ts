'use client';

import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';
import { styled } from '@/styles';

export const StyledPoliciesHeading = styled(Heading)`
  margin-bottom: 24px;
`;

export const StyledPoliciesText = styled(Text)`
  margin-bottom: 6px;
`;

export const StyledPoliciesSectionBreak = styled.div`
  margin-bottom: 26px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    margin-bottom: 42px;
  }
`;

export const StyledPoliciesUL = styled.ul`
  list-style: disc;
  padding-left: 20px;
`;
