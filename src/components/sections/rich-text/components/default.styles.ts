'use client';

import type { StyledHeadingProps } from './default.types';

import { Heading } from '@/components/elements/heading';
import { Image } from '@/components/elements/image';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { styled } from '@/styles';

export const StyledLink = styled(Link)`
  &&& {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.text.darkGrey};
  }
`;

export const StyledText = styled(Text)`
  &&& {
    margin-bottom: 1.25rem;
  }
`;

export const StyledHighlightedParagraphs = styled.div`
  p {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text.darkGrey};
    font-size: ${({ theme }) => theme.fontSizes.text.l};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 1.5;
  }
`;

export const StyledHeading = styled(Heading)<StyledHeadingProps>`
  &&& {
    margin-bottom: 24px;
    margin-top: ${({ $margin = 0 }) => `${$margin}px`};
  }
`;

export const StyledUL = styled.ul`
  list-style: disc;
  padding-left: 30px;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.darkGrey};
  font-size: ${({ theme }) => theme.fontSizes.text.m};
`;

export const StyledOL = styled.ol`
  list-style: decimal;
  padding-left: 30px;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.darkGrey};
  font-size: ${({ theme }) => theme.fontSizes.text.m};
}`;

export const StyledImage = styled(Image)`
  &&& {
    display: block;
    position: relative !important;
    max-width: 100%;
    margin: 48px auto;
  }
`;
