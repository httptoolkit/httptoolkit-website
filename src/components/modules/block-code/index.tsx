import { styled } from '@linaria/react';
import { Roboto_Mono } from 'next/font/google';

import type { BlockCodeProps } from './block-code.types';
import { Code } from './components/code';

import { Text } from '@/components/elements/text';

const dmCodeFont = Roboto_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-code' });

const StyledBlockCodeWrapper = styled.div`
  border-radius: 16px;
  box-shadow: 0 0 0 1px var(--button-border);
  background-color: var(--prism-bg);
  overflow: hidden;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const StyledBlockCodeTitleWrapper = styled.div`
  padding: 16px;
  box-shadow: 0 0 0 1px var(--button-border);
`;

const StyledBlockCodeContent = styled.div`
  & pre {
    display: block;
    width: 100%;
    padding: 16px;
    margin: 0;
    background-color: transparent;

    text-align: left;

    & code {
      color: var(--light-grey);
      background-color: var(--prism-bg);
      font-size: 13px;
      line-height: 19.5px;
      font-family: var(--font-code) !important;
      text-wrap: balance;
    }
  }
`;

const StyledInlineCode = styled.code`
  color: var(--prism-text);
  background-color: var(--prism-bg);
  box-shadow: 0 0 0 1px var(--button-border);
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 4px;
  font-size: 13px;
  line-height: normal;
  font-family: var(--font-code) !important;
  display: inline-flex;
  text-wrap: balance;
`;

export const InlineCode = ({ children }: Component) => {
  return (
    <StyledInlineCode className={dmCodeFont.variable}>
      {children}
    </StyledInlineCode>
  );
};

export const BlockCode = ({ title, content, language = 'javascript' }: BlockCodeProps) => {
  return (
    <StyledBlockCodeWrapper className={dmCodeFont.variable}>
      { title &&
        <StyledBlockCodeTitleWrapper>
          <Text fontSize="m" fontWeight="bold" color="white">
            {title}
          </Text>
        </StyledBlockCodeTitleWrapper>
      }
      <StyledBlockCodeContent>
        <Code title={title} language={language}>
          {content}
        </Code>
      </StyledBlockCodeContent>
    </StyledBlockCodeWrapper>
  );
};
