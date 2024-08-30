import { Roboto_Mono } from 'next/font/google';

import {
  StyledBlockCodeContent,
  StyledBlockCodeTitleWrapper,
  StyledBlockCodeWrapper,
  StyledInlineCode,
} from './block-code.styles';
import type { BlockCodeProps } from './block-code.types';
import { Code } from './components/code';

import { Text } from '@/components/elements/text';

const dmCodeFont = Roboto_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-code' });

export const InlineCode = ({ children }: Component) => {
  return (
    <StyledInlineCode fontSize="m" color="white" forwardedAs="code" className={dmCodeFont.variable}>
      {children}
    </StyledInlineCode>
  );
};

export const BlockCode = ({ title, content, language = 'javascript' }: BlockCodeProps) => {
  return (
    <StyledBlockCodeWrapper className={dmCodeFont.variable}>
      <StyledBlockCodeTitleWrapper>
        <Text fontSize="m" fontWeight="bold" color="white">
          {title}
        </Text>
      </StyledBlockCodeTitleWrapper>
      <StyledBlockCodeContent>
        <Code title={title} language={language}>
          {content}
        </Code>
      </StyledBlockCodeContent>
    </StyledBlockCodeWrapper>
  );
};
