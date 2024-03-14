'use client';

import { Link } from '@/components/elements/link';
import { styled } from '@/styles';

export const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.text.darkGrey};
`;
