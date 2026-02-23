'use client';

import { Text } from '@/components/elements/text';
import { styled } from '@/styles';

export const StyledBlockCodeWrapper = styled.div`
  border-radius: 16px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
  background-color: var(--prism-bg);
  overflow: hidden;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const StyledBlockCodeTitleWrapper = styled.div`
  padding: 16px;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
`;

export const StyledBlockCodeContent = styled.div`
  & pre {
    display: block;
    width: 100%;
    padding: 16px;
    margin: 0;
    background-color: transparent;

    & code {
      color: ${({ theme }) => theme.colors.lightGrey};
      background-color: var(--prism-bg);
      font-size: 13px;
      line-height: 19.5px;
      font-family: var(--font-code) !important;
      text-wrap: balance;
    }
  }
`;

export const StyledInlineCode = styled(Text)`
  &&& {
    color: var(--prism-text);
    background-color: var(--prism-bg);
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
    padding: 2px 6px;
    border-radius: 4px;
    margin: 0 4px;
    font-size: 13px;
    line-height: 19.5px;
    font-family: var(--font-code) !important;
    display: inline-flex;
    line-height: normal;
    text-wrap: balance;
  }
`;
