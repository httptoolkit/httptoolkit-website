'use client';

import type { StyledHeadingProps } from './default.types';

import { Heading } from '@/components/elements/heading';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { styled } from '@/styles';

export const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.text.darkGrey};
`;

export const StyledText = styled(Text)`
  margin-bottom: 6px;
`;

export const StyledBiggerText = styled(Text)`
  margin-bottom: 16px;
`;

export const StyledHeading = styled(Heading)<StyledHeadingProps>`
  margin-bottom: 24px;
  margin-top: ${({ $margin = 0 }) => `${$margin}px`};
`;

export const StyledUL = styled.ul`
  list-style: disc;
  padding-left: 20px;
`;
