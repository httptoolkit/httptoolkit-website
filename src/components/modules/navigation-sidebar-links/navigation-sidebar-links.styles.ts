'use client';

import { Heading } from '@/components/elements/heading';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { styled } from '@/styles';

export const StyledNavigationSidebarLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0;
`;

export const StyledNavigationSidebarLinksTitle = styled(Heading)``;

export const StyledNavigationSidebarLinksContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledNavigationSidebarLinksContentItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledNavigationSidebarLinksContentTitle = styled(Text)`
  display: inline-block;
  padding: 8px 16px;
`;

export const StyledNavigationSidebarLinksContentLink = styled(Link)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.text.m};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.lightGrey};
  padding: 8px 32px;

  &:hover {
    color: ${({ theme }) => theme.colors.text.white};
  }
`;